import { Suspense } from 'react';
import { Metadata } from 'next';
import { PurchaseResult } from '@/components/dashboard/checkout/PurchaseResult';

export const metadata: Metadata = {
    title: 'Resultado de compra',
};

export default function CheckoutResultPage() {
    return (
        <Suspense>
            <PurchaseResult />
        </Suspense>
    );
}
