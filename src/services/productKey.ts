import axios from "axios";
import Cookies from "js-cookie";
import { errorHandler } from "@/helpers";

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
};

export const verifyProductKey = async (code: string): Promise<{ product: string; team: string; used: boolean }> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PRODUCT_KEY_URL}/${code}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response?.data?.success || !response.data?.data) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error) {
        throw errorHandler(error);
    }
};

export const activateProductKey = async (code: string): Promise<boolean> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PRODUCT_KEY_URL}/activate`, { code }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return true;
    } catch (error) {
        throw errorHandler(error);
    }
};