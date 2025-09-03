import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserByToken } from "@/services";
import { Instruction, Module, Program, Section } from "@/interfaces";
import { programs } from "@/config/programs";
import { GoBackButton, ProgramInstructionDetails } from "@/components";

interface Props {
    params: {
        program_id: string;
        instructionId: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { program_id, instructionId } = params;

    const program: Program | undefined = programs.find(p => p.id === program_id.toLowerCase());
    const modules: Module[] = program?.sections.flatMap(section => section.modules||[]) ?? [];

    const program_module: Module | undefined = modules.find(m => m.instructions.some(l => l.id === instructionId));
    const instruction: Instruction | undefined = program_module?.instructions.find(l => l.id === instructionId);

    if (!instruction || !program_module || !program) {
        return {
            title: "Instrucción no encontrada",
            description: "La instrucción solicitada no existe en el programa.",
        };
    }

    const longTitle = `${instruction.title} - ${program_module.name} | ${program.name}`;

    return {
        title: longTitle,
        description: instruction.title,
        openGraph: {
            title: longTitle,
            description: instruction.title,
            url: `https://stanumgame.com/dashboard/library/${program_id}/instructions/${instruction.id}`,
            siteName: 'STANNUM',
            locale: 'es_AR',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: `https://stanumgame.com/dashboard/library/${program_id}`,
            creator: 'STANNUM',
            title: longTitle,
            description: instruction.title,
        },
    };
}

export default async function InstructionPage({ params }: Props) {
    const { program_id, instructionId } = params;
    const program = programs.find(p => p.id === program_id.toLowerCase());
    if (!program) return notFound();
    let section: Section | undefined;
    let program_module: Module | undefined;
    for (const sec of program.sections) {
        const foundModule = sec.modules?.find(m => m.instructions.some(l => l.id === instructionId));
        if (foundModule) {
            section = sec;
            program_module = foundModule;
            break;
        }
    }
    if (!section || !program_module) return notFound();
    const instruction = program_module.instructions.find(l => l.id === instructionId);
    if (!instruction) return notFound();
    
    const user = await getUserByToken();
    const isCompleted = user.programs?.[program_id as keyof typeof user.programs]?.instructions.some((ul) => ul.instructionId === instruction.id);
    return (
        <main className="main-container p-0 flex flex-col items-start">
            <h1 className="sr-only">{instruction.title}</h1>
            <GoBackButton className='text-card-lightest hover:text-white lg:hover:bg-card' />
            <ProgramInstructionDetails instruction={instruction} isCompleted={isCompleted} />
        </main>
    );
}