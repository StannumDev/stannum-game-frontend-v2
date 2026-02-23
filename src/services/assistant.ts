'use client';

import { AssistantFilters, CreateAssistantData, AssistantsResponse, AssistantResponse, ClickAssistantResponse, LikeAssistantResponse, ToggleFavoriteAssistantResponse, AssistantsStatsResponse, TopAssistantsResponse, FavoriteAssistantsResponse, AssistantVisibility, ToggleVisibilityAssistantResponse, MyAssistantsResponse } from '@/interfaces';
import api from '@/lib/api';

export const getAllAssistants = async (filters?: AssistantFilters): Promise<AssistantsResponse> => {
    try {
        const params = new URLSearchParams();

        if (filters?.search) params.append('search', filters.search);
        if (filters?.category) params.append('category', filters.category);
        if (filters?.difficulty) params.append('difficulty', filters.difficulty);
        if (filters?.tags) params.append('tags', filters.tags);
        if (filters?.platforms) params.append('platforms', filters.platforms);
        if (filters?.sortBy) params.append('sortBy', filters.sortBy);
        if (filters?.favoritesOnly) params.append('favoritesOnly', 'true');
        if (filters?.stannumVerifiedOnly) params.append('stannumVerifiedOnly', 'true');
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());

        const response = await api.get<AssistantsResponse>(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}?${params.toString()}`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getAssistantById = async (id: string): Promise<AssistantResponse> => {
    try {
        const response = await api.get<AssistantResponse>(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/${id}`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const createAssistant = async (assistantData: CreateAssistantData): Promise<boolean> => {
    try {
        const response = await api.post(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}`, assistantData);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw error;
    }
};

export const deleteAssistant = async (id: string): Promise<boolean> => {
    try {
        const response = await api.delete(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/${id}`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw error;
    }
};

export const toggleVisibility = async (id: string, visibility: AssistantVisibility): Promise<ToggleVisibilityAssistantResponse['data']> => {
    try {
        const response = await api.put<ToggleVisibilityAssistantResponse>(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/${id}/visibility`, { visibility });
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const clickAssistant = async (id: string): Promise<ClickAssistantResponse['data']> => {
    try {
        const response = await api.post<ClickAssistantResponse>(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/${id}/click`, {});
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const likeAssistant = async (id: string): Promise<LikeAssistantResponse['data']> => {
    try {
        const response = await api.post<LikeAssistantResponse>(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/${id}/like`, {});
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const unlikeAssistant = async (id: string): Promise<LikeAssistantResponse['data']> => {
    try {
        const response = await api.delete<LikeAssistantResponse>(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/${id}/like`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const toggleFavoriteAssistant = async (id: string): Promise<ToggleFavoriteAssistantResponse['data']> => {
    try {
        const response = await api.post<ToggleFavoriteAssistantResponse>(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/${id}/favorite`, {});
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getMyAssistants = async (page: number = 1, limit: number = 20): Promise<MyAssistantsResponse> => {
    try {
        const response = await api.get<MyAssistantsResponse>(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/me/assistants?page=${page}&limit=${limit}`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getMyFavoriteAssistants = async (): Promise<FavoriteAssistantsResponse> => {
    try {
        const response = await api.get<FavoriteAssistantsResponse>(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/me/favorites`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getUserAssistants = async (userId: string, page: number = 1, limit: number = 20): Promise<AssistantsResponse> => {
    try {
        const response = await api.get<AssistantsResponse>(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/user/${userId}?page=${page}&limit=${limit}`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getAssistantsStats = async (): Promise<AssistantsStatsResponse> => {
    try {
        const response = await api.get<AssistantsStatsResponse>(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/stats`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getTopAssistants = async (limit: number = 10): Promise<TopAssistantsResponse> => {
    try {
        const response = await api.get<TopAssistantsResponse>(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/top?limit=${limit}`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const updateAssistant = async (assistantId: string, data: CreateAssistantData): Promise<boolean> => {
    try {
        const response = await api.put(`${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/${assistantId}`, data);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw error;
    }
};
