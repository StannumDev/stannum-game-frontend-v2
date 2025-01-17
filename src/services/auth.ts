'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import { errorHandler } from '@/helpers';
import { RegisterState } from '@/interfaces';

export const requestLogin = async (data: { username: string; password: string }): Promise<boolean> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/`, data);

        Object.keys(Cookies.get()).forEach((cookie) => {
            cookie.startsWith('tutorial_') && Cookies.remove(cookie, { path: '/' });
        });
        
        Cookies.set('token', response.data.token, {
            secure: process.env.NEXT_PUBLIC_ENV === 'production',
            sameSite: 'Strict',
            path: '/',
            expires: 365,
        });

        if (!response?.data?.success) throw new Error("Unexpected response structure");

        return response.data.success;
    } catch (error: unknown) {
        throw errorHandler(error);
    }
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/check-email`, { email });
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw errorHandler(error);
    }
};

export const checkUsernameExists = async (username: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/check-username`,{ username });
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw errorHandler(error);
    }
};

export const validateReCAPTCHA = async (token: string | null): Promise<boolean> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/validate-recaptcha`, { token });
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw errorHandler(error);
    }
};

export const createUser = async (userData: RegisterState): Promise<boolean> => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, userData);
        if (!data?.success || !data?.token) throw new Error("Unexpected response structure");

        Cookies.set('token', data.token, {
            secure: process.env.NEXT_PUBLIC_ENV === 'production',
            sameSite: 'Strict',
            path: '/',
            expires: 365,
        });

        return data.success;
    } catch (error: unknown) {
        throw errorHandler(error);
    }
};

export const logout = (): void => {
    try {
        Cookies.remove('token', { path: '/' });
        Object.keys(Cookies.get()).forEach((cookie) => {
            cookie.startsWith('tutorial_') && Cookies.remove(cookie, { path: '/' });
        });
        window.location.href = '/';
    } catch (error) {
        console.error("Error during logout:", error);
    }
};