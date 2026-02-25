'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import { clearLoginFlag } from '@/lib/tokenStorage';
import { buildRedirectParam } from '@/helpers';

export const UserInitializer = () => {
    const router = useRouter();
    const pathname = usePathname();
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
                    router.replace(`/login${buildRedirectParam(pathname)}`);
                }
            }
        };
        init();
        return () => { cancelled = true; };
    }, [initUser, router, pathname]);

    return null;
};
