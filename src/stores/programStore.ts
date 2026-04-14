import { create } from 'zustand';
import { getAllProgramsClient } from '@/services/program';
import { mapApiPrograms } from '@/utilities/programMapper';
import type { Program } from '@/interfaces';

interface ProgramStore {
    programs: Program[];
    loading: boolean;
    error: boolean;
    _initStarted: boolean;
    fetchPrograms: () => void;
    refreshPrograms: () => void;
}

export const useProgramStore = create<ProgramStore>((set, get) => ({
    programs: [],
    loading: true,
    error: false,
    _initStarted: false,

    fetchPrograms: () => {
        if (get()._initStarted) return;
        set({ _initStarted: true, loading: true, error: false });

        getAllProgramsClient()
            .then((data) => {
                set({ programs: mapApiPrograms(data), loading: false });
            })
            .catch((err) => {
                console.error('[ProgramStore] Error fetching programs:', err?.response?.data || err?.message || err);
                set({ error: true, loading: false });
            });
    },

    refreshPrograms: () => {
        set({ _initStarted: false });
        get().fetchPrograms();
    },
}));
