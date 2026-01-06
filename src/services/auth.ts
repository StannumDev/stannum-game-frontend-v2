'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import { googleLogout } from '@react-oauth/google';
import { AuthUserResponse, RegisterState, UpdateUsernameResponse } from '@/interfaces';

const tokenError = {
    response: {
        data: {
            success: false,
            code: "AUTH_TOKEN_MISSING",
            type: "error",
            showAlert: true,
            title: "Token no encontrado",
            techMessage: "The authentication token is missing from cookies.",
            friendlyMessage: "No se encontró el token de sesión. Por favor, inicia sesión nuevamente.",
        },
    },
}

export const authUserByToken = async (token: string | undefined): Promise<AuthUserResponse> => {
    try {
        if (!token) throw tokenError;

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/auth-user`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response?.data?.success) {
            logout();
            throw new Error("Error al obtener los detalles del usuario. Estructura inesperada.");
        }

        return {
            success: response.data.success, 
            achievementsUnlocked: response.data.achievementsUnlocked || [],
            profileStatus: response.data.profileStatus || 'complete'
        };
    } catch (error: unknown) {
        logout();
        return { success: false, achievementsUnlocked: [], profileStatus: 'complete' };
    }
};

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
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/register`, userData);
        if (!data?.success || !data?.token) throw new Error("Unexpected response structure");

        Cookies.set('token', data.token, {
            secure: process.env.NEXT_PUBLIC_ENV === 'production',
            sameSite: 'Strict',
            path: '/',
            expires: 365,
        });

        return data.success;
    } catch (error:unknown) {
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await googleLogout();
        Cookies.remove('token', { path: '/' });
        Object.keys(Cookies.get()).map((cookie) => cookie.startsWith('tutorial_') && Cookies.remove(cookie, { path: '/' }));
        window.location.href = '/';
    } catch (error:unknown) {
        throw error;
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
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/google`, { token: googleToken });
        const { token, success, username } = response.data;
        if (!success || !token || !username) throw new Error("Unexpected response structure");

        Cookies.set('token', token, {
            secure: process.env.NEXT_PUBLIC_ENV === 'production',
            sameSite: 'Strict',
            path: '/',
            expires: 365,
        });

        return username;
    } catch (error:unknown) {
        throw error;
    }
};

export const updateUsername = async (username: string): Promise<UpdateUsernameResponse> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/update-username`, { username },
            { headers: {
                Authorization: `Bearer ${token}`,
            }}
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return { success: response.data.success, profileStatus: response.data.profileStatus || 'complete' };
    } catch (error: unknown) {
        throw error;
    }
};