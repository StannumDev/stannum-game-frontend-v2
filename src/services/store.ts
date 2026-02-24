import api from '@/lib/api';
import type { StoreCoverItem } from '@/interfaces';

const STORE_URL = process.env.NEXT_PUBLIC_API_STORE_URL;

export const getStoreCovers = async (): Promise<StoreCoverItem[]> => {
    const response = await api.get(`${STORE_URL}/covers`);
    if (!response?.data?.success) throw new Error('Unexpected response structure');
    return response.data.data;
};

export const purchaseCover = async (coverId: string): Promise<{ coverId: string; coinsSpent: number }> => {
    const response = await api.post(`${STORE_URL}/covers/purchase`, { coverId });
    if (!response?.data?.success) throw new Error('Unexpected response structure');
    return response.data;
};

export const equipCover = async (coverId: string): Promise<{ coverId: string }> => {
    const response = await api.put(`${STORE_URL}/covers/equip`, { coverId });
    if (!response?.data?.success) throw new Error('Unexpected response structure');
    return response.data;
};
