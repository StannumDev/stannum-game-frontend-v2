'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import { AssistantFilters, CreateAssistantData, AssistantsResponse, AssistantResponse, ClickAssistantResponse, LikeAssistantResponse, ToggleFavoriteAssistantResponse, AssistantsStatsResponse, TopAssistantsResponse, FavoriteAssistantsResponse } from '@/interfaces';

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

export const getAllAssistants = async (filters?: AssistantFilters): Promise<AssistantsResponse> => {
    try {
        const token = Cookies.get("token");
        const params = new URLSearchParams();
        
        if (filters?.search) params.append('search', filters.search);
        if (filters?.category) params.append('category', filters.category);
        if (filters?.difficulty) params.append('difficulty', filters.difficulty);
        if (filters?.tags) params.append('tags', filters.tags);
        if (filters?.platforms) params.append('platforms', filters.platforms);
        if (filters?.sortBy) params.append('sortBy', filters.sortBy);
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());

        const response = await axios.get<AssistantsResponse>(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}?${params.toString()}`,
            token ? {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            } : {}
        );

        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getAssistantById = async (id: string): Promise<AssistantResponse> => {
    try {
        const token = Cookies.get("token");
        const response = await axios.get<AssistantResponse>(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/${id}`,
            token ? {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            } : {}
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const createAssistant = async (assistantData: CreateAssistantData): Promise<boolean> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}`, assistantData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw error;
    }
};

export const deleteAssistant = async (id: string): Promise<boolean> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error: unknown) {
        throw error;
    }
};

export const clickAssistant = async (id: string): Promise<ClickAssistantResponse['data']> => {
    try {
        const response = await axios.post<ClickAssistantResponse>(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/${id}/click`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const likeAssistant = async (id: string): Promise<LikeAssistantResponse['data']> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;
        const response = await axios.post<LikeAssistantResponse>(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/${id}/like`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const unlikeAssistant = async (id: string): Promise<LikeAssistantResponse['data']> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;
        const response = await axios.delete<LikeAssistantResponse>(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/${id}/like`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const toggleFavoriteAssistant = async (id: string): Promise<ToggleFavoriteAssistantResponse['data']> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;
        const response = await axios.post<ToggleFavoriteAssistantResponse>(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/${id}/favorite`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getMyAssistants = async (page: number = 1, limit: number = 20): Promise<AssistantsResponse> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;
        const response = await axios.get<AssistantsResponse>(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/me/assistants?page=${page}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getMyFavoriteAssistants = async (): Promise<FavoriteAssistantsResponse> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;
        const response = await axios.get<FavoriteAssistantsResponse>(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/me/favorites`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getUserAssistants = async (userId: string, page: number = 1, limit: number = 20): Promise<AssistantsResponse> => {
    try {
        const token = Cookies.get("token");
        const response = await axios.get<AssistantsResponse>(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/user/${userId}?page=${page}&limit=${limit}`,
            token ? {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            } : {}
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getAssistantsStats = async (): Promise<AssistantsStatsResponse> => {
    try {
        const response = await axios.get<AssistantsStatsResponse>(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/stats`);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getTopAssistants = async (limit: number = 10): Promise<TopAssistantsResponse> => {
    try {
        const token = Cookies.get("token");
        const response = await axios.get<TopAssistantsResponse>(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_ASSISTANT_URL}/top?limit=${limit}`,
            token ? {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            } : {}
        );
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};