import { cache } from "react";
import axios from "axios";
import type { Program } from "@/interfaces";
import { mapApiProgram, mapApiPrograms } from "@/utilities/programMapper";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.STANNUM_API_KEY;

const headers = () => ({
    "x-api-key": API_KEY || "",
    "Content-Type": "application/json",
});

export const getAllProgramsServer = cache(async (): Promise<Program[]> => {
    try {
        const response = await axios.get(`${API_URL}/programs/full`, { headers: headers() });
        if (!response?.data?.success || !response.data?.data) return [];
        return mapApiPrograms(response.data.data);
    } catch (error: unknown) {
        console.error('[getAllProgramsServer] Error:', error);
        return [];
    }
});

export const getProgramByIdServer = cache(async (programId: string): Promise<Program | null> => {
    try {
        const response = await axios.get(`${API_URL}/programs/${programId}`, { headers: headers() });
        if (!response?.data?.success || !response.data?.data) return null;
        return mapApiProgram(response.data.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 404) return null;
        console.error(`[getProgramByIdServer] Error fetching program "${programId}":`, error);
        return null;
    }
});
