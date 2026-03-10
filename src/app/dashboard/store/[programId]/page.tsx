import { notFound } from 'next/navigation';
import { programs } from '@/config/programs';
import { ProgramDetail } from '@/components/dashboard/store/ProgramDetail';

interface Props {
    params: Promise<{ programId: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { programId } = await params;
    const program = programs.find(p => p.id === programId.toLowerCase() && !p.hidden);
    if (!program) return { title: 'Programa no encontrado' };
    return {
        title: `${program.name} | Tienda`,
        description: program.description,
    };
}

export default async function ProgramDetailPage({ params }: Props) {
    const { programId } = await params;
    const program = programs.find(p => p.id === programId.toLowerCase() && !p.hidden);
    if (!program) return notFound();

    return (
        <main className="main-container">
            <ProgramDetail program={program} />
        </main>
    );
}
