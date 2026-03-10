import { Metadata } from 'next';
import { BillingLayout } from '@/components/dashboard/billing/BillingLayout';

export const metadata: Metadata = {
    title: 'Mis pagos',
    description: 'Historial de compras y suscripciones en STANNUM Game',
};

export default function BillingPage() {
    return (
        <main className="main-container">
            <h1 className="title-1">Mis pagos</h1>
            <BillingLayout />
        </main>
    );
}
