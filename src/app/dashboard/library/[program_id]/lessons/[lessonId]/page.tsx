import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserByToken } from "@/services";
import { isLessonAvailable, isInstructionAvailable } from "@/utilities";
import { LessonVideoPlayer, LessonMiniatureCard, InstructionMiniatureCard, GoBackButton } from "@/components";
import { Instruction, Lesson, Module, Program, ProgramId, Section } from "@/interfaces";
import { programs } from "@/config/programs";

interface Props {
    params: Promise<{
        program_id: string;
        lessonId: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { program_id, lessonId } = await params;

    const program: Program | undefined = programs.find(p => p.id === program_id.toLowerCase());
    const modules: Module[] = program?.sections.flatMap(section => section.modules||[]) ?? [];

    const program_module: Module | undefined = modules.find(m => m.lessons.some(l => l.id === lessonId));
    const lesson: Lesson | undefined = program_module?.lessons.find(l => l.id === lessonId);

    if (!lesson || !program_module || !program) {
        return {
            title: "Lección no encontrada",
            description: "La lección solicitada no existe en el programa.",
        };
    }

    const longTitle = `${lesson.title} - ${program_module.name} | ${program.name}`;

    return {
        title: longTitle,
        description: lesson.title,
        openGraph: {
            title: longTitle,
            description: lesson.title,
            url: `https://stanumgame.com/dashboard/library/${program_id}/lessons/${lesson.id}`,
            siteName: 'STANNUM',
            locale: 'es_AR',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: `https://stanumgame.com/dashboard/library/${program_id}`,
            creator: 'STANNUM',
            title: longTitle,
            description: lesson.title,
        },
    };
}

export default async function LessonPage({ params }: Props) {
    const { program_id, lessonId } = await params;
    const program = programs.find(p => p.id === program_id.toLowerCase());
    if (!program) return notFound();
    let section: Section | undefined;
    let program_module: Module | undefined;
    for (const sec of program.sections) {
        const foundModule = sec.modules?.find(m => m.lessons.some(l => l.id === lessonId));
        if (foundModule) {
            section = sec;
            program_module = foundModule;
            break;
        }
    }
    if (!section || !program_module) return notFound();
    const lesson = program_module.lessons.find(l => l.id === lessonId);
    if (!lesson) return notFound();
    
    const user = await getUserByToken();
    const programId = program_id as ProgramId;
    const isAvailable = isLessonAvailable(user, programId, program_module, lesson.id);
    if (!isAvailable) return notFound();
    const isCompleted = user.programs?.[program_id as keyof typeof user.programs]?.lessonsCompleted.some((ul) => ul.lessonId === lesson.id);
    const currentIndex = program_module.lessons.findIndex(l => l.id === lesson.id);
    const nextLessonObj = program_module.lessons[currentIndex + 1];
    const isNextLessonAvailable = nextLessonObj ? isLessonAvailable(user, programId, program_module, nextLessonObj.id) : false;

    const userInstructions = user.programs?.[programId]?.instructions || [];

    const nextInstructionConfig = program_module.instructions.find(inst => inst.afterLessonId === lesson.id);
    const nextInstruction = nextInstructionConfig ? { id: nextInstructionConfig.id, title: nextInstructionConfig.title } : undefined;

    const miniatureItems: Array<{ type: 'lesson'; lesson: Lesson; index: number } | { type: 'instruction'; instruction: Instruction }> = [];
    program_module.lessons.forEach((l, i) => {
        miniatureItems.push({ type: 'lesson', lesson: l, index: i + 1 });
        const instructionsAfter = program_module.instructions.filter(inst => inst.afterLessonId === l.id);
        for (const inst of instructionsAfter) {
            miniatureItems.push({ type: 'instruction', instruction: inst });
        }
    });

    const renderMiniatureList = () => miniatureItems.map((item) => {
        if (item.type === 'lesson') {
            const lessonCompleted = user.programs?.[program_id as keyof typeof user.programs]?.lessonsCompleted.some((ul) => ul.lessonId === item.lesson.id);
            const available = isLessonAvailable(user, programId, program_module, item.lesson.id);
            return (
                <LessonMiniatureCard
                    key={item.lesson.id}
                    lesson={item.lesson}
                    index={item.index}
                    programId={program_id}
                    isCurrent={item.lesson.id === lessonId}
                    isCompleted={lessonCompleted}
                    isAvailable={available}
                />
            );
        } else {
            const userInstr = userInstructions.find(ui => ui.instructionId === item.instruction.id);
            const available = isInstructionAvailable(user, programId, item.instruction);
            return (
                <InstructionMiniatureCard
                    key={item.instruction.id}
                    instruction={item.instruction}
                    programId={program_id}
                    isAvailable={available}
                    userInstruction={userInstr}
                />
            );
        }
    });

    return (
        <main className="main-container min-h-0 p-0 flex flex-col items-start">
            <h1 className="sr-only">{lesson.longTitle}</h1>
            <GoBackButton className='text-card-lightest hover:text-white lg:hover:bg-card' />
            <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="col-span-1 lg:col-span-3">
                    <LessonVideoPlayer
                        program={program_id}
                        lesson={lesson}
                        moduleLessons={program_module.lessons}
                        isCompleted={isCompleted}
                        isNextLessonAvailable={isNextLessonAvailable}
                        nextInstruction={nextInstruction}
                        userId={user.username}
                    />
                </div>
                <div className="hidden lg:block content-visibility-hidden lg:content-visibility-visible col-span-1 w-full max-h-none relative overflow-y-auto">
                    <div className="size-full pr-4 flex flex-col gap-2 absolute top-0 left-0">
                        {renderMiniatureList()}
                    </div>
                </div>
            </div>
            <div className="mt-6 w-full flex flex-col">
                <p className="subtitle-1"> {section.name} | {program_module.name}</p>
                <div className="w-full flex justify-between gap-4">
                    <div className="flex flex-col">
                        <h1 className="title-2">{lesson.title}</h1>
                    </div>
                </div>
                <span className="my-4 lg:mb-6 block w-full h-px bg-card-light"></span>
                <div className="w-full max-w-5xl h-64 lg:h-auto text-sm text-left overflow-y-auto relative">
                    <div dangerouslySetInnerHTML={{ __html: lesson.description }} className="size-full absolute lg:static top-0 left-0 whitespace-pre-line flex flex-col gap-4 lesson-description"/>
                </div>
            </div>
            <div className="mt-4 lg:hidden lg:content-visibility-hidden w-full h-96 relative overflow-y-auto overflow-x-hidden">
                <div className="size-full flex flex-col gap-2 absolute top-0 left-0">
                    {renderMiniatureList()}
                </div>
            </div>
        </main>
    );
}