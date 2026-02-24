'use client';

import Cookies from "js-cookie";
import type { AchievementDetails, FullUserDetails, UserSearchResult } from "@/interfaces";
import api from "@/lib/api";

type GetUserOpts = { force?: boolean };

export const getUserByTokenClient = async (): Promise<FullUserDetails> => {
    try {
        const response = await api.get(`${process.env.NEXT_PUBLIC_API_USER_URL}/`);
        if (!response?.data?.success || !response.data?.data) {
            throw new Error("Error al obtener los detalles del usuario. Estructura inesperada.");
        }
        return response.data.data as FullUserDetails;
    } catch (error:unknown) {
        throw error;
    }
};

export const getUserDetailsByUsername = async (username: string, opts: GetUserOpts = {}): Promise<FullUserDetails | null> => {
    try {
        const { force = false } = opts;
        const response = await api.get(`${process.env.NEXT_PUBLIC_API_USER_URL}/profile/${username}`, {
            params: force ? { _: Date.now() } : undefined,
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
        });

        if (!response?.data?.success || !response.data?.data) {
            throw new Error("Error al obtener los detalles del usuario. Estructura inesperada.");
        }
        return response.data.data as FullUserDetails;
    } catch (error:unknown) {
        throw error;
    }
};

export const getTutorialStatus = async (tutorialName: string): Promise<boolean> => {
    const cookieKey = `tutorial_${tutorialName}`;
    const cookieValue = Cookies.get(cookieKey);
    if (cookieValue !== undefined) return cookieValue === "true";
    try {
        const response = await api.get(`${process.env.NEXT_PUBLIC_API_USER_URL}/tutorial/${tutorialName}`);
        const isCompleted = response.data?.tutorial?.isCompleted || false;
        Cookies.set(cookieKey, String(isCompleted), { expires: 365 });
        return isCompleted;
    } catch (error:unknown) {
        throw error;
    }
};

export const markTutorialAsCompleted = async (tutorialName: string): Promise<void> => {
    const cookieKey = `tutorial_${tutorialName}`;
    try {
        await api.post(`${process.env.NEXT_PUBLIC_API_USER_URL}/tutorial/${tutorialName}/complete`, {});
        Cookies.set(cookieKey, "true", { expires: 365 });
    } catch (error:unknown) {
        throw error;
    }
};

export const updateUserProfile = async (data:{name:string, birthdate:string, country:string, region:string, enterprise:string, enterpriseRole:string, aboutme:string}): Promise<{ success: boolean; achievementsUnlocked: AchievementDetails[]; data?: FullUserDetails }> => {
    try {
        const response = await api.put(`${process.env.NEXT_PUBLIC_API_USER_URL}/edit`, data);
        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data;
    } catch (error:unknown) {
        throw error;
    }
};

export const searchUsers = async (query: string): Promise<Array<UserSearchResult>> => {
    try {
        const response = await api.get(`${process.env.NEXT_PUBLIC_API_USER_URL}/search-users`, {
            params: { query },
        });
        if (!response?.data?.success || !response.data?.data) throw new Error("Unexpected response structure");
        return response.data.data as Array<UserSearchResult>;
    } catch (error:unknown) {
        throw error;
    }
};
