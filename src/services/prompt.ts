'use client';

import { PromptFilters, CreatePromptData, UpdatePromptData, PromptsResponse, PromptResponse, CopyPromptResponse, LikePromptResponse, ToggleFavoritePromptResponse, PromptsStatsResponse, TopPromptsResponse, FavoritePromptsResponse, PromptVisibility, ToggleVisibilityPromptResponse, MyPromptsResponse } from '@/interfaces';
import api from '@/lib/api';

export const getAllPrompts = async (filters?: PromptFilters): Promise<PromptsResponse> => {
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

        const response = await api.get<PromptsResponse>(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}?${params.toString()}`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getPromptById = async (id: string): Promise<PromptResponse> => {
    try {
        const response = await api.get<PromptResponse>(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const createPrompt = async (promptData: CreatePromptData): Promise<boolean> => {
    try {
        const response = await api.post(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}`, promptData);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw error;
    }
};

export const updatePrompt = async (id: string, promptData: UpdatePromptData): Promise<boolean> => {
    try {
        const response = await api.put(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}`, promptData);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw error;
    }
};

export const deletePrompt = async (id: string): Promise<boolean> => {
    try {
        const response = await api.delete(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw error;
    }
};

export const togglePromptVisibility = async (id: string, visibility: PromptVisibility): Promise<ToggleVisibilityPromptResponse['data']> => {
    try {
        const response = await api.put<ToggleVisibilityPromptResponse>(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}/visibility`, { visibility });
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const copyPrompt = async (id: string): Promise<CopyPromptResponse['data']> => {
    try {
        const response = await api.post<CopyPromptResponse>(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}/copy`, {});
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const likePrompt = async (id: string): Promise<LikePromptResponse['data']> => {
    try {
        const response = await api.post<LikePromptResponse>(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}/like`, {});
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const unlikePrompt = async (id: string): Promise<LikePromptResponse['data']> => {
    try {
        const response = await api.delete<LikePromptResponse>(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}/like`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const toggleFavoritePrompt = async (id: string): Promise<ToggleFavoritePromptResponse['data']> => {
    try {
        const response = await api.post<ToggleFavoritePromptResponse>(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}/favorite`, {});
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getMyPrompts = async (page: number = 1, limit: number = 20): Promise<MyPromptsResponse> => {
    try {
        const response = await api.get<MyPromptsResponse>(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}/me/prompts?page=${page}&limit=${limit}`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getMyFavoritePrompts = async (): Promise<FavoritePromptsResponse> => {
    try {
        const response = await api.get<FavoritePromptsResponse>(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}/me/favorites`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getUserPrompts = async (userId: string, page: number = 1, limit: number = 20): Promise<PromptsResponse> => {
    try {
        const response = await api.get<PromptsResponse>(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}/user/${userId}?page=${page}&limit=${limit}`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getPromptsStats = async (): Promise<PromptsStatsResponse> => {
    try {
        const response = await api.get<PromptsStatsResponse>(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}/stats`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getTopPrompts = async (limit: number = 10): Promise<TopPromptsResponse> => {
    try {
        const response = await api.get<TopPromptsResponse>(`${process.env.NEXT_PUBLIC_API_PROMPT_URL}/top?limit=${limit}`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};
