'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import { PromptFilters, CreatePromptData, UpdatePromptData,PromptsResponse, PromptResponse, CopyPromptResponse, LikePromptResponse, ToggleFavoritePromptResponse, PromptsStatsResponse, TopPromptsResponse, FavoritePromptsResponse, PromptVisibility, ToggleVisibilityPromptResponse, MyPromptsResponse } from '@/interfaces';

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

const getAuthHeaders = () => {
    const token = Cookies.get("token");
    if (!token) throw tokenError;
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

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

        const response = await axios.get<PromptsResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}?${params.toString()}`, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getPromptById = async (id: string): Promise<PromptResponse> => {
    try {
        const response = await axios.get<PromptResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}`, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const createPrompt = async (promptData: CreatePromptData): Promise<boolean> => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}`, 
            promptData, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw error;
    }
};

export const updatePrompt = async (id: string, promptData: UpdatePromptData): Promise<boolean> => {
    try {
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}`, 
            promptData, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw error;
    }
};

export const deletePrompt = async (id: string): Promise<boolean> => {
    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}`, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw error;
    }
};

export const togglePromptVisibility = async (id: string, visibility: PromptVisibility): Promise<ToggleVisibilityPromptResponse['data']> => {
    try {
        const response = await axios.put<ToggleVisibilityPromptResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}/visibility`, 
            { visibility }, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const copyPrompt = async (id: string): Promise<CopyPromptResponse['data']> => {
    try {
        const response = await axios.post<CopyPromptResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}/copy`, 
            {}, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const likePrompt = async (id: string): Promise<LikePromptResponse['data']> => {
    try {
        const response = await axios.post<LikePromptResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}/like`, 
            {}, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const unlikePrompt = async (id: string): Promise<LikePromptResponse['data']> => {
    try {
        const response = await axios.delete<LikePromptResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}/like`, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const toggleFavoritePrompt = async (id: string): Promise<ToggleFavoritePromptResponse['data']> => {
    try {
        const response = await axios.post<ToggleFavoritePromptResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}/${id}/favorite`, 
            {}, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getMyPrompts = async (page: number = 1, limit: number = 20): Promise<MyPromptsResponse> => {
    try {
        const response = await axios.get<MyPromptsResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}/me/prompts?page=${page}&limit=${limit}`, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getMyFavoritePrompts = async (): Promise<FavoritePromptsResponse> => {
    try {
        const response = await axios.get<FavoritePromptsResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}/me/favorites`, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getUserPrompts = async (userId: string, page: number = 1, limit: number = 20): Promise<PromptsResponse> => {
    try {
        const response = await axios.get<PromptsResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}/user/${userId}?page=${page}&limit=${limit}`, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getPromptsStats = async (): Promise<PromptsStatsResponse> => {
    try {
        const response = await axios.get<PromptsStatsResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}/stats`, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getTopPrompts = async (limit: number = 10): Promise<TopPromptsResponse> => {
    try {
        const response = await axios.get<TopPromptsResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PROMPT_URL}/top?limit=${limit}`, 
            { headers: getAuthHeaders() }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};