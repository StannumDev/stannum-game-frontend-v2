'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordRecoveryEmail, verifyPasswordRecoveryOTP, changePasswordWithOTP } from "@/services";
import { errorHandler } from "@/helpers";
import { AppError } from "@/interfaces";
import { STANNUMLogo, GoBackButton, PasswordRecoveryOTP, PasswordRecoveryEmail, PasswordRecoveryNewPassword } from "@/components";

export const PasswordRecoveryHandler = () => {
    
    const router = useRouter();
    const [step, setStep] = useState<'email'|'otp'|'password'>('email');
    const [otp, setOtp] = useState<string|null>();
    const [email, setEmail] = useState<string|null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSendEmail = async (username: string) => {
        setIsLoading(true);
        try {
            const success = await sendPasswordRecoveryEmail(username);
            if (success) {
                setEmail(username);
                setStep('otp');
            }
        } catch (error:unknown) {
            const appError:AppError = errorHandler(error);
            console.error(appError);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (enteredOtp: string) => {
        setIsLoading(true);
        try {
            if (email) {
                const success = await verifyPasswordRecoveryOTP(email, enteredOtp);
                if (success) {
                    setOtp(enteredOtp);
                    setStep('password');
                    router.prefetch('/login');
                }
            }
        } catch (error:unknown) {
            const appError:AppError = errorHandler(error);
            console.error(appError);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (password: string) => {
        setIsLoading(true);
        try {
            if (email && otp) {
                const success = await changePasswordWithOTP(email, otp, password);
                if (success) router.push('/login');
            }
        } catch (error:unknown) {
            const appError:AppError = errorHandler(error);
            console.error(appError);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="w-full min-h-svh px-4 md:px-0 py-12 lg:py-24 flex justify-center items-center">
            <div className="w-full max-w-2xl bg-card rounded-lg p-6 md:p-12 flex flex-col justify-center items-center relative">
                <GoBackButton className="absolute -top-4 lg:-top-4 left-0 -translate-y-full"/>
                <div className="w-full text-center flex flex-col justify-center items-center gap-4">
                    <STANNUMLogo className="w-40 hidden md:block" gameColor='fill-stannum' stannumColor='fill-white'/>
                    <h2 className="text-3xl md:text-5xl font-black uppercase"><b className="text-stannum font-black block">RECUPERA</b> TU CONTRASEÑA</h2>
                </div>
                <div className="w-full mt-4 md:mt-6 overflow-hidden md:min-h-48 flex flex-col justify-center items-center">
                    {step === 'email' && <PasswordRecoveryEmail onSubmit={handleSendEmail} isLoading={isLoading}/>}
                    {step === 'otp' && <PasswordRecoveryOTP onSubmit={handleVerifyOtp} isLoading={isLoading}/>}
                    {step === 'password' && <PasswordRecoveryNewPassword onSubmit={handleResetPassword} isLoading={isLoading}/>}
                </div>
            </div>
        </section>
    )
}