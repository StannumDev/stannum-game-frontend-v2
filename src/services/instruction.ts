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

export const submitInstruction = async (programName: string, instructionId: string, deliverable?: { files?: File[]; text?: string }): Promise<boolean> => {
    try {
        const baseUrl = `${process.env.NEXT_PUBLIC_API_INSTRUCTION_URL}`;

        let s3Keys: string[] | undefined;

        if (deliverable?.files && deliverable.files.length > 0) {
            const presignRes = await api.post(`${baseUrl}/presign/${programName}/${instructionId}`, {
                files: deliverable.files.map(f => ({ fileName: f.name, contentType: f.type })),
            });

            if (!presignRes?.data?.success) throw new Error("Unexpected response structure");

            const presignedUrls: Array<{ presignedUrl: string; s3Key: string }> = presignRes.data.presignedUrls;

            const results = await Promise.allSettled(
                presignedUrls.map(({ presignedUrl, s3Key }, i) =>
                    axios.put(presignedUrl, deliverable.files![i], {
                        headers: { "Content-Type": deliverable.files![i].type },
                        timeout: 120000,
                    }).then(() => s3Key)
                )
            );

            const failed = results.filter(r => r.status === "rejected");
            if (failed.length > 0) {
                if (process.env.NEXT_PUBLIC_ENV === 'development') console.error('S3 upload failed:', failed);
                throw new Error(`Error al subir ${failed.length} archivo${failed.length > 1 ? 's' : ''}. Verificá tu conexión e intentá de nuevo.`);
            }

            s3Keys = results
                .filter((r): r is PromiseFulfilledResult<string> => r.status === "fulfilled")
                .map(r => r.value);
        }

        const response = await api.post(`${baseUrl}/submit/${programName}/${instructionId}`, {
            s3Keys,
            submittedText: deliverable?.text || undefined,
        });
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

