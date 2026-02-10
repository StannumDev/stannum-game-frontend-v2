'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';

export const UserInitializer = () => {
    const router = useRouter();
    const initUser = useUserStore(s => s.initUser);

    useEffect(() => {
        const init = async () => {
            const profileStatus = await initUser();
            if (profileStatus === 'needs_username') {
                router.replace('/register/google');
            } else if (profileStatus === 'needs_profile') {
                router.replace('/register/complete-profile');
            }
        };
        init();
    }, [initUser, router]);

    return null;
};
