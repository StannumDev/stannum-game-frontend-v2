'use client';

import { errorHandler } from '@/helpers';
import axios from 'axios';
import Cookies from 'js-cookie';

export const requestLogin = async (data: { username: string; password: string }): Promise<boolean> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/`, data);

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
