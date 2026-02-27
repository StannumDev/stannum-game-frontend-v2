import { Metadata } from 'next';
import { PurchaseList } from '@/components/dashboard/purchases/PurchaseList';

export const metadata: Metadata = {
    title: 'Mis compras',
    description: 'Historial de compras en STANNUM Game',
};

export default function PurchasesPage() {
    return (
        <main className="main-container">
            <h1 className="title-1">Mis compras</h1>
            <PurchaseList />
        </main>
    );
}
