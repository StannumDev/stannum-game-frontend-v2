'use client'

import { useState } from "react";
import { SpinnerIcon } from "@/icons";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components";

interface Props {
    onSubmit: (otp: string) => void;
    isLoading: boolean;
}

export const PasswordRecoveryOTP = ({ onSubmit, isLoading }: Props) => {
    
    const [otp, setOtp] = useState("");

    const handleVerify = () => {
        if (otp.length === 6) {
             onSubmit(otp);
        }
    };

    const handleInputChange = (value: string) => {
        const sanitizedValue = value.replace(/[^0-9]/g, "");
        setOtp(sanitizedValue);
    };
    
    return (
        <div className="w-full grow flex flex-col items-center text-center">
            <p className="md:text-lg">Si existe una cuenta asociada, hemos enviado un <b className="text-stannum">código de verificación</b> de 6 dígitos a tu correo electrónico. Si no encuentras el correo en tu bandeja de entrada, revisa en <b className="text-stannum">spam o correo no deseado</b>.</p>
            <label htmlFor="otp" className="sr-only">Ingresa el código de verificación que recibiste por correo.</label>
            <div className="mt-6">
                <InputOTP
                    id="otp"
                    enterKeyHint="next"
                    minLength={6}
                    maxLength={6}
                    value={otp}
                    onChange={handleInputChange}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <div className="mt-8">
                <button
                    type="button"
                    onClick={handleVerify}
                    disabled={otp.length !== 6 || isLoading}
                    className={`w-40 h-10 bg-stannum hover:bg-stannum-light disabled:hover:bg-stannum disabled:opacity-50 rounded text-sm font-semibold tracking-tighter flex justify-center items-center transition-200`}
                >
                    { isLoading ?
                        <SpinnerIcon className="animate-spin size-6"/>
                    :
                        'Verificar'
                    }
                </button>
            </div>
        </div>
    )
}