'use client';

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { clearLoginFlag } from './tokenStorage';
import { callToast } from '@/helpers/callToast';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const REFRESH_TIMEOUT_MS = 10_000;

const SKIP_REFRESH_ENDPOINTS = [
  '/auth/login',
  '/auth/register',
  '/auth/google',
  '/auth/refresh-token',
  '/auth/recovery-password',
  '/auth/verify-recovery-otp',
  '/auth/reset-password',
];

const shouldSkipRefresh = (url?: string): boolean => {
  if (!url) return false;
  return SKIP_REFRESH_ENDPOINTS.some(endpoint => url.includes(endpoint));
};

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
  try {
    clearLoginFlag();
  } catch (e) {
    if (process.env.NEXT_PUBLIC_ENV === 'development') console.error('clearLoginFlag failed:', e);
  }
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

    if (error.response?.status !== 401 || originalRequest?._retry || shouldSkipRefresh(originalRequest?.url)) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!refreshPromise) {
      refreshPromise = axios.post(
        `${API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/refresh-token`,
        {},
        { withCredentials: true, timeout: REFRESH_TIMEOUT_MS }
      )
        .then(() => {})
        .catch((refreshError) => {
          forceLogout();
          throw refreshError;
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
