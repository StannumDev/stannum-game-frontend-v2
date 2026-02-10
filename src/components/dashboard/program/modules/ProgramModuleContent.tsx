'use client';

import { GoBackButton, ProgramLessonCard, ProgramInstructionCard, LoadingScreen } from '@/components';
import { useUserStore } from '@/stores/userStore';
import { isLessonAvailable, isInstructionAvailable } from '@/utilities';
import type { Instruction, Lesson, Module, ProgramId } from '@/interfaces';

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

interface Props {
    foundModule: Module;
    programId: string;
}

export const ProgramModuleContent = ({ foundModule, programId }: Props) => {
    const user = useUserStore(s => s.user);
    const isLoading = useUserStore(s => s.isLoading);

    if (isLoading || !user) return <LoadingScreen />;

    const typedProgramId = programId as ProgramId;
    const userLessons = user.programs?.[typedProgramId]?.lessonsCompleted || [];
    const userInstructions = user.programs?.[typedProgramId]?.instructions || [];
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
                            const isAvailable = isLessonAvailable(user, typedProgramId, foundModule, item.lesson.id);
                            const isBlocked = item.lesson.blocked;
                            return (
                                <ProgramLessonCard
                                    key={item.lesson.id}
                                    index={item.index}
                                    programName={programId}
                                    id={item.lesson.id}
                                    title={item.lesson.title}
                                    isCompleted={isCompleted}
                                    isAvailable={isAvailable}
                                    isBlocked={isBlocked}
                                />
                            );
                        } else {
                            const userInstruction = userInstructions.find((ui) => ui.instructionId === item.instruction.id);
                            const isAvailable = isInstructionAvailable(user, typedProgramId, item.instruction);
                            return (
                                <ProgramInstructionCard
                                    key={item.instruction.id}
                                    index={item.index}
                                    programName={programId}
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
};
