'use client';

import { useCallback, useEffect, useState } from 'react';
import { getUserByTokenClient } from '@/services';
import { errorHandler } from '@/helpers';
import { LoadingScreen, PresentacionHome, ContinuarHome, RachaHome, RankingHome, ActivarProductoHome } from '@/components';
import type { FullUserDetails } from '@/interfaces';

export const HomeContainer = () => {
    const [user, setUser] = useState<FullUserDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserData = useCallback(async () => {
        try {
            const data = await getUserByTokenClient();
            setUser(data);
        } catch (err: unknown) {
            errorHandler(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    if (isLoading || !user) return <LoadingScreen />

    return (
        <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-4">
            <div className="xl:col-span-6 2xl:col-span-7 xl:min-h-[calc(100vh-32px)] flex flex-col items-start gap-4">
                <PresentacionHome user={user}/>
                {/* <GoalsHome/> */}
                <ContinuarHome user={user}/>
            </div>
            <div className="xl:col-span-6 2xl:col-span-5 xl:min-h-[calc(100vh-32px)] flex flex-col items-start gap-4">
                <RachaHome user={user}/>
                <ActivarProductoHome/>
                <RankingHome user={user}/>
                {/* <StanHelp/> */}
            </div>
        </div>
    );
};