'use client'

import { Fragment, useState, useEffect, useCallback } from 'react';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon } from '@/icons';
import { Modal, MotionWrapperLayoutClient, StepFiveTutorial, StepFourTutorial, StepOneTutorial, StepThreeTutorial, StepTwoTutorial } from "@/components";
import background from "@/assets/background/the_game.webp";

const steps:Array<number> = [1,2,3,4,5];

export const PresentacionHome = () => {

    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedStep, setSelectedStep] = useState<1|2|3|4|5>(1);
    const [direction, setDirection] = useState<"prev"|"next">("next");

    useEffect(() => {
      setSelectedStep(1)
    }, [showModal]);

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

    return (
        <Fragment>
            <MotionWrapperLayoutClient>
                <section
                    onClick={() => setShowModal(true)}
                    className="w-full card aspect-video flex justify-center items-start lg:items-center relative overflow-hidden group cursor-pointer"
                >
                    { !imageLoaded && <div className='size-full bg-gradient-to-br from-card to-card-light absolute top-0 left-0 animate-pulse z-0'></div> }
                    <div className="size-full bg-gradient-to-br from-transparent to-black/50 group-hover:to-black/75 absolute top-0 left-0 z-20 transition-200"></div>
                    <button type="button" className="size-14 lg:size-24 rounded-full bg-white/25 flex justify-center items-center absolute lg:relative bottom-6 lg:bottom-0 right-6 lg:right-0 z-30 group-hover:scale-125 transition-200">
                        <PlayIcon className="size-8 lg:size-14 relative left-1"/>
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
                        <p className="hidden lg:block mt-2 w-full max-w-xl text-base">Adentrate con nuestros <b className="text-stannum">videos introductorios</b> para comprender el funcionamiento de la plataforma y empezar a entrenar!</p>
                    </div>
                </section>
            </MotionWrapperLayoutClient>
            <Modal
                className="max-w-7xl h-auto"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <div className="sm:mt-4 lg:mt-2 size-full flex flex-col justify-center items-center">
                    <div className="w-full max-w-sm lg:max-w-3xl relative">
                        <div className="size-full bg-transparent flex items-center absolute top-0 left-0">
                            <div className="w-full h-0.5 bg bg-card-light">
                                <motion.div
                                    aria-hidden
                                    layout
                                    transition={{ duration: 0.125 }}
                                    className={`h-0.5 bg-stannum rounded-full ${ selectedStep <= 1 ? 'w-0' : selectedStep <= 2 ? 'w-1/4' : selectedStep <= 3 ? 'w-2/4' : selectedStep <= 4 ? 'w-3/4' : 'w-full' }`}
                                ></motion.div>
                            </div>
                        </div>
                        <header className="w-full flex justify-between items-center font-black text-lg lg:text-2xl relative">
                            {
                                steps.map( step => (
                                    <div key={`${step}_step`} className='size-10 lg:size-14 rounded-full bg-card-light flex justify-center items-center relative overflow-hidden'>
                                        <AnimatePresence>
                                            {
                                                step <= selectedStep &&
                                                <motion.div
                                                    initial={{ scale: 0, x: '-100%' }}
                                                    animate={{ scale: 3, transition: { duration: 0.125, delay: 0.075 } }}
                                                    exit={{ scale: 0, x:0, transition: { delay: 0, scale: { duration: 0.25 }, x: { duration: 0 } } }}
                                                    className="size-full rounded-full bg-gradient-to-r from-stannum from-75% to-teal-500 absolute top-0 left-0 z-0"
                                                ></motion.div>
                                            }
                                        </AnimatePresence>
                                        <span className="relative z-10">{step}</span>
                                    </div>
                                ))
                            }
                        </header>
                    </div>
                    <AnimatePresence mode='wait' initial={false}>
                        {
                            selectedStep === 1 ? <StepOneTutorial direction={direction} key='step_one_tutorial' /> :
                            selectedStep === 2 ? <StepTwoTutorial direction={direction} key='step_two_tutorial' /> :
                            selectedStep === 3 ? <StepThreeTutorial direction={direction} key='step_three_tutorial' /> :
                            selectedStep === 4 ? <StepFourTutorial direction={direction} key='step_four_tutorial' /> :
                            selectedStep === 5 ? <StepFiveTutorial direction={direction} key='step_five_tutorial' /> :
                            <div className='grow'></div>
                        }
                    </AnimatePresence>
                    <div className="w-full flex justify-center items-center gap-4">
                        <button
                            type="button"
                            onClick={ selectedStep === 1 ? () => { setShowModal(false) } : previousStep}
                            className="w-full h-9 text-sm font-semibold bg-card-light hover:bg-card-lighter rounded tracking-tighter text-white flex justify-center items-center transition-200"
                        >
                            {
                                selectedStep === 1 ? 'Omitir' : 'Anterior'
                            }
                        </button>
                        <button
                            type="button"
                            onClick={ selectedStep === steps.length ? () => { setShowModal(false) } : nextStep}
                            className="w-full h-9 text-sm font-semibold bg-stannum hover:bg-stannum-light rounded tracking-tighter text-white flex justify-center items-center transition-200"
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
