'use client';


import axios from 'axios'
// import { cookies } from 'next/headers'

export const requestLogin = async (data:{username:string, password:string}) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/`, data);
        // cookies().set('token', response.data.token, {
        //     httpOnly: true,
        //     secure: process.env.NEXT_PUBLIC_ENV === 'production',
        //     sameSite: 'strict',
        //     path: '/',
        //     maxAge: 365 * 24 * 60 * 60,
        // });
        return response.data;
    } catch (error:unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || "Unexpected error occurred";
            throw { status, message };
        }

        throw { status: 500, message: "An unexpected error occurred" };
    }
}