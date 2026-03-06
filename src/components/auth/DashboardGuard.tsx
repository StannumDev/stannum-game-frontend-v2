'use client';

import { useUserStore } from '@/stores/userStore';

export const DashboardGuard = ({ children }: { children: React.ReactNode }) => {
    const connectionError = useUserStore(s => s.connectionError);

    if (connectionError) return null;

    return <>{children}</>;
};
