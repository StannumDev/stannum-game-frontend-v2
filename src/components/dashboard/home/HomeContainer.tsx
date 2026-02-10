'use client';

import { LoadingScreen, PresentacionHome, ContinuarHome, RachaHome, RankingHome, ActivarProductoHome } from '@/components';
import { useUserStore } from '@/stores/userStore';

export const HomeContainer = () => {
    const user = useUserStore(s => s.user);
    const isLoading = useUserStore(s => s.isLoading);

    if (isLoading || !user) return <LoadingScreen />

    return (
        <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-4">
            <div className="xl:col-span-6 2xl:col-span-7 xl:min-h-[calc(100vh-32px)] flex flex-col items-start gap-4">
                <PresentacionHome/>
                {/* <GoalsHome/> */}
                <ContinuarHome/>
            </div>
            <div className="xl:col-span-6 2xl:col-span-5 xl:min-h-[calc(100vh-32px)] flex flex-col items-start gap-4">
                <RachaHome/>
                <ActivarProductoHome/>
                <RankingHome/>
                {/* <StanHelp/> */}
            </div>
        </div>
    );
};
