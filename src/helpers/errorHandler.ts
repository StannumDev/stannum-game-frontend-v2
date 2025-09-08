'use client';

import axios, { AxiosError } from 'axios';
import type { AppError, ToastData } from '@/interfaces';
import { callToast } from './callToast';

export const errorHandler = (error:unknown): AppError => {
    if(process.env.NEXT_PUBLIC_ENV === 'development') console.log("Error:", error);
    let appError: AppError = {
        success: false,
        code: "UNKNOWN_ERROR",
        type: "error",
        showAlert: true,
        title: "Error desconocido",
        techMessage: "An unexpected error occurred.",
        friendlyMessage: "Ocurrió un error inesperado.",
    };

    if (axios.isAxiosError(error)) {
        const data = (error as AxiosError<AppError>).response?.data;
        if (data) {
            appError = {
                ...appError,
                ...data,
            };
        }
    }

    if (appError.showAlert) {
        const toastData: ToastData = {
            type: appError.type,
            message: {
                title: appError.title,
                description: appError.friendlyMessage,
            },
        };
        callToast(toastData);
    }
    console.error(appError)
    return appError;
};