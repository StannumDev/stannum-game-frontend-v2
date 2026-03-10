'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { driver, type Driver, type PopoverDOM } from "driver.js";
import { NavbarSection } from "@/components";
import { TimerIcon, ToolsIcon, RankingStarIcon } from "@/icons";
import { getTutorialStatus, markTutorialAsCompleted } from "@/services";
import { errorHandler } from "@/helpers";
import { TUTORIAL_ICONS } from "@/helpers/tutorialIcons";
import type { IconType } from "react-icons";
import type { Program } from "@/interfaces";
import { useModalQueueStore } from "@/stores/modalQueueStore";
import "driver.js/dist/driver.css";

interface Props {
    program: Program
}

const sectionIconMap: Record<string, IconType> = {
    preseason: TimerIcon,
    resources: ToolsIcon,
    ranking: RankingStarIcon,
};

const MODAL_ID = 'program_library_tutorial';
const MODAL_PRIORITY = 30;

export const ProgramNavigationHandler = ({ program }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const driverRef = useRef<Driver | null>(null);
    const destroyedByNav = useRef(false);
    const isMyTurn = useModalQueueStore(s => s.queue[0]?.id === MODAL_ID);
    const request = useModalQueueStore(s => s.request);
    const release = useModalQueueStore(s => s.release);

    const [isTutorialCompleted, setIsTutorialCompleted] = useState(false);
    const [canStartTutorial, setCanStartTutorial] = useState(false);

    const sectionsWithRanking = useMemo(() => {
        const withIcons = program.sections.map(section => ({
            ...section,
            Icon: sectionIconMap[section.id],
        }));
        // Demo programs are excluded from rankings
        if (program.type === 'demo') return withIcons;
        return [...withIcons, { id: "ranking", name: "Ranking", Icon: RankingStarIcon }];
    }, [program.sections, program.type]);

    const sectionIds = useMemo(() => {
        return sectionsWithRanking.map(section => section.id);
    }, [sectionsWithRanking]);

    type SectionOptions = typeof sectionIds[number];

    const getCurrentSectionFromUrl = useCallback((): SectionOptions => {
        const pathSegments = pathname.split('/');
        const programIndex = pathSegments.findIndex(segment => segment === program.id.toLowerCase());
        if (programIndex === -1 || programIndex === pathSegments.length - 1) return sectionIds[0] as SectionOptions;
        const potentialSectionSegment = pathSegments[programIndex + 1];
        const matchingSection = sectionsWithRanking.find(section => section.id === potentialSectionSegment);
        if (matchingSection) return matchingSection.id as SectionOptions;
        return sectionIds[0] as SectionOptions;
    }, [pathname, program.id, sectionsWithRanking, sectionIds]);

    const [selectedLayout, setSelectedLayout] = useState<SectionOptions>(getCurrentSectionFromUrl());

    useEffect(() => {
        const currentSection = getCurrentSectionFromUrl();
        setSelectedLayout(currentSection);
    }, [getCurrentSectionFromUrl]);

    const handleLayoutChange = useCallback((layout: string): void => {
        const isValidSection = sectionIds.includes(layout);
        if (!isValidSection) return;
        setSelectedLayout(layout as SectionOptions);
        router.push(`/dashboard/library/${program.id.toLowerCase()}/${layout}`, { scroll: false });
    }, [router, program.id, sectionIds]);

    useEffect(() => {
        const check = async () => {
            try {
                const completed = await getTutorialStatus('program_library_tutorial');
                setIsTutorialCompleted(completed);
                if (!completed) request(MODAL_ID, MODAL_PRIORITY);
                setCanStartTutorial(true);
            } catch (error: unknown) {
                errorHandler(error);
            }
        };
        check();
    }, [request]);

    const completeTutorial = async () => {
        if (destroyedByNav.current) {
            destroyedByNav.current = false;
            release(MODAL_ID);
            return;
        }
        try {
            await markTutorialAsCompleted('program_library_tutorial');
            setIsTutorialCompleted(true);
        } catch (error: unknown) {
            errorHandler(error);
        } finally {
            release(MODAL_ID);
        }
    };

    useEffect(() => {
        if (!canStartTutorial || isTutorialCompleted || !isMyTurn) return;

        const timeout = setTimeout(() => {
            const steps: NonNullable<Parameters<typeof driver>[0]>['steps'] = [];

            if (document.getElementById('program-cover')) {
                steps.push({
                    element: '#program-cover',
                    popover: {
                        popoverClass: 'tutorial-step-welcome',
                        title: `${TUTORIAL_ICONS.compass} Tu Programa`,
                        description: "Bienvenido a tu programa de entrenamiento. Acá podés ver tu <span class='text-stannum font-semibold'>progreso total</span> y navegar las secciones.",
                        side: 'bottom',
                        align: 'center',
                        showButtons: ['next'],
                    },
                });
            }

            if (document.getElementById('program-modules')) {
                steps.push({
                    element: '#program-modules',
                    popover: {
                        title: `${TUTORIAL_ICONS.play} Módulos`,
                        description: "Cada módulo contiene <span class='text-stannum font-semibold'>lecciones e instrucciones</span> que completás en orden. Hacé click en uno para ver su mapa de progreso.",
                        side: 'top',
                        align: 'center',
                    },
                });
            }

            const resourcesTab = document.querySelector('[data-layout="resources"]') as HTMLButtonElement | null;
            if (resourcesTab && !resourcesTab.disabled) {
                steps.push({
                    element: '[data-layout="resources"]',
                    popover: {
                        title: `${TUTORIAL_ICONS.tools} Recursos`,
                        description: "Material complementario: <span class='text-stannum font-semibold'>documentos, presentaciones</span> y herramientas extra para reforzar tu entrenamiento.",
                        side: 'bottom',
                        align: 'center',
                    },
                });
            }

            const rankingTab = document.querySelector('[data-layout="ranking"]') as HTMLButtonElement | null;
            if (rankingTab && !rankingTab.disabled) {
                steps.push({
                    element: '[data-layout="ranking"]',
                    popover: {
                        popoverClass: 'tutorial-step-ranking',
                        title: `${TUTORIAL_ICONS.ranking} Ranking`,
                        description: "Competí con otros participantes del programa. Tu <span class='text-stannum font-semibold'>nivel y XP</span> definen tu posición en la tabla.",
                        side: 'bottom',
                        align: 'center',
                    },
                });
            }

            if (document.getElementById('program-cover')) {
                steps.push({
                    element: '#program-cover',
                    popover: {
                        popoverClass: 'tutorial-step-ready',
                        title: `${TUTORIAL_ICONS.rocket} ¡A Entrenar!`,
                        description: "Completá módulos, ganá <span class='text-stannum font-semibold'>XP</span> y escalá en el ranking. ¡Tu progreso empieza acá!",
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
        }, 800);

        return () => clearTimeout(timeout);
    }, [canStartTutorial, isTutorialCompleted, isMyTurn]);

    useEffect(() => {
        return () => {
            if (driverRef.current) {
                destroyedByNav.current = true;
                driverRef.current.destroy();
            }
        };
    }, [pathname]);

    return (
        <NavbarSection<SectionOptions>
            sections={sectionsWithRanking}
            selectedLayout={selectedLayout}
            handleLayoutChange={handleLayoutChange}
        />
    )
}
