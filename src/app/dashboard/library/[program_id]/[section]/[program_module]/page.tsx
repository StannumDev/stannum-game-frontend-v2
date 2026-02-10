import { notFound } from 'next/navigation';
import { ProgramModuleContent } from '@/components';
import { programs } from "@/config/programs";
import type { Module, Program, Section } from '@/interfaces';

interface Props {
  params: Promise<{
    program_id: string;
    section: string;
    program_module: string;
  }>;
}

export default async function ProgramModulePage({ params }: Props) {
    const { program_id, section, program_module } = await params;

    const foundProgram: Program | undefined = programs.find(program => program.id === program_id.toLowerCase());
    if (!foundProgram) return notFound();

    const foundSection: Section | undefined = foundProgram?.sections.find(sec => sec.id === section);
    if (!foundSection || !foundSection.modules) return notFound();

    const foundModule: Module | undefined = foundSection.modules.find(mod => mod.id === program_module);
    if (!foundModule) return notFound();

    return (
        <ProgramModuleContent
            foundModule={foundModule}
            programId={program_id}
        />
    );
}
