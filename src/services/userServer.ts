'use server'

import axios from "axios";
import { cookies } from 'next/headers'
// import { errorHandler } from "@/helpers";
import type { FullUserDetails } from "@/interfaces";

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

export const getUserDetailsByUsernameServer = async (username: string): Promise<FullUserDetails | null> => {
    try {
        const token = await cookies().get('token')
        if (!token) throw tokenError

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/profile/${username}`, {
            headers: {
                Authorization: `Bearer ${token.value}`,
                "Content-Type": "application/json",
            },
        });
        if (!response?.data?.success || !response.data?.data) {
            throw new Error("Error al obtener los detalles del usuario. Estructura inesperada.");
        }
        return response.data.data as FullUserDetails;
    } catch (error) {
        // console.log(error)
        return null;
    }
};