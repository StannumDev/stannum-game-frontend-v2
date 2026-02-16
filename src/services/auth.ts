'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import { googleLogout } from '@react-oauth/google';
import { AuthUserResponse, RegisterState, UpdateUsernameResponse } from '@/interfaces';
import api from '@/lib/api';
import { clearLoginFlag } from '@/lib/tokenStorage';

export const authUserByToken = async (): Promise<AuthUserResponse> => {
    try {
        const response = await api.get(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/auth-user`);

        if (!response?.data?.success) {
            return { success: false, achievementsUnlocked: [], profileStatus: undefined };
        }

        return {
            success: response.data.success,
            achievementsUnlocked: response.data.achievementsUnlocked || [],
            profileStatus: response.data.profileStatus || 'complete'
        };
    } catch (error: unknown) {
        return { success: false, achievementsUnlocked: [], profileStatus: undefined };
    }
};

export const requestLogin = async (data: { username: string; password: string }): Promise<boolean> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/`, data, { withCredentials: true });

        if (!response?.data?.success) throw new Error("Unexpected response structure");
        Object.keys(Cookies.get()).forEach((cookie) => {
            cookie.startsWith('tutorial_') && Cookies.remove(cookie, { path: '/' });
        });
        return response.data.success;
    } catch (error:unknown) {
        throw error;
    }
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/check-email`, { email });
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error:unknown) {
        throw error;
    }
};

export const checkUsernameExists = async (username: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/validate-username`,{ username });
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error:unknown) {
        throw error;
    }
};

export const validateReCAPTCHA = async (token: string | null): Promise<boolean> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/validate-recaptcha`, { token });
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error:unknown) {
        throw error;
    }
};

export const createUser = async (userData: RegisterState): Promise<boolean> => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/register`, userData, { withCredentials: true });
        if (!data?.success) throw new Error("Unexpected response structure");

        return data.success;
    } catch (error:unknown) {
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await api.post(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/logout`).catch(() => {});
        googleLogout();
        clearLoginFlag();
        Object.keys(Cookies.get()).forEach((cookie) => cookie.startsWith('tutorial_') && Cookies.remove(cookie, { path: '/' }));
        if (typeof window !== 'undefined') window.location.href = '/';
    } catch (error:unknown) {
        clearLoginFlag();
        if (typeof window !== 'undefined') window.location.href = '/';
    }
};

export const sendPasswordRecoveryEmail = async (username: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/password-recovery`, { username });
        return response.data.success;
    } catch (error:unknown) {
        throw error;
    }
};

export const verifyPasswordRecoveryOTP = async (username: string, otp: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/verify-recovery-otp`, { username, otp });
        return response.data.success;
    } catch (error:unknown) {
        throw error;
    }
};

export const changePasswordWithOTP = async (username: string, otp: string, password: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/password-reset`, { username, otp, password });
        return response.data.success;
    } catch (error:unknown) {
        throw error;
    }
};

export const googleLogin = async (googleToken: string): Promise<string> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/google`, { token: googleToken }, { withCredentials: true });
        const { success, username } = response.data;
        if (!success || !username) throw new Error("Unexpected response structure");

        return username;
    } catch (error:unknown) {
        throw error;
    }
};

export const updateUsername = async (username: string): Promise<UpdateUsernameResponse> => {
    try {
        const response = await api.put(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/update-username`, { username });
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return { success: response.data.success, profileStatus: response.data.profileStatus || 'complete' };
    } catch (error: unknown) {
        throw error;
    }
};
