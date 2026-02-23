'use client'

import { useState, useCallback } from "react";
import { AnimatePresence, m } from "framer-motion";
import { createUser } from "@/services";
import { errorHandler } from "@/helpers";
import { RegisterState } from "@/interfaces";
import { STANNUMLogo, RegisterEmailStep, GoBackButton, RegisterPasswordStep, RegisterDetailsStep, RegisterPhotoStep } from "@/components";
import { ReCaptchaProvider } from "@/components/ui/ReCaptchaField";

const steps = ['email', 'password', 'details', 'photo'] as const;

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

    const handleNextStep = useCallback(
        async (newData: Partial<RegisterState> = {}) => {
            const updatedState = { ...registerState, ...newData };
            if (step === 'details') {
                try {
                    await createUser(updatedState);
                } catch (error:unknown) {
                    errorHandler(error);
                    return;
                }
            }
            setRegisterState(updatedState);
            setStep(prev => prev === 'email' ? 'password' : prev === 'password' ? 'details' : prev === 'details' ? 'photo' : 'email');
        },
        [registerState, step]
    );

    return (
        <ReCaptchaProvider>
            <section className="w-full min-h-svh px-4 md:px-0 py-12 lg:py-24 flex justify-center items-center">
                <m.div layout className="w-full max-w-2xl bg-card rounded-lg p-6 md:p-12 flex flex-col justify-center items-center relative">
                    <GoBackButton className="absolute -top-4 lg:-top-4 left-0 -translate-y-full"/>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <STANNUMLogo className="w-40 hidden md:block" gameColor='fill-stannum' stannumColor='fill-white'/>
                        <h2 className="text-3xl md:text-5xl font-black"><b className="text-stannum font-black">Crea</b> tu cuenta</h2>
                    </div>
                    <div className="mt-4 md:mt-6 w-full flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2">
                            {steps.map((s, i) => (
                                <div key={s} className={`h-1.5 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-stannum' : steps.indexOf(step) > i ? 'w-4 bg-stannum/50' : 'w-4 bg-card-light'}`} />
                            ))}
                        </div>
                        <p className="text-sm text-card-lightest">
                            {step === 'email' ? 'Tu correo electrónico' : step === 'password' ? 'Elegí tu contraseña' : step === 'details' ? 'Tus datos personales' : '¡Tu foto de perfil!'}
                        </p>
                    </div>
                    <div className="w-full overflow-x-hidden">
                        <AnimatePresence mode="wait" initial={false}>
                            <m.div
                                key={step}
                                initial={{ height: 0, opacity: 0, }}
                                animate={{ height: 'auto', opacity: 1, }}
                                exit={{ height: 0, opacity: 0, }}
                                transition={{ bounce: 0 }}
                                className="w-full mt-4 md:mt-6 overflow-hidden md:min-h-48 flex flex-col justify-center items-center"
                            >
                                {
                                    step === 'email' ? <RegisterEmailStep handleNextStep={handleNextStep} /> :
                                    step === 'password' ? <RegisterPasswordStep handleNextStep={handleNextStep} /> :
                                    step === 'details' ? <RegisterDetailsStep handleNextStep={handleNextStep} /> :
                                    step === 'photo' && <RegisterPhotoStep />
                                }
                            </m.div>
                        </AnimatePresence>
                    </div>
                </m.div>
            </section>
        </ReCaptchaProvider>
    )
}
