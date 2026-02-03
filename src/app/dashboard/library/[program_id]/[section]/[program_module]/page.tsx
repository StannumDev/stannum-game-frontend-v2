import { notFound } from 'next/navigation';
import { GoBackButton, ProgramLessonCard, ProgramInstructionCard } from '@/components';
import { programs } from "@/config/programs";
import { getUserByToken } from '@/services';
import type { Instruction, Lesson, Module, Program, ProgramId, Section } from '@/interfaces';
import { isLessonAvailable, isInstructionAvailable } from '@/utilities';

interface Props {
  params: Promise<{
    program_id: string;
    section: string;
    program_module: string;
  }>;
}

type ModuleItem = { type: 'lesson'; lesson: Lesson; index: number } | { type: 'instruction'; instruction: Instruction; index: number };

function buildModuleItems(module: Module): ModuleItem[] {
    const items: ModuleItem[] = [];
    let lessonIndex = 0;
    let instructionIndex = 0;
    for (const lesson of module.lessons) {
        lessonIndex++;
        items.push({ type: 'lesson', lesson, index: lessonIndex });

        const instructionsAfter = module.instructions.filter(i => i.afterLessonId === lesson.id);
        for (const instr of instructionsAfter) {
            instructionIndex++;
            items.push({ type: 'instruction', instruction: instr, index: instructionIndex });
        }
    }
    return items;
}

export default async function ProgramModulePage({ params }: Props) {
    const { program_id, section, program_module } = await params;

    const foundProgram: Program | undefined = programs.find(program => program.id === program_id.toLowerCase());
    if (!foundProgram) return notFound();

    const foundSection: Section | undefined = foundProgram?.sections.find(sec => sec.id === section);
    if (!foundSection || !foundSection.modules) return notFound();

    const foundModule: Module | undefined = foundSection.modules.find(mod => mod.id === program_module);
    if (!foundModule) return notFound();

    const user = await getUserByToken();
    const programId = program_id as ProgramId;
    const userLessons = user.programs?.[programId]?.lessonsCompleted || [];
    const userInstructions = user.programs?.[programId]?.instructions || [];
    const items = buildModuleItems(foundModule);

    return (
        <section className="w-full">
            <GoBackButton className='text-card-lightest hover:text-white lg:hover:bg-card' />
            <div className="mt-4 w-full flex flex-col">
                <span className="title-2">{foundModule.name}</span>
                <h2 className="subtitle-1 no-truncate">{foundModule.description}</h2>
            </div>
            <div className='mt-6 w-full'>
                <div className="mt-4 w-full flex flex-col gap-4">
                    {items.map((item) => {
                        if (item.type === 'lesson') {
                            const isCompleted = userLessons.some((ul) => ul.lessonId === item.lesson.id);
                            const isAvailable = isLessonAvailable(user, programId, foundModule, item.lesson.id);
                            const isBlocked = item.lesson.blocked;
                            return (
                                <ProgramLessonCard
                                    key={item.lesson.id}
                                    index={item.index}
                                    programName={program_id}
                                    id={item.lesson.id}
                                    title={item.lesson.title}
                                    isCompleted={isCompleted}
                                    isAvailable={isAvailable}
                                    isBlocked={isBlocked}
                                />
                            );
                        } else {
                            const userInstruction = userInstructions.find((ui) => ui.instructionId === item.instruction.id);
                            const isAvailable = isInstructionAvailable(user, programId, item.instruction);
                            return (
                                <ProgramInstructionCard
                                    key={item.instruction.id}
                                    index={item.index}
                                    programName={program_id}
                                    instruction={item.instruction}
                                    isAvailable={isAvailable}
                                    userInstruction={userInstruction}
                                />
                            );
                        }
                    })}
                </div>
            </div>
        </section>
    );
}
