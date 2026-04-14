import { notFound } from "next/navigation";
import { getProgramByIdServer } from "@/services/programServer";
import { ProgramIndividualRankingLayout } from "@/components";
import type { Program } from "@/interfaces";

interface Props {
    params: Promise<{
        program_id: string;
    }>;
}

export default async function ProgramRankingPage({ params }: Props) {
    const { program_id } = await params;
    const foundProgram: Program | null = await getProgramByIdServer(program_id.toLowerCase());
    if (!foundProgram) return notFound();

    return <ProgramIndividualRankingLayout programId={foundProgram.id} />;
}
