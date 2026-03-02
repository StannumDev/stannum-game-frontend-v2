import { Suspense } from 'react';
import { SubscriptionResult } from '@/components/dashboard/checkout/SubscriptionResult';

export const metadata = { title: 'Resultado de suscripción' };

export default function SubscriptionResultPage() {
    return (
        <Suspense fallback={
            <div className="w-full min-h-svh flex items-center justify-center">
                <div className="size-12 rounded-full border-2 border-stannum border-t-transparent animate-spin" />
            </div>
        }>
            <SubscriptionResult />
        </Suspense>
    );
}
