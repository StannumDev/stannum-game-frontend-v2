'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoBackButton, LoadingScreen } from '@/components';
import { useUserStore } from '@/stores/userStore';
import { isLessonAvailable, isInstructionAvailable, isModuleComplete } from '@/utilities';
import type { Instruction, Lesson, Module, ProgramId } from '@/interfaces';
import { PathMap } from './path-map/PathMap';
import { computeLessonXP } from './path-map/pathMapUtils';
import type { PathMapItem, NodeState } from './path-map/pathMapUtils';

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
    moduleIndex: number;
    previousModule?: Module;
    nextModuleName?: string;
    nextModuleHref?: string;
}

export const ProgramModuleContent = ({ foundModule, programId, moduleIndex, previousModule, nextModuleName, nextModuleHref }: Props) => {
    const router = useRouter();
    const user = useUserStore(s => s.user);
    const isLoading = useUserStore(s => s.isLoading);

    const typedProgramId = programId as ProgramId;
    const isModuleAccessible = !previousModule || (user ? isModuleComplete(user, typedProgramId, previousModule) : true);

    useEffect(() => {
        if (!isLoading && user && !isModuleAccessible) router.replace(`/dashboard/library/${programId}`);
    }, [isLoading, user, isModuleAccessible, router, programId]);

    if (isLoading || !user) return <LoadingScreen />;
    if (!isModuleAccessible) return <LoadingScreen />;

    const userLessons = user.programs?.[typedProgramId]?.lessonsCompleted || [];
    const userInstructions = user.programs?.[typedProgramId]?.instructions || [];
    const items = buildModuleItems(foundModule);

    const pathMapItems: PathMapItem[] = items.map((item) => {
        if (item.type === 'lesson') {
            const isCompleted = userLessons.some((ul) => ul.lessonId === item.lesson.id);
            const isAvailable = isLessonAvailable(user, typedProgramId, foundModule, item.lesson.id);
            const isBlocked = item.lesson.blocked;

            let state: NodeState;
            if (isCompleted) state = 'completed';
            else if (isAvailable && !isBlocked) state = 'active';
            else state = 'blocked';

            return {
                id: item.lesson.id,
                type: 'lesson' as const,
                index: item.index,
                title: item.lesson.title,
                href: `/dashboard/library/${programId}/lessons/${item.lesson.id}`,
                state,
                rewardXP: computeLessonXP(moduleIndex, item.lesson.duration),
            };
        } else {
            const userInstruction = userInstructions.find((ui) => ui.instructionId === item.instruction.id);
            const isAvailable = isInstructionAvailable(user, typedProgramId, item.instruction);
            const isCompleted = userInstruction && ['SUBMITTED', 'GRADED'].includes(userInstruction.status);

            let state: NodeState;
            if (isCompleted) state = 'completed';
            else if (isAvailable) state = 'active';
            else state = 'blocked';

            return {
                id: item.instruction.id,
                type: 'instruction' as const,
                index: item.index,
                title: item.instruction.title,
                href: `/dashboard/library/${programId}/instructions/${item.instruction.id}`,
                state,
                rewardXP: item.instruction.rewardXP,
            };
        }
    });

    return (
        <section className="w-full">
            <GoBackButton className='text-card-lightest hover:text-white lg:hover:bg-card' href={`/dashboard/library/${programId}`} />
            <div className="mt-4 w-full flex flex-col">
                <span className="title-2">{foundModule.name}</span>
                <h2 className="subtitle-1 no-truncate">{foundModule.description}</h2>
            </div>
            <div className='mt-6 w-full'>
                <PathMap
                    items={pathMapItems}
                    nextModuleName={nextModuleName}
                    nextModuleHref={nextModuleHref}
                    isNextModuleAvailable={isModuleComplete(user, typedProgramId, foundModule)}
                />
            </div>
        </section>
    );
};
