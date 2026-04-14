import { notFound } from 'next/navigation';
import { getProgramByIdServer } from '@/services/programServer';
import { ProgramDetail } from '@/components/dashboard/store/ProgramDetail';

interface Props {
    params: Promise<{ programId: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { programId } = await params;
    const program = await getProgramByIdServer(programId.toLowerCase());
    if (!program || program.hidden) return { title: 'Programa no encontrado' };
    return {
        title: `${program.name} | Tienda`,
        description: program.description,
    };
}

export default async function ProgramDetailPage({ params }: Props) {
    const { programId } = await params;
    const program = await getProgramByIdServer(programId.toLowerCase());
    if (!program || program.hidden) return notFound();

    return (
        <main className="main-container">
            <ProgramDetail program={program} />
        </main>
    );
}
