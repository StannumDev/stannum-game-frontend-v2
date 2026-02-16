import { AchievementDetails } from "@/interfaces";
import api from "@/lib/api";

export const verifyProductKey = async (code: string): Promise<{ product: string; team: string; used: boolean }> => {
    try {
        const response = await api.get(`${process.env.NEXT_PUBLIC_API_PRODUCT_KEY_URL}/${code}`);

        if (!response?.data?.success || !response.data?.data) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error:unknown) {
        throw error;
    }
};

export const activateProductKey = async (code: string): Promise<{ success: boolean; achievementsUnlocked: AchievementDetails[]; }> => {
    try {
        const response = await api.post(`${process.env.NEXT_PUBLIC_API_PRODUCT_KEY_URL}/activate`, { code });

        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response?.data;
    } catch (error:unknown) {
        throw error;
    }
};
