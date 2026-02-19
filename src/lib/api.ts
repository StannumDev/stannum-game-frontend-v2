'use client';

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { clearLoginFlag } from './tokenStorage';
import { callToast } from '@/helpers/callToast';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 15000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!config.headers['Content-Type']) config.headers['Content-Type'] = 'application/json';
  return config;
});

let refreshPromise: Promise<void> | null = null;
let isLoggingOut = false;

const forceLogout = () => {
  if (isLoggingOut) return;
  isLoggingOut = true;
  clearLoginFlag();
  if (typeof window !== 'undefined') {
    callToast({ type: 'warning', message: { title: 'Sesión expirada', description: 'Tu sesión expiró. Volvé a iniciar sesión.' } });
    setTimeout(() => { window.location.href = '/'; }, 1500);
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (isLoggingOut) return Promise.reject(error);

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    const isRefreshEndpoint = originalRequest?.url?.includes('/auth/refresh-token');
    const isAuthEndpoint = originalRequest?.url?.includes('/auth/') && !originalRequest?.url?.includes('/auth/auth-user') && !originalRequest?.url?.includes('/auth/logout') && !originalRequest?.url?.includes('/auth/update-username');

    if (error.response?.status !== 401 || originalRequest?._retry || isRefreshEndpoint || isAuthEndpoint) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!refreshPromise) {
      refreshPromise = axios.post(`${API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/refresh-token`, {}, { withCredentials: true })
        .then(() => {})
        .catch(() => {
          forceLogout();
          throw error;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    try {
      await refreshPromise;
      return api(originalRequest);
    } catch {
      return Promise.reject(error);
    }
  }
);

export default api;
