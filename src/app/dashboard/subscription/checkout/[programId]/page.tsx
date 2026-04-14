import { notFound } from 'next/navigation';
import { getProgramByIdServer } from '@/services/programServer';
import { SubscriptionCheckoutForm } from '@/components/dashboard/checkout/SubscriptionCheckoutForm';

interface Props {
    params: Promise<{ programId: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { programId } = await params;
    const program = await getProgramByIdServer(programId.toLowerCase());
    if (!program) return { title: 'Programa no encontrado' };
    return { title: `Suscripción - ${program.name}` };
}

export default async function SubscriptionCheckoutPage({ params }: Props) {
    const { programId } = await params;
    const program = await getProgramByIdServer(programId.toLowerCase());
    if (!program) return notFound();
    if (program.type !== 'subscription') return notFound();

    return <SubscriptionCheckoutForm program={program} />;
}
