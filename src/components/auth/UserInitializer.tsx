'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import { clearLoginFlag } from '@/lib/tokenStorage';

export const UserInitializer = () => {
    const router = useRouter();
    const initUser = useUserStore(s => s.initUser);

    useEffect(() => {
        let cancelled = false;
        const init = async () => {
            const profileStatus = await initUser();
            if (cancelled) return;
            if (profileStatus === 'needs_username') {
                router.replace('/register/google');
            } else if (profileStatus === 'needs_profile') {
                router.replace('/register/complete-profile');
            } else if (profileStatus === null) {
                const { isAuthenticated, isLoading } = useUserStore.getState();
                if (!isAuthenticated && !isLoading) {
                    clearLoginFlag();
                    router.replace('/');
                }
            }
        };
        init();
        return () => { cancelled = true; };
    }, [initUser, router]);

    return null;
};
