'use client'

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { STANNUMLogo, RegisterEmailStep, GoBackButton, RegisterPasswordStep, RegisterDetailsStep, RegisterPictureStep } from "@/components";
import { RegisterState } from "@/interfaces";



export const RegisterHandler = () => {

    const [step, setStep] = useState<'email'|'password'|'details'|'photo'>('email')
    const [registerState, setRegisterState] = useState<RegisterState>({
        email: "",
        username: "",
        password: "",
        name: "",
        birthdate: "",
        country: "",
        region: "",
        enterprise: "",
        enterpriseRole: "",
        aboutme: "",
    });

    const updateRegisterState = (data: Partial<RegisterState>) => {
        setRegisterState((prev) => ({ ...prev, ...data }));
        console.log(registerState)
    };

    const nextStep = () => {
        setStep(step === 'email' ? 'password' : step === 'password' ? 'details' : step === 'details' ? 'photo' : 'email')
    }

    return (
        <section className="w-full min-h-svh px-4 md:px-0 py-12 lg:py-24 flex justify-center items-center">
            <motion.div layout className="w-full max-w-2xl bg-card rounded-lg p-6 md:p-12 flex flex-col justify-center items-center relative">
                <GoBackButton className="absolute -top-4 lg:-top-4 left-0 -translate-y-full"/>
                {/* <button className="absolute top-0 right-0 bg-red-500 p-2" onClick={nextStep}>asdasd</button> */}
                <div className="w-full flex flex-col justify-center items-center gap-4">
                    <STANNUMLogo className="fill-white w-40 hidden md:block"/>
                    <h2 className="text-3xl md:text-5xl font-black uppercase"><b className="text-stannum font-black">Crea</b> tu cuenta</h2>
                </div>
                <div className="w-full overflow-x-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={step}
                            initial={{ height: 0, opacity: 0, }}
                            animate={{ height: 'auto', opacity: 1, }}
                            exit={{ height: 0, opacity: 0, }}
                            transition={{ bounce: 0 }}
                            className="w-full mt-4 md:mt-6 overflow-hidden md:min-h-48 flex flex-col justify-center items-center"
                        >
                            {
                                step === 'email' ? <RegisterEmailStep nextStep={nextStep} updateRegisterState={updateRegisterState} /> :
                                step === 'password' ? <RegisterPasswordStep nextStep={nextStep} updateRegisterState={updateRegisterState} /> :
                                step === 'details' ? <RegisterDetailsStep nextStep={nextStep} updateRegisterState={updateRegisterState} /> :
                                step === 'photo' && <RegisterPictureStep />
                            }
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </section>
    )
}
