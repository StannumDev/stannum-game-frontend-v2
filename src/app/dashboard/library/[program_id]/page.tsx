import { redirect } from "next/navigation";
import { programs } from "@/config/programs";

interface Props {
    params: Promise<{
        program_id: string;
    }>;
}

export default async function ProgramPage({ params }: Props) {
    const { program_id } = await params;
    const foundProgram = programs.find(p => p.id === program_id.toLowerCase());
    if (!foundProgram || foundProgram.sections.length === 0) redirect('dashboard/library');
    const firstSectionId = foundProgram.sections[0].id;
    redirect(`/dashboard/library/${program_id}/${firstSectionId}`);
}