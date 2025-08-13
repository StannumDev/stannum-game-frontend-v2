import { programs } from "@/config/programs";
import { redirect } from "next/navigation";

interface Props {
    params: {
        program_id: string;
    };
}

export default function ProgramPage({ params }: Props) {
    const { program_id } = params;
    const foundProgram = programs.find(p => p.id === program_id.toLowerCase());
    if (!foundProgram || foundProgram.sections.length === 0) redirect('dashboard/library');
    const firstSectionId = foundProgram.sections[0].id;
    redirect(`/dashboard/library/${program_id}/${firstSectionId}`);
}
