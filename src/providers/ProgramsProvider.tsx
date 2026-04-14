'use client';

import { useEffect, type ReactNode } from 'react';
import { useProgramStore } from '@/stores/programStore';
import { useUserStore } from '@/stores/userStore';

interface Props {
    children: ReactNode;
}

export const ProgramsProvider = ({ children }: Props) => {
    const fetchPrograms = useProgramStore(s => s.fetchPrograms);
    const isAuthenticated = useUserStore(s => s.isAuthenticated);
    const isLoading = useUserStore(s => s.isLoading);

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            fetchPrograms();
        }
    }, [isAuthenticated, isLoading, fetchPrograms]);

    return children;
};

/** @deprecated Use useProgramStore directly instead */
export const usePrograms = () => {
    const programs = useProgramStore(s => s.programs);
    const loading = useProgramStore(s => s.loading);
    const error = useProgramStore(s => s.error);
    const refreshPrograms = useProgramStore(s => s.refreshPrograms);
    return { programs, loading, error, refreshPrograms };
};
