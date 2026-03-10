'use client';

import { useEffect, useState, useCallback } from 'react';
import { programs } from '@/config/programs';
import { useUserStore } from '@/stores/userStore';
import { getSubscriptionStatus } from '@/services/subscription';
import type { SubscriptionStatusResult } from '@/services/subscription';
import { SubscriptionCard } from './SubscriptionCard';
import { MotionWrapperLayout } from '@/components';
import { SpinnerIcon } from '@/icons';
import Link from 'next/link';

interface SubEntry {
    programId: string;
    status: SubscriptionStatusResult;
}

const subscriptionPrograms = programs.filter(p => p.type === 'subscription');

export const SubscriptionsLayout = () => {
    const user = useUserStore(s => s.user);
    const refreshUser = useUserStore(s => s.refreshUser);
    const [entries, setEntries] = useState<SubEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAll = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);

        const activePrograms = subscriptionPrograms.filter(
            prog => user.programs?.[prog.id]?.subscription?.status
        );

        const settled = await Promise.allSettled(
            activePrograms.map(async (prog): Promise<SubEntry> => ({
                programId: prog.id,
                status: await getSubscriptionStatus(prog.id),
            }))
        );

        const results: SubEntry[] = settled
            .filter((r): r is PromiseFulfilledResult<SubEntry> => r.status === 'fulfilled')
            .map(r => r.value);

        setEntries(results);
        setIsLoading(false);
    }, [user]);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    const handleCancelled = () => {
        refreshUser();
        fetchAll();
    };

    return (
        <MotionWrapperLayout>
            <section className="w-full card">
                <h2 className="title-2 mb-6">Mis Suscripciones</h2>

                {isLoading ? (
                    <div className="py-12 flex items-center justify-center gap-3">
                        <SpinnerIcon className="size-5 animate-spin text-white/40" />
                        <span className="text-sm text-white/50">Cargando suscripciones...</span>
                    </div>
                ) : entries.length === 0 ? (
                    <div className="py-12 text-center flex flex-col items-center gap-4">
                        <p className="text-white/50">No tenés suscripciones activas.</p>
                        <Link href="/dashboard/store" className="py-2.5 px-6 rounded-lg bg-stannum text-black text-sm font-bold hover:bg-stannum-light transition-200">
                            Explorar programas
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {entries.map(entry => {
                            const program = programs.find(p => p.id === entry.programId);
                            if (!program) return null;
                            return (
                                <SubscriptionCard
                                    key={entry.programId}
                                    program={program}
                                    status={entry.status}
                                    onCancelled={handleCancelled}
                                />
                            );
                        })}
                    </div>
                )}
            </section>
        </MotionWrapperLayout>
    );
};
