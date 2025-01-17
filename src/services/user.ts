import axios from "axios";
import Cookies from "js-cookie";
import { errorHandler } from "@/helpers";
import type { FullUserDetails, UserSidebarDetails } from "@/interfaces";

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

export const getUserSidebarDetails = async (): Promise<UserSidebarDetails> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/sidebar-details`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response?.data?.success || !response.data?.data) {
            throw {
                response: {
                    data: {
                        success: false,
                        code: "API_UNEXPECTED_RESPONSE",
                        type: "error",
                        showAlert: true,
                        title: "Respuesta inesperada",
                        techMessage: "The API response structure is not as expected.",
                        friendlyMessage: "Hubo un problema al obtener los datos del usuario. Por favor, inténtalo nuevamente.",
                    },
                },
            };
        }

        return response.data.data as UserSidebarDetails;
    } catch (error: unknown) {
        throw errorHandler(error);
    }
};

export const getUserDetailsByUsername = async (username: string): Promise<FullUserDetails | null> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/profile/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response?.data?.success || !response.data?.data) {
            throw new Error("Error al obtener los detalles del usuario. Estructura inesperada.");
        }
        return response.data.data as FullUserDetails;
    } catch (error) {
        return null;
    }
};

export const getTutorialStatus = async (tutorialName: string): Promise<boolean> => {
    const cookieKey = `tutorial_${tutorialName}`;
    const cookieValue = Cookies.get(cookieKey);
    if (cookieValue !== undefined) return cookieValue === "true";
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/tutorial/${tutorialName}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const isCompleted = response.data?.tutorial?.isCompleted || false;
        Cookies.set(cookieKey, String(isCompleted), { expires: 365 });
        return isCompleted;
    } catch (error: unknown) {
        throw errorHandler(error);
    }
};

export const markTutorialAsCompleted = async (tutorialName: string): Promise<void> => {
    const cookieKey = `tutorial_${tutorialName}`;
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/tutorial/${tutorialName}/complete`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        Cookies.set(cookieKey, "true", { expires: 365 });
    } catch (error: unknown) {
        throw errorHandler(error);
    }
};

export const updateUserProfile = async (data:{name:string, birthdate:string, country:string, region:string, enterprise:string, enterpriseRole:string, aboutme:string}): Promise<boolean> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/edit`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw errorHandler(error);
    }
};