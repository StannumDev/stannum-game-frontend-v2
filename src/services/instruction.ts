import axios from "axios";
import api from "@/lib/api";

export const startInstruction = async (programName: string, instructionId: string): Promise<boolean> => {
    try {
        const response = await api.post(`${process.env.NEXT_PUBLIC_API_INSTRUCTION_URL}/start/${programName}/${instructionId}`, {});

        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return true;
    } catch (error:unknown) {
        throw error;
    }
};

export const submitInstruction = async (programName: string, instructionId: string, deliverable?: { file?: File; text?: string }): Promise<boolean> => {
    try {
        const baseUrl = `${process.env.NEXT_PUBLIC_API_INSTRUCTION_URL}`;

        let s3Key: string | undefined;

        if (deliverable?.file) {
            const presignRes = await api.post(`${baseUrl}/presign/${programName}/${instructionId}`,
                {
                    fileName: deliverable.file.name,
                    contentType: deliverable.file.type,
                }
            );

            if (!presignRes?.data?.success) throw new Error("Unexpected response structure");

            const { presignedUrl, s3Key: key } = presignRes.data;
            s3Key = key;

            try {
                await axios.put(presignedUrl, deliverable.file, {
                    headers: { "Content-Type": deliverable.file.type },
                    timeout: 120000,
                });
            } catch (uploadError) {
                if (process.env.NEXT_PUBLIC_ENV === 'development') console.error('S3 upload failed:', uploadError);
                throw new Error("Error al subir el archivo. Verificá tu conexión e intentá de nuevo.");
            }
        }

        const response = await api.post(`${baseUrl}/submit/${programName}/${instructionId}`, { s3Key, submittedText: deliverable?.text || undefined });
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return true;
    } catch (error:unknown) {
        throw error;
    }
};

export const retryGrading = async (programName: string, instructionId: string): Promise<boolean> => {
    try {
        const response = await api.post(`${process.env.NEXT_PUBLIC_API_INSTRUCTION_URL}/retry/${programName}/${instructionId}`, {});
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return true;
    } catch (error:unknown) {
        throw error;
    }
};

