'use client'

import { Fragment, useState, useEffect } from 'react';
import Image from "next/image";
// import MuxPlayer from "@mux/mux-player-react";
import { IoPlaySharp } from "react-icons/io5";
import { Modal, MotionWrapperLayout } from "@/components";
import background from "@/assets/wallpaper/the_game.webp";
import { motion, AnimatePresence } from 'framer-motion';

export const PresentacionHome = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedStep, setSelectedStep] = useState<1|2|3|4|5>(1);

    const steps:Array<number> = [1,2,3,4,5];

    const previousStep = () => {
        if(!steps.includes(selectedStep - 1)) return;
        setSelectedStep(selectedStep - 1 as 1|2|3|4|5);
    }

    const nextStep = () => {
        if(steps.includes(selectedStep + 1)){
            setSelectedStep(selectedStep + 1 as 1|2|3|4|5);
        } else {
            setShowModal(false);
        }
    }

    useEffect(() => {
      setSelectedStep(1)
    }, [showModal])
    

    return (
        <Fragment>
            <MotionWrapperLayout>
                <section
                    onClick={() => setShowModal(true)}
                    className="w-full card aspect-video flex justify-center items-start lg:items-center relative overflow-hidden group lg:pointer-events-none"
                >
                    <div className="size-full bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 z-10"></div>
                    <button
                        onClick={() => setShowModal(true)}
                        type="button"
                        className="size-14 lg:size-32 rounded-full bg-stannum flex justify-center items-center absolute lg:relative bottom-6 lg:bottom-0 right-6 lg:right-0 z-20 pointer-events-auto hover:scale-105 transition-200"
                    >
                        <IoPlaySharp className="size-8 lg:size-16 relative left-1 lg:left-2"/>
                    </button>
                    <Image src={background} priority alt="Presentación STANNUM Game" className="size-full object-cover blur-[1px] absolute top-0 left-0 z-0"/>
                    <div className="w-full static lg:absolute lg:bottom-8 lg:left-6 z-20">
                        <p className="text-2xl lg:text-4xl leading-tight">Bienvenido a <b className="block font-semibold">STANNUM Game</b></p>
                        <p className="hidden lg:block mt-2 w-full max-w-xl text-base">Adentrate con nuestros <b className="text-stannum">videos introductorios</b> para comprender el funcionamiento de la plataforma y empezar a entrenar!</p>
                    </div>
                </section>
                <Modal
                    className="max-w-7xl"
                    showModal={showModal}
                    setShowModal={setShowModal}
                >
                    <div className="mt-8 size-full flex flex-col justify-center items-center">
                        <div className="w-full max-w-3xl relative">
                            
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
                        <div className="grow"></div>
                        <div className="w-full flex justify-end items-center gap-4">
                            <button
                                onClick={previousStep}
                                type="button"
                                className="w-full lg:w-32 h-9 text-sm font-semibold bg-card-light hover:bg-card-lighter rounded tracking-tighter text-white flex justify-center items-center transition-200"
                            >
                                Anterior
                            </button>
                            <button
                                onClick={nextStep}
                                type="button"
                                className="w-full lg:w-32 h-9 text-sm font-semibold bg-stannum hover:bg-stannum-light rounded tracking-tighter text-white flex justify-center items-center transition-200"
                            >
                                {
                                     selectedStep === steps.length ? 'Finalizar' : 'Siguiente'
                                }
                            </button>
                        </div>
                    </div>
                </Modal>
            </MotionWrapperLayout>
        </Fragment>
    )
}
