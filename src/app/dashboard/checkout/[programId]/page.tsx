import { notFound } from 'next/navigation';
import { getProgramByIdServer } from '@/services/programServer';
import { CheckoutForm } from '@/components/dashboard/checkout/CheckoutForm';

interface Props {
    params: Promise<{ programId: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { programId } = await params;
    const program = await getProgramByIdServer(programId.toLowerCase());
    if (!program) return { title: 'Programa no encontrado' };
    return { title: `Checkout - ${program.name}` };
}

export default async function CheckoutPage({ params }: Props) {
    const { programId } = await params;
    const program = await getProgramByIdServer(programId.toLowerCase());
    if (!program) return notFound();
    if (!program.purchasable) return notFound();

    return <CheckoutForm program={program} />;
}
