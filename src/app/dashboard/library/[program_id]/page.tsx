import { redirect } from "next/navigation";
import { getProgramByIdServer } from "@/services/programServer";

interface Props {
    params: Promise<{
        program_id: string;
    }>;
}

export default async function ProgramPage({ params }: Props) {
    const { program_id } = await params;
    const foundProgram = await getProgramByIdServer(program_id.toLowerCase());
    if (!foundProgram || foundProgram.sections.length === 0) redirect('/dashboard/library');
    const firstSectionId = foundProgram.sections[0].id;
    redirect(`/dashboard/library/${program_id.toLowerCase()}/${firstSectionId}`);
}
