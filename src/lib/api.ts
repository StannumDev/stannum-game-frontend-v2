'use client';

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './tokenStorage';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
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
      const token = getAccessToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      (config as InternalAxiosRequestConfig & { _retry?: boolean })._retry = true;
      resolve(api(config));
    }
  });
  failedQueue = [];
};

const forceLogout = () => {
  clearTokens();
  if (typeof window !== 'undefined') window.location.href = '/';
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    const isRefreshEndpoint = originalRequest?.url?.includes('/auth/refresh-token');

    if (error.response?.status !== 401 || originalRequest?._retry || isRefreshEndpoint) return Promise.reject(error);

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      forceLogout();
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
      const response = await axios.post(`${API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/refresh-token`, { refreshToken });
      const { token: newAccessToken, refreshToken: newRefreshToken } = response.data;
      if (!newAccessToken || !newRefreshToken) throw new Error('Invalid refresh response');
      setTokens(newAccessToken, newRefreshToken);
      processQueue(null);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
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