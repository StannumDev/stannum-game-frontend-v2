'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import { clearLoginFlag } from '@/lib/tokenStorage';
import { buildRedirectParam } from '@/helpers';

const RETRY_DELAY_MS = 10_000;

export const UserInitializer = () => {
    const router = useRouter();
    const pathname = usePathname();
    const initUser = useUserStore(s => s.initUser);
    const retryInit = useUserStore(s => s.retryInit);
    const connectionError = useUserStore(s => s.connectionError);
    const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const cancelledRef = useRef(false);

    const handleProfileResult = useCallback((profileStatus: string | null | undefined) => {
        if (cancelledRef.current) return;
        if (profileStatus === 'needs_username') {
            router.replace('/register/google');
        } else if (profileStatus === 'needs_profile') {
            router.replace('/register/complete-profile');
        } else if (profileStatus === null) {
            const { isAuthenticated, isLoading, connectionError: connErr } = useUserStore.getState();
            if (!isAuthenticated && !isLoading && !connErr) {
                clearLoginFlag();
                router.replace(`/login${buildRedirectParam(pathname)}`);
            }
        }
    }, [router, pathname]);

    useEffect(() => {
        cancelledRef.current = false;
        const init = async () => {
            const profileStatus = await initUser();
            handleProfileResult(profileStatus);
        };
        init();
        return () => { cancelledRef.current = true; };
    }, [initUser, handleProfileResult]);

    useEffect(() => {
        const scheduleRetry = () => {
            retryTimer.current = setTimeout(async () => {
                retryTimer.current = null;
                if (cancelledRef.current) return;
                const profileStatus = await retryInit();
                handleProfileResult(profileStatus);
                if (useUserStore.getState().connectionError && !cancelledRef.current) {
                    scheduleRetry();
                }
            }, RETRY_DELAY_MS);
        };

        if (connectionError) {
            scheduleRetry();
        }

        return () => {
            if (retryTimer.current) {
                clearTimeout(retryTimer.current);
                retryTimer.current = null;
            }
        };
    }, [connectionError, retryInit, handleProfileResult]);

    return null;
};
