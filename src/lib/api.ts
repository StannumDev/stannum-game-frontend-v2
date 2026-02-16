'use client';

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { clearLoginFlag } from './tokenStorage';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!config.headers['Content-Type']) config.headers['Content-Type'] = 'application/json';
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
  config: InternalAxiosRequestConfig;
}> = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      (config as InternalAxiosRequestConfig & { _retry?: boolean })._retry = true;
      resolve(api(config));
    }
  });
  failedQueue = [];
};

const forceLogout = () => {
  clearLoginFlag();
  if (typeof window !== 'undefined') window.location.href = '/';
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    const isRefreshEndpoint = originalRequest?.url?.includes('/auth/refresh-token');
    const isAuthEndpoint = originalRequest?.url?.includes('/auth/') && !originalRequest?.url?.includes('/auth/auth-user') && !originalRequest?.url?.includes('/auth/logout') && !originalRequest?.url?.includes('/auth/update-username');

    if (error.response?.status !== 401 || originalRequest?._retry || isRefreshEndpoint || isAuthEndpoint) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await axios.post(`${API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/refresh-token`, {}, { withCredentials: true });
      processQueue(null);
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError as AxiosError);
      forceLogout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
