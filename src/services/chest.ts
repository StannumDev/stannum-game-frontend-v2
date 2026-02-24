import api from '@/lib/api';
import type { CoverRarity } from '@/interfaces';

const CHEST_URL = process.env.NEXT_PUBLIC_API_CHEST_URL;

export interface ChestOpenResult {
    rewards: {
        xp: number;
        coins: number;
        cover: {
            coverId: string;
            coverName: string;
            coverRarity: CoverRarity;
            coverImageKey: string;
            alreadyOwned: boolean;
        } | null;
    };
    xpResult: {
        gained: number;
        totalGain: number;
        streakBonus: number;
    };
}

export const openChest = async (programId: string, chestId: string): Promise<ChestOpenResult> => {
    const response = await api.post(`${CHEST_URL}/${programId}/${chestId}/open`);
    if (!response?.data?.success) throw new Error('Unexpected response structure');
    return response.data;
};
