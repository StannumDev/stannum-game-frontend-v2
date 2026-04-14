import { notFound } from "next/navigation";
import { ProgramModuleHandler } from "@/components";
import { Module, Program } from "@/interfaces";
import { getProgramByIdServer } from "@/services/programServer";

interface Props {
    params: Promise<{
        program_id: string;
        section: string;
    }>;
}

export default async function ProgramSectionPage({ params }: Props) {
    
    const { program_id, section } = await params;

    const foundProgram:Program|null = await getProgramByIdServer(program_id.toLowerCase());
    const foundSection = foundProgram?.sections.find(sec => sec.id === section);
    if (!foundProgram || !foundSection || !foundSection.modules) return notFound();

    return (
        <section className="w-full flex flex-col gap-4">
            {
                foundSection.modules.map( (program_module:Module, i:number) =>
                    <ProgramModuleHandler key={i} program_module={program_module} index={i} section={foundSection} programId={program_id} />
                )
            }
        </section>
    );
}