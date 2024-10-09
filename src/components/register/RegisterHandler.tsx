'use client'

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo, RegisterEmailStep, GoBackButton, RegisterPasswordStep, RegisterDetailsStep, RegisterPhotoStep } from "@/components";

export const RegisterHandler = () => {

    const [step, setStep] = useState<'email'|'password'|'details'|'photo'>('email')

    const nextStep = () => {
        // setStep(step === 'email' ? 'password' : step === 'password'? 'details' : 'photo');
        setStep(step === 'email' ? 'password' : step === 'password' ? 'details' : step === 'details' ? 'photo' : 'email')
    }

    return (
        <section className="w-full min-h-svh px-4 md:px-0 py-12 md:py-0 flex justify-center items-center">
            <motion.div layout className="w-full max-w-2xl bg-card rounded-lg p-6 md:p-12 flex flex-col justify-center items-center relative overflow-x-hidden">
                <GoBackButton className="-top-4 lg:-top-4 left-0"/>
                <button className="absolute top-0 right-0 text-white bg-red-500 p-2" onClick={nextStep}>asdasd</button>
                <div className="w-full flex flex-col justify-center items-center gap-4">
                    <Logo className="fill-white w-40" pathClassName="fill-white"/>
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase"><b className="text-stannum font-black">Crea</b> tu cuenta</h2>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={step}
                        initial={{ x: 672, opacity: 0, height: 0, scale: 0 }}
                        animate={{ x: 0, opacity: 1, height: 'auto', scale: 1 }}
                        exit={{ x: -672, opacity: 0, height: 0, scale: 0 }}
                        transition={{ bounce: 0 }}
                        className="w-full mt-6 md:mt-8 overflow-hidden md:min-h-48 flex flex-col justify-center items-center"
                    >
                        {step === 'email' && <RegisterEmailStep nextStep={nextStep} />}
                        {step === 'password' && <RegisterPasswordStep />}
                        {step === 'details' && <RegisterDetailsStep />}
                        {step === 'photo' && <RegisterPhotoStep />}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </section>
    )
}
