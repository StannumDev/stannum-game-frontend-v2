'use client';

import axios, { AxiosError } from 'axios';
import { AppError } from '@/interfaces';

export const errorHandler = (error: unknown): AppError => {
    if (axios.isAxiosError(error)) {
        const data = (error as AxiosError<AppError>).response?.data;
        return {
            success: false,
            code: data?.code || "UNKNOWN_ERROR",
            type: data?.type || "error",
            showAlert: data?.showAlert ?? true,
            title: data?.title || "Error desconocido",
            techMessage: data?.techMessage || "An unknown error occurred.",
            friendlyMessage: data?.friendlyMessage || "Ocurrió un error inesperado.",
        };
    } else {
        console.log('55555')
        return {
            success: false,
            code: "UNKNOWN_ERROR",
            type: "error",
            showAlert: true,
            title: "Error desconocido",
            techMessage: "An unexpected error occurred.",
            friendlyMessage: "Ocurrió un error inesperado.",
        };
    }
};