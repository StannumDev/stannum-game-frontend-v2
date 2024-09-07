'use client'

import { useState } from "react"
import { Logo } from "../ui/Logo"
import { RegisterEmailStep, GoBackButton, RegisterPasswordStep } from "@/components"

export const RegisterHandler = () => {

    const [step, setStep] = useState<'email'|'password'|'details'|'photo'>('password')

    return (
        <section className="w-full min-h-svh flex justify-center items-center">
            <div className="w-full max-w-2xl bg-card rounded-lg min-h-96 py-12 px-12 flex flex-col justify-center items-center relative">
                <GoBackButton className="-top-4 lg:-top-4 left-0"/>
                <div className="w-full flex flex-col justify-center items-center gap-4">
                    <Logo className="fill-white w-40" pathClassName="fill-white"/>
                    <h2 className="text-5xl font-black text-white uppercase"><b className="text-stannum">Crea</b> tu cuenta</h2>
                </div>
                <div className="w-full mt-8">
                    {step === 'email' && <RegisterEmailStep />}
                    {step === 'password' && <RegisterPasswordStep />}
                </div>
            </div>
        </section>
    )
}
