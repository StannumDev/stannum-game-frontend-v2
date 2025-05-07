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

export const startInstruction = async (programName: string, instructionId: string): Promise<boolean> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_INSTRUCTION_URL}/start/${programName}/${instructionId}`, {},
        {
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

export const submitInstruction = async (programName: string, instructionId: string): Promise<boolean> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_INSTRUCTION_URL}/submit/${programName}/${instructionId}`, {},
        {
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

export const gradeInstruction = async (userId: string, programName: string, instructionId: string, score: number, observations?: string): Promise<boolean> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_INSTRUCTION_URL}/grade/${userId}/${programName}/${instructionId}`,
        {
            score,
            observations
        },
        {
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