'use client';

import api from '@/lib/api';
import type { Program } from '@/interfaces';

export const getAllProgramsClient = async (): Promise<Program[]> => {
    const response = await api.get('/programs/public');
    if (!response?.data?.success || !response.data?.data) {
        throw new Error('Error al obtener los programas. Estructura inesperada.');
    }
    return response.data.data as Program[];
};

export const getProgramByIdClient = async (programId: string): Promise<Program | null> => {
    const response = await api.get(`/programs/public/${programId}`);
    if (!response?.data?.success || !response.data?.data) {
        throw new Error('Error al obtener el programa. Estructura inesperada.');
    }
    return response.data.data as Program;
};
