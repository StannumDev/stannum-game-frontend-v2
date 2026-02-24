'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { driver, type Driver, type PopoverDOM } from 'driver.js';
import { GoBackButton, LoadingScreen, ProgramLessonCard, ProgramInstructionCard } from '@/components';
import { useUserStore } from '@/stores/userStore';
import { isLessonAvailable, isInstructionAvailable, isModuleComplete } from '@/utilities';
import { getTutorialStatus, markTutorialAsCompleted } from '@/services';
import { errorHandler } from '@/helpers';
import { TUTORIAL_ICONS } from '@/helpers/tutorialIcons';
import type { Instruction, Lesson, Module, ProgramId } from '@/interfaces';
import { ListIcon, RouteIcon, ChestIcon } from '@/icons';
import { PathMap } from './path-map/PathMap';
import { computeLessonXP } from './path-map/pathMapUtils';
import type { PathMapItem, NodeState } from './path-map/pathMapUtils';
import { getModuleChests } from '@/config/chests';
import type { ChestConfig } from '@/config/chests';
import { ChestOpenModal } from './path-map/ChestOpenModal';
import 'driver.js/dist/driver.css';

type ModuleItem =
    | { type: 'lesson'; lesson: Lesson; index: number }
    | { type: 'instruction'; instruction: Instruction; index: number }
    | { type: 'chest'; chest: ChestConfig };

function buildModuleItems(module: Module, chests: ChestConfig[]): ModuleItem[] {
    const items: ModuleItem[] = [];
    let lessonIndex = 0;
    let instructionIndex = 0;
    for (const lesson of module.lessons) {
        lessonIndex++;
        items.push({ type: 'lesson', lesson, index: lessonIndex });

        for (const chest of chests.filter(c => c.afterItemId === lesson.id)) {
            items.push({ type: 'chest', chest });
        }

        const instructionsAfter = module.instructions.filter(i => i.afterLessonId === lesson.id);
        for (const instr of instructionsAfter) {
            instructionIndex++;
            items.push({ type: 'instruction', instruction: instr, index: instructionIndex });

            for (const chest of chests.filter(c => c.afterItemId === instr.id)) {
                items.push({ type: 'chest', chest });
            }
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
    const pathname = usePathname();
    const user = useUserStore(s => s.user);
    const isLoading = useUserStore(s => s.isLoading);
    const driverRef = useRef<Driver | null>(null);

    const [view, setView] = useState<'map' | 'list'>('map');
    const [openChestId, setOpenChestId] = useState<string | null>(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('moduleView');
            if (stored === 'list') setView('list');
        } catch { }
    }, []);
    const [isTutorialCompleted, setIsTutorialCompleted] = useState(false);
    const [canStartTutorial, setCanStartTutorial] = useState(false);

    const handleViewChange = (newView: 'map' | 'list') => {
        setView(newView);
        try {
            localStorage.setItem('moduleView', newView);
        } catch { }
    };

    const typedProgramId = programId as ProgramId;
    const isModuleAccessible = !previousModule || (user ? isModuleComplete(user, typedProgramId, previousModule) : true);

    useEffect(() => {
        if (!isLoading && user && !isModuleAccessible) router.replace(`/dashboard/library/${programId}`);
    }, [isLoading, user, isModuleAccessible, router, programId]);

    useEffect(() => {
        const check = async () => {
            try {
                const completed = await getTutorialStatus('path_map_tutorial');
                setIsTutorialCompleted(completed);
                setCanStartTutorial(true);
            } catch (error: unknown) {
                errorHandler(error);
            }
        };
        check();
    }, []);

    const completeTutorial = async () => {
        try {
            await markTutorialAsCompleted('path_map_tutorial');
            setIsTutorialCompleted(true);
        } catch (error: unknown) {
            errorHandler(error);
        }
    };

    useEffect(() => {
        if (!canStartTutorial || isTutorialCompleted || isLoading || !user) return;

        setView('map');
        try { localStorage.setItem('moduleView', 'map'); } catch { /* ignore */ }

        const timeout = setTimeout(() => {
            const steps: NonNullable<Parameters<typeof driver>[0]>['steps'] = [];

            if (document.getElementById('module-header')) {
                steps.push({
                    element: '#module-header',
                    popover: {
                        popoverClass: 'tutorial-step-welcome',
                        title: `${TUTORIAL_ICONS.compass} Tu Módulo`,
                        description: "Cada módulo tiene <span class='text-stannum font-semibold'>lecciones</span> e <span class='text-stannum font-semibold'>instrucciones</span> que completás en orden para avanzar.",
                        side: 'bottom',
                        align: 'start',
                        showButtons: ['next'],
                    },
                });
            }

            if (document.getElementById('path-map-container')) {
                steps.push({
                    element: '#path-map-container',
                    popover: {
                        title: `${TUTORIAL_ICONS.route} Mapa de Progreso`,
                        description: "Tu camino de aprendizaje. Cada nodo es una actividad que te recompensa con <span class='text-stannum font-semibold'>XP</span> al completarla.",
                        side: 'top',
                        align: 'center',
                    },
                });
            }

            const firstCompleted = pathMapItems.find(i => i.state === 'completed');
            if (firstCompleted && document.getElementById(`path-node-${firstCompleted.id}`)) {
                steps.push({
                    element: `#path-node-${firstCompleted.id}`,
                    popover: {
                        title: `${TUTORIAL_ICONS.check} Actividad Completada`,
                        description: "Los nodos <span class='text-stannum font-semibold'>verdes</span> son actividades que ya completaste. Pasá el cursor para ver los detalles.",
                        side: 'right',
                        align: 'center',
                    },
                });
            }

            const activeItem = pathMapItems.find(i => i.state === 'active');
            if (activeItem && document.getElementById(`path-node-${activeItem.id}`)) {
                steps.push({
                    element: `#path-node-${activeItem.id}`,
                    popover: {
                        title: `${TUTORIAL_ICONS.play} Tu Próxima Misión`,
                        description: "Este nodo brillante es tu <span class='text-stannum font-semibold'>siguiente paso.</span> Hacé click para empezar a entrenar.",
                        side: 'right',
                        align: 'center',
                    },
                });
            }

            const firstBlocked = pathMapItems.find(i => i.state === 'blocked');
            if (firstBlocked && document.getElementById(`path-node-${firstBlocked.id}`)) {
                steps.push({
                    element: `#path-node-${firstBlocked.id}`,
                    popover: {
                        title: `${TUTORIAL_ICONS.lock} Actividad Bloqueada`,
                        description: "Las actividades bloqueadas se desbloquean cuando completás las <span class='text-stannum font-semibold'>anteriores en orden.</span>",
                        side: 'right',
                        align: 'center',
                    },
                });
            }

            const firstChest = pathMapItems.find(i => i.type === 'chest');
            if (firstChest && document.getElementById(`path-node-${firstChest.id}`)) {
                steps.push({
                    element: `#path-node-${firstChest.id}`,
                    popover: {
                        title: `${TUTORIAL_ICONS.chest} Cofres de Recompensa`,
                        description: "Al completar ciertas actividades desbloqueás <span class='text-amber-400 font-semibold'>cofres</span> con recompensas: <span class='text-stannum font-semibold'>XP</span>, <span class='text-amber-400 font-semibold'>Tins</span> y más.",
                        side: 'right',
                        align: 'center',
                    },
                });
            }

            if (document.getElementById('view-toggle')) {
                steps.push({
                    element: '#view-toggle',
                    popover: {
                        title: `${TUTORIAL_ICONS.route} Cambiar Vista`,
                        description: "Alterná entre el <span class='text-stannum font-semibold'>mapa</span> y la <span class='text-stannum font-semibold'>vista de lista</span> según tu preferencia.",
                        side: 'bottom',
                        align: 'end',
                    },
                });
            }

            if (document.getElementById('module-header')) {
                steps.push({
                    element: '#module-header',
                    popover: {
                        popoverClass: 'tutorial-step-ready',
                        title: `${TUTORIAL_ICONS.rocket} ¡A Entrenar!`,
                        description: "Completá lecciones para ganar <span class='text-stannum font-semibold'>XP</span>, subí de nivel y avanzá al siguiente módulo. ¡Tu camino empieza acá!",
                        side: 'bottom',
                        align: 'center',
                    },
                });
            }

            if (steps.length === 0) return;

            const totalSteps = steps.length;
            const driverInstance = driver({
                animate: true,
                smoothScroll: true,
                allowClose: false,
                stageRadius: 12,
                stagePadding: 6,
                popoverOffset: 12,
                showButtons: ['next', 'previous', 'close'],
                showProgress: true,
                nextBtnText: 'Siguiente',
                prevBtnText: 'Volver',
                doneBtnText: '¡Empezar!',
                onPopoverRender: (popover: PopoverDOM, { state }) => {
                    const existingBar = popover.wrapper.querySelector('.tutorial-accent-bar');
                    if (!existingBar) {
                        const accentBar = document.createElement('div');
                        accentBar.className = 'tutorial-accent-bar';
                        popover.wrapper.prepend(accentBar);
                    }

                    const activeIndex = state.activeIndex ?? 0;
                    const dotsContainer = document.createElement('div');
                    dotsContainer.className = 'tutorial-progress-dots';

                    for (let i = 0; i < totalSteps; i++) {
                        const dot = document.createElement('div');
                        dot.className = `tutorial-progress-dot${i === activeIndex ? ' active' : i < activeIndex ? ' completed' : ''}`;
                        dotsContainer.appendChild(dot);
                    }

                    popover.progress.innerHTML = '';
                    popover.progress.style.display = 'flex';
                    popover.progress.appendChild(dotsContainer);
                },
                onDestroyed: completeTutorial,
                steps,
            });

            driverRef.current = driverInstance;
            driverInstance.drive();
        }, 1000);

        return () => clearTimeout(timeout);
    }, [canStartTutorial, isTutorialCompleted, isLoading, user]);

    useEffect(() => {
        return () => { driverRef.current?.destroy(); };
    }, [pathname]);

    if (isLoading || !user) return <LoadingScreen />;
    if (!isModuleAccessible) return <LoadingScreen />;

    const userLessons = user.programs?.[typedProgramId]?.lessonsCompleted || [];
    const userInstructions = user.programs?.[typedProgramId]?.instructions || [];
    const userChestsOpened = user.programs?.[typedProgramId]?.chestsOpened || [];
    const chests = getModuleChests(foundModule.id);
    const items = buildModuleItems(foundModule, chests);

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
        } else if (item.type === 'instruction') {
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
        } else {
            const isOpened = userChestsOpened.some(c => c.chestId === item.chest.id);
            const prereqItem = items.find(i =>
                (i.type === 'lesson' && i.lesson.id === item.chest.afterItemId) ||
                (i.type === 'instruction' && i.instruction.id === item.chest.afterItemId)
            );
            let prereqCompleted = false;
            if (prereqItem?.type === 'lesson') {
                prereqCompleted = userLessons.some(ul => ul.lessonId === prereqItem.lesson.id);
            } else if (prereqItem?.type === 'instruction') {
                const ui = userInstructions.find(u => u.instructionId === prereqItem.instruction.id);
                prereqCompleted = !!ui && ['SUBMITTED', 'GRADED'].includes(ui.status);
            }

            let state: NodeState;
            if (isOpened) state = 'completed';
            else if (prereqCompleted) state = 'active';
            else state = 'blocked';

            return {
                id: item.chest.id,
                type: 'chest' as const,
                index: 0,
                title: item.chest.name,
                href: '',
                state,
                chestRarity: item.chest.rarity,
            };
        }
    });

    return (
        <section className="w-full">
            <GoBackButton className='text-card-lightest hover:text-white lg:hover:bg-card' href={`/dashboard/library/${programId}`} />
            <div id="module-header" className="mt-4 w-full flex items-start justify-between gap-4">
                <div className="flex flex-col min-w-0">
                    <span className="title-2">{foundModule.name}</span>
                    <h2 className="subtitle-1 no-truncate">{foundModule.description}</h2>
                </div>
                <div id="view-toggle" className="flex shrink-0 items-center gap-1 mt-1 bg-card rounded-lg p-1 border border-card-light">
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
            <div id="path-map-container" className='mt-6 w-full'>
                {view === 'map' ? (
                    <PathMap
                        items={pathMapItems}
                        nextModuleName={nextModuleName}
                        nextModuleHref={nextModuleHref}
                        isNextModuleAvailable={isModuleComplete(user, typedProgramId, foundModule)}
                        onChestClick={(chestId) => setOpenChestId(chestId)}
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
                            } else if (item.type === 'instruction') {
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
                            } else {
                                const isOpened = userChestsOpened.some(c => c.chestId === item.chest.id);
                                const prereqPathItem = pathMapItems.find(p => p.id === item.chest.afterItemId);
                                const isActive = !isOpened && prereqPathItem?.state === 'completed';
                                return (
                                    <button
                                        key={item.chest.id}
                                        type="button"
                                        onClick={() => isActive && setOpenChestId(item.chest.id)}
                                        disabled={!isActive && !isOpened}
                                        className={`flex items-center gap-4 p-4 rounded-xl border transition-colors duration-150 ${
                                            isOpened
                                                ? 'bg-amber-500/5 border-amber-500/20 opacity-60'
                                                : isActive
                                                    ? 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20 cursor-pointer'
                                                    : 'bg-card border-card-light opacity-40 cursor-not-allowed'
                                        }`}
                                    >
                                        <div className={`size-10 rounded-full flex items-center justify-center ${
                                            isOpened
                                                ? 'bg-amber-500/20 text-amber-400/50'
                                                : isActive
                                                    ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-amber-950'
                                                    : 'bg-card-light text-card-lightest'
                                        }`}>
                                            <ChestIcon className="size-5" />
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Cofre</span>
                                            {isActive && <span className="text-sm font-semibold text-white">Reclamá tu recompensa</span>}
                                        </div>
                                        <span className={`ml-auto text-xs font-bold px-3 py-1 rounded-full ${
                                            isOpened
                                                ? 'bg-amber-500/10 text-amber-400/50'
                                                : isActive
                                                    ? 'bg-amber-500 text-amber-950'
                                                    : 'bg-card-light text-card-lightest'
                                        }`}>
                                            {isOpened ? 'Abierto' : isActive ? 'Abrir' : 'Bloqueado'}
                                        </span>
                                    </button>
                                );
                            }
                        })}
                    </div>
                )}
            </div>
            {openChestId && (() => {
                const chestConfig = chests.find(c => c.id === openChestId);
                if (!chestConfig) return null;
                return (
                    <ChestOpenModal
                        chestId={openChestId}
                        programId={programId}
                        showModal={true}
                        setShowModal={(show) => { if (!show) setOpenChestId(null); }}
                        onOpened={() => setOpenChestId(null)}
                    />
                );
            })()}
        </section>
    );
};
