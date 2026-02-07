import axios from "axios";
import Cookies from "js-cookie";

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
    } catch (error:unknown) {
        throw error;
    }
};

export const submitInstruction = async (programName: string, instructionId: string, deliverable?: { file?: File; text?: string }): Promise<boolean> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;

        const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_INSTRUCTION_URL}`;
        const authHeaders = { Authorization: `Bearer ${token}` };

        let s3Key: string | undefined;

        if (deliverable?.file) {
            const presignRes = await axios.post(`${baseUrl}/presign/${programName}/${instructionId}`,
                {
                    fileName: deliverable.file.name,
                    contentType: deliverable.file.type,
                },
                { headers: authHeaders }
            );

            if (!presignRes?.data?.success) throw new Error("Unexpected response structure");

            const { presignedUrl, s3Key: key } = presignRes.data;
            s3Key = key;

            await axios.put(presignedUrl, deliverable.file, {
                headers: { "Content-Type": deliverable.file.type },
            });
        }

        const response = await axios.post(`${baseUrl}/submit/${programName}/${instructionId}`, { s3Key, submittedText: deliverable?.text || undefined }, { headers: authHeaders });
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return true;
    } catch (error:unknown) {
        throw error;
    }
};

export const gradeInstruction = async (userId: string, programName: string, instructionId: string, score: number, observations?: string): Promise<boolean> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_INSTRUCTION_URL}/grade/${userId}/${programName}/${instructionId}`,
            { score, observations },
            { headers: { Authorization: `Bearer ${token}`}}
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return true;
    } catch (error:unknown) {
        throw error;
    }
};