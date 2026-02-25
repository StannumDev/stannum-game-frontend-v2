'use client'

import { Fragment, useState, useEffect, useCallback, useRef } from 'react';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { driver, type Driver, type PopoverDOM } from "driver.js";
import { getTutorialStatus, markTutorialAsCompleted } from "@/services";
import { errorHandler } from '@/helpers';
import { TUTORIAL_ICONS } from '@/helpers/tutorialIcons';
import { PlayIcon } from '@/icons';
import { Modal, MotionWrapperLayout, StepFiveTutorial, StepFourTutorial, StepOneTutorial, StepSixTutorial, StepThreeTutorial, StepTwoTutorial } from "@/components";
import { useUserStore } from '@/stores/userStore';
import background from "@/assets/background/the_game.webp";
import "driver.js/dist/driver.css";

const steps:Array<number> = [1,2,3,4,5,6];

const TOTAL_TUTORIAL_STEPS = 8;

export const PresentacionHome = () => {
    const user = useUserStore(s => s.user);

    const introRef = useRef<HTMLDivElement | null>(null);
    const driverRef = useRef<Driver | null>(null);
    
    const pathname = usePathname();
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedStep, setSelectedStep] = useState<1|2|3|4|5|6>(1);
    const [direction, setDirection] = useState<"prev"|"next">("next");

    const [isTutorialCompleted, setIsTutorialCompleted] = useState<boolean>(false);
    const [canStartTutorial, setCanStartTutorial] = useState<boolean>(false);
    
    const completeTutorial = async () => {
        try {
            await markTutorialAsCompleted("initial_tutorial");
            setIsTutorialCompleted(true);
        } catch (error:unknown) {
            errorHandler(error);
        }
    };
  
    const showTutorial = () => {
        driverRef.current && driverRef.current.destroy();
        setSelectedStep(1);
        setShowModal(true);
    };

    const previousStep = useCallback(() => {
        if (!steps.includes(selectedStep - 1)) return;
        setDirection("prev");
        setSelectedStep(selectedStep - 1 as 1 | 2 | 3 | 4 | 5);
    }, [selectedStep]);

    const nextStep = useCallback(() => {
        if (!steps.includes(selectedStep + 1)) return;
        setDirection("next");
        setSelectedStep(selectedStep + 1 as 1 | 2 | 3 | 4 | 5);
    }, [selectedStep]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!showModal) return;
            if (event.key === 'ArrowLeft') {
                previousStep();
            } else if (event.key === 'ArrowRight') {
                nextStep();
            }
        };

        if (showModal) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showModal, previousStep, nextStep]);

    useEffect(() => {
        const checkTutorialCompletion = async () => {
            try {
                const completed = await getTutorialStatus("initial_tutorial");
                setIsTutorialCompleted(completed);
                setCanStartTutorial(true);
            } catch (error:unknown) {
                errorHandler(error);
            }
        };

        checkTutorialCompletion();
    }, []);

    useEffect(() => {
        
        const startIntro = () => {
            if (!canStartTutorial || isTutorialCompleted || !introRef.current) return;

            const driverInstance = driver({
                animate: true,
                smoothScroll: true,
                allowClose: false,
                stageRadius: 12,
                stagePadding: 6,
                popoverOffset: 12,
                showButtons: ["next", "previous", "close"],
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

                    for (let i = 0; i < TOTAL_TUTORIAL_STEPS; i++) {
                        const dot = document.createElement('div');
                        dot.className = `tutorial-progress-dot${i === activeIndex ? ' active' : i < activeIndex ? ' completed' : ''}`;
                        dotsContainer.appendChild(dot);
                    }

                    popover.progress.innerHTML = '';
                    popover.progress.style.display = 'flex';
                    popover.progress.appendChild(dotsContainer);
                },
                onDestroyed: completeTutorial,
                steps: [
                    {
                        element: "#highlight-me",
                        popover: {
                            popoverClass: "tutorial-step-welcome",
                            title: `${TUTORIAL_ICONS.gamepad} Bienvenido a <b class='text-stannum font-semibold'>STANNUM Game</b>`,
                            description: "Tu plataforma de entrenamiento gamificado. En <span class='text-stannum font-semibold'>30 segundos</span> vas a conocer todo lo que necesitás.",
                            side: "bottom",
                            align: "center",
                            showButtons: ["next"],
                        },
                    },
                    {
                        element: '#sidebar-buttons',
                        popover: {
                            popoverClass: "tutorial-step-nav",
                            title: `${TUTORIAL_ICONS.compass} Explorá la Plataforma`,
                            description: "Biblioteca, Comunidad, Tienda y tu Perfil. Todo lo que necesitás está <span class='text-stannum font-semibold'>a un click.</span>",
                            side: "right",
                            align: "start",
                        },
                    },
                    {
                        element: '#continue-training',
                        popover: {
                            popoverClass: "tutorial-step-training",
                            title: `${TUTORIAL_ICONS.play} Tus Misiones`,
                            description: "Retomá tus entrenamientos donde los dejaste. Cada lección completada te da <span class='text-stannum font-semibold'>XP</span> para subir de nivel y <span class='text-amber-400 font-semibold'>Tins</span>.",
                            side: "top",
                            align: "end",
                        },
                    },
                    {
                        element: '#tins-display',
                        popover: {
                            popoverClass: "tutorial-step-tins",
                            title: `${TUTORIAL_ICONS.coin} Tus Tins`,
                            description: "Los <span class='text-amber-400 font-semibold'>Tins</span> son la moneda de <span class='text-stannum font-semibold'>STANNUM Game</span>. Los ganás completando lecciones, abriendo <span class='text-amber-400 font-semibold'>cofres</span>, manteniendo tu racha y desbloqueando logros. Usalos en la <span class='text-stannum font-semibold'>Tienda</span> para canjear recompensas.",
                            side: "bottom",
                            align: "start",
                        },
                    },
                    {
                        element: '#streak-section',
                        popover: {
                            popoverClass: "tutorial-step-streak",
                            title: `${TUTORIAL_ICONS.fire} Racha Diaria`,
                            description: "Entrená todos los días para ganar <span class='text-amber-400 font-semibold'>Tins</span> extra y mantener tu racha. <span class='text-stannum font-semibold'>7 días seguidos</span> y vas a ver la diferencia.",
                            side: "left",
                            align: "center",
                        },
                    },
                    {
                        element: '#top-leaders',
                        popover: {
                            popoverClass: "tutorial-step-ranking",
                            title: `${TUTORIAL_ICONS.ranking} Tabla de Líderes`,
                            description: "Competí con otros jugadores y escalá posiciones. Tu <span class='text-stannum font-semibold'>XP y nivel</span> definen tu lugar en el ranking.",
                            side: "top",
                            align: "start",
                        },
                    },
                    {
                        element: '#activate-product',
                        popover: {
                            popoverClass: "tutorial-step-activate",
                            title: `${TUTORIAL_ICONS.key} Activar Producto`,
                            description: "¿Tenés una <span class='text-stannum font-semibold'>clave de producto</span>? Ingresala acá para desbloquear tu programa y empezar a entrenar.",
                            side: "left",
                            align: "center",
                        },
                    },
                    {
                        element: introRef.current,
                        popover: {
                            popoverClass: "tutorial-step-ready",
                            title: `${TUTORIAL_ICONS.rocket} ¡A Jugar!`,
                            description: "Ya conocés el terreno. Completá lecciones, juntá <span class='text-amber-400 font-semibold'>Tins</span>, subí de nivel y dominá el <span class='text-stannum font-semibold'>ranking.</span>",
                            side: "bottom",
                            align: "center",
                        },
                    }
                ],
            });

            driverRef.current = driverInstance;
            driverInstance.drive();
        };

        startIntro();
    }, [canStartTutorial, isTutorialCompleted]);

    useEffect(() => {
        return () => {driverRef.current && driverRef.current.destroy()};
    }, [pathname]);

    return (
        <Fragment>
            <div ref={introRef} className='w-full'>
                <MotionWrapperLayout>
                    <section
                        onClick={showTutorial}
                        className="w-full card card-link aspect-video flex justify-center items-start lg:items-center relative overflow-hidden group cursor-pointer"
                    >
                        { !imageLoaded && <div className='size-full bg-gradient-to-br from-card to-card-light absolute top-0 left-0 animate-pulse z-0'></div> }
                        <div className="size-full bg-gradient-to-br from-transparent to-black/50 group-hover:to-black/75 absolute top-0 left-0 z-20 transition-200"></div>
                        <button type="button" className="size-14 2xl:size-24 rounded-full bg-white/25 flex justify-center items-center absolute 2xl:relative bottom-6 lg:top-6 2xl:bottom-0 right-6 2xl:right-0 z-30 group-hover:scale-125 transition-200">
                            <PlayIcon className="size-8 2xl:size-14 relative left-0.5 2xl:left-1"/>
                        </button>
                        <Image
                            priority
                            src={background}
                            alt="Presentación STANNUM Game"
                            className="size-full object-cover lg:group-hover:blur-[2px] absolute top-0 left-0 z-10 transition-200"
                            onLoad={() => setImageLoaded(true)}
                        />
                        <div className="w-full static lg:absolute lg:bottom-8 lg:left-6 z-30">
                            <p className="text-2xl lg:text-4xl leading-tight">Bienvenido a <b className="block font-semibold">STANNUM Game</b></p>
                            <p className="hidden lg:block mt-2 w-full max-w-xl">Adentrate con nuestros <b className="text-stannum">videos introductorios</b> para comprender el funcionamiento de la plataforma y empezar a entrenar!</p>
                        </div>
                    </section>
                </MotionWrapperLayout>
            </div>
            <Modal
                className="max-w-7xl h-auto lg:aspect-video"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <div className="sm:mt-4 lg:mt-2 size-full flex flex-col justify-center items-center">
                    <div className="w-full max-w-sm lg:max-w-3xl relative">
                        <div className="size-full bg-transparent flex items-center absolute top-0 left-0">
                            <div className="w-full h-0.5 bg bg-card-light">
                                <m.div
                                    aria-hidden
                                    layout
                                    transition={{ duration: 0.125 }}
                                    className={`h-0.5 bg-stannum rounded-full ${ selectedStep <= 1 ? 'w-0' : selectedStep <= 2 ? 'w-1/5' : selectedStep <= 3 ? 'w-2/5' : selectedStep <= 4 ? 'w-3/5' : selectedStep <= 5 ? 'w-4/5' : 'w-full' }`}
                                ></m.div>
                            </div>
                        </div>
                        <header className="w-full flex justify-between items-center font-black text-lg lg:text-2xl relative">
                            {
                                steps.map( step => (
                                    <div key={`${step}_step`} className='size-10 lg:size-14 rounded-full bg-card-light flex justify-center items-center relative overflow-hidden'>
                                        <AnimatePresence>
                                            {
                                                step <= selectedStep &&
                                                <m.div
                                                    initial={{ scale: 0, x: '-100%' }}
                                                    animate={{ scale: 3, transition: { duration: 0.125, delay: 0.075 } }}
                                                    exit={{ scale: 0, x:0, transition: { delay: 0, scale: { duration: 0.25 }, x: { duration: 0 } } }}
                                                    className="size-full rounded-full bg-gradient-to-r from-stannum from-75% to-teal-500 absolute top-0 left-0 z-0"
                                                ></m.div>
                                            }
                                        </AnimatePresence>
                                        <span className={`relative z-10 ${ step <= selectedStep && 'text-card' }`}>{step}</span>
                                    </div>
                                ))
                            }
                        </header>
                    </div>
                    <AnimatePresence mode='wait' initial={false}>
                        {
                            selectedStep === 1 ? <StepOneTutorial direction={direction} key='step_one_tutorial' /> :
                            selectedStep === 2 && user ? <StepTwoTutorial direction={direction} key='step_two_tutorial' user={user} /> :
                            selectedStep === 3 ? <StepThreeTutorial direction={direction} key='step_three_tutorial' /> :
                            selectedStep === 4 ? <StepFourTutorial direction={direction} key='step_four_tutorial' /> :
                            selectedStep === 5 ? <StepFiveTutorial direction={direction} key='step_five_tutorial' /> :
                            selectedStep === 6 ? <StepSixTutorial direction={direction} key='step_six_tutorial' /> :
                            <div className='grow'></div>
                        }
                    </AnimatePresence>
                    <div className="w-full flex justify-center items-center gap-4">
                        <button
                            type="button"
                            onClick={ selectedStep === 1 ? () => { setShowModal(false) } : previousStep}
                            className="w-full h-9 text-sm font-semibold bg-card-light hover:bg-card-lighter rounded tracking-tighter flex justify-center items-center transition-200"
                        >
                            {
                                selectedStep === 1 ? 'Cancelar' : 'Anterior'
                            }
                        </button>
                        <button
                            type="button"
                            onClick={ selectedStep === steps.length ? () => { setShowModal(false) } : nextStep}
                            className="w-full h-9 text-sm font-semibold bg-stannum hover:bg-stannum-light text-card rounded tracking-tighter flex justify-center items-center transition-200"
                        >
                            {
                                    selectedStep === steps.length ? 'Finalizar' : 'Siguiente'
                            }
                        </button>
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}
