import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserByToken } from "@/services";
import { isInstructionAvailable } from "@/utilities";
import { Instruction, InstructionDetails, Lesson, Module, Program, ProgramId, Section } from "@/interfaces";
import { programs } from "@/config/programs";
import { GoBackButton, ProgramInstructionDetails } from "@/components";

interface Props {
    params: Promise<{
        program_id: string;
        instructionId: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { program_id, instructionId } = await params;

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
    const { program_id, instructionId } = await params;
    const program = programs.find(p => p.id === program_id.toLowerCase());
    if (!program) return notFound();

    const programId = program_id as ProgramId;

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

    const isAvailable = isInstructionAvailable(user, programId, instruction);
    if (!isAvailable) return notFound();

    const userProgram = user.programs?.[programId];
    const userInstruction: InstructionDetails | undefined = userProgram?.instructions.find((ui) => ui.instructionId === instruction.id);

    const relatedLessons: Lesson[] = (instruction.relatedLessonIds || []).map(id => program_module!.lessons.find(l => l.id === id)).filter((l): l is Lesson => l !== undefined);

    return (
        <main className="main-container min-h-0 p-0 flex flex-col items-start">
            <h1 className="sr-only">{instruction.title}</h1>
            <GoBackButton className='text-card-lightest hover:text-white lg:hover:bg-card' />
            <ProgramInstructionDetails
                programId={programId}
                instruction={instruction}
                userInstruction={userInstruction}
                relatedLessons={relatedLessons}
            />
        </main>
    );
}
