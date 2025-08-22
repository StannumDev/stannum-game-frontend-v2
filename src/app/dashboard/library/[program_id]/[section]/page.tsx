import { notFound } from "next/navigation";
import { getUserByToken } from "@/services";
import { ProgramModuleHandler } from "@/components";
import { Module, Program } from "@/interfaces";
import { programs } from "@/config/programs";

interface Props {
    params: {
        program_id: string;
        section: string;
    };
}

export default async function ProgramSectionPage({ params }: Props) {
    
    const { program_id, section } = params;

    const foundProgram:Program|undefined = programs.find(program => program.id === program_id.toLowerCase());
    const foundSection = foundProgram?.sections.find(sec => sec.id === section);

    const user = await getUserByToken();
    if (!user) return null;

    if (!foundProgram || !foundSection) return notFound();

    return (
        <section className="w-full flex flex-col gap-4">
            {
                foundSection.modules.map( (program_module:Module, i:number) => 
                    <ProgramModuleHandler key={i} program_module={program_module} index={i} section={foundSection} user={user} programId={program_id} />
                )
            }
        </section>
    );
}