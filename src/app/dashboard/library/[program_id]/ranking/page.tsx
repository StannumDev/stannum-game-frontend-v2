import { notFound } from "next/navigation";
import { programs } from "@/config/programs";
import { ProgramIndividualRankingLayout } from "@/components";
import type { Program } from "@/interfaces";

interface Props {
    params: Promise<{
        program_id: string;
    }>;
}

export default async function ProgramRankingPage({ params }: Props) {
    const { program_id } = await params;
    const foundProgram: Program | undefined = programs.find(program => program.id === program_id.toLowerCase());
    if (!foundProgram) return notFound();

    return <ProgramIndividualRankingLayout programId={foundProgram.id} />;
}
