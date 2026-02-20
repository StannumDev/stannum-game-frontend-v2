'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoBackButton, LoadingScreen, ProgramLessonCard, ProgramInstructionCard } from '@/components';
import { useUserStore } from '@/stores/userStore';
import { isLessonAvailable, isInstructionAvailable, isModuleComplete } from '@/utilities';
import type { Instruction, Lesson, Module, ProgramId } from '@/interfaces';
import { ListIcon, RouteIcon } from '@/icons';
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
    const [view, setView] = useState<'map' | 'list'>(() => {
        if (typeof window === 'undefined') return 'map';
        try {
            const stored = localStorage.getItem('moduleView');
            return stored === 'map' || stored === 'list' ? stored : 'map';
        } catch {
            return 'map';
        }
    });

    const handleViewChange = (newView: 'map' | 'list') => {
        setView(newView);
        try {
            localStorage.setItem('moduleView', newView);
        } catch {
            // Storage unavailable or quota exceeded, ignore
        }
    };

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
            <div className="mt-4 w-full flex items-start justify-between gap-4">
                <div className="flex flex-col min-w-0">
                    <span className="title-2">{foundModule.name}</span>
                    <h2 className="subtitle-1 no-truncate">{foundModule.description}</h2>
                </div>
                <div className="flex shrink-0 items-center gap-1 mt-1 bg-card rounded-lg p-1 border border-card-light">
                    <button
                        onClick={() => handleViewChange('map')}
                        className={`p-1.5 rounded-md transition-colors duration-150 ${view === 'map' ? 'bg-stannum text-card' : 'text-card-lightest hover:text-white'}`}
                        title="Vista mapa"
                    >
                        <RouteIcon className="size-4" />
                    </button>
                    <button
                        onClick={() => handleViewChange('list')}
                        className={`p-1.5 rounded-md transition-colors duration-150 ${view === 'list' ? 'bg-stannum text-card' : 'text-card-lightest hover:text-white'}`}
                        title="Vista lista"
                    >
                        <ListIcon className="size-4" />
                    </button>
                </div>
            </div>
            <div className='mt-6 w-full'>
                {view === 'map' ? (
                    <PathMap
                        items={pathMapItems}
                        nextModuleName={nextModuleName}
                        nextModuleHref={nextModuleHref}
                        isNextModuleAvailable={isModuleComplete(user, typedProgramId, foundModule)}
                    />
                ) : (
                    <div className="flex flex-col gap-4">
                        {items.map((item) => {
                            if (item.type === 'lesson') {
                                const isCompleted = userLessons.some((ul) => ul.lessonId === item.lesson.id);
                                const isAvailable = isLessonAvailable(user, typedProgramId, foundModule, item.lesson.id);
                                return (
                                    <ProgramLessonCard
                                        key={item.lesson.id}
                                        id={item.lesson.id}
                                        programName={programId}
                                        index={item.index}
                                        title={item.lesson.title}
                                        isCompleted={isCompleted}
                                        isAvailable={isAvailable}
                                        isBlocked={item.lesson.blocked}
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
                )}
            </div>
        </section>
    );
};
