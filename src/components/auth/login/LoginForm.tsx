'use client'

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { requestLogin, requestResendActivation } from "@/services";
import { errorHandler, getRedirectUrl } from "@/helpers";
import { AppError } from "@/interfaces";
import { UnlockIcon, UserIcon } from "@/icons";
import { FormErrorMessage, SubmitButtonLoading, ButtonShowPassword } from "@/components";

const schema = z.object({
    username: z.string().min(1, { message: "Campo requerido." }).trim().toLowerCase(),
    password: z.string().min(1, { message: "Campo requerido." }),
})

type Schema = z.infer<typeof schema>

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const LoginForm = () => {
    const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string|null>();
    const [needsActivation, setNeedsActivation] = useState<boolean>(false);
    const [activationEmail, setActivationEmail] = useState<string>("");
    const [resendEmailInput, setResendEmailInput] = useState<string>("");
    const [resendState, setResendState] = useState<"idle"|"loading"|"sent">("idle");
    const { register, handleSubmit, formState: { errors }} = useForm<Schema>({ resolver: zodResolver(schema) })

    const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
        setIsLoading(true);
        setErrorMessage(null);
        setNeedsActivation(false);
        setResendState("idle");
        setResendEmailInput("");
        try {
            const success = await requestLogin(data);
            if (success) window.location.replace(getRedirectUrl(searchParams.get('redirect')));
        } catch (error:unknown) {
            const appError:AppError = errorHandler(error, { silent: true });
            if (appError.code === 'AUTH_022') {
                setNeedsActivation(true);
                setActivationEmail(isEmail(data.username) ? data.username : "");
            }
            setErrorMessage(appError.friendlyMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const onResendActivation = async (emailToUse?: string) => {
        const email = emailToUse ?? activationEmail;
        if (!email || !isEmail(email)) return;
        setResendState("loading");
        try {
            await requestResendActivation(email);
        } catch {
            // Respuesta genérica: no exponemos el estado de la cuenta, mostramos éxito igual.
        } finally {
            setResendState("sent");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mt-6 lg:mt-8">
            <div className="w-full flex flex-col">
                <div className='w-full flex flex-col gap-1'>
                    <input
                        type='text'
                        inputMode="email"
                        enterKeyHint="next"
                        maxLength={50}
                        id="username"
                        autoComplete="email"
                        disabled={isLoading}
                        className="peer order-2 w-full h-10 px-2 border-b border-card-lighter focus-visible:border-stannum disabled:text-white/75 transition-200"
                        {...register("username",{
                            required: true,
                            maxLength: 50
                        })}
                    />
                    <div className="order-1 w-full flex items-center gap-1 peer-focus-visible:text-stannum">
                        <UserIcon className="size-5 relative transition-200"/>
                        <label htmlFor="username" className="text-lg transition-200">Usuario o correo electrónico</label>
                    </div>
                </div>
                <FormErrorMessage condition={errors?.username} message={errors?.username?.message} className="mt-4"/>
                <div className='mt-4 w-full flex flex-col items-start gap-1 relative'>
                    <input
                        type={ showPassword ? 'text' : 'password'}
                        enterKeyHint="done"
                        maxLength={50}
                        id="password"
                        autoComplete="password"
                        disabled={isLoading}
                        className="peer order-2 w-full h-10 pl-2 pr-10 border-b border-card-lighter focus-visible:border-stannum disabled:text-white/75 transition-200"
                        {...register("password",{
                            required: true,
                            maxLength: 50
                        })}
                    />
                    <div className="order-1 w-full flex items-center gap-1 peer-focus-visible:text-stannum">
                        <UnlockIcon className="w-5 h-4 relative transition-200"/>
                        <label htmlFor="password" className="text-lg transition-200">Contraseña</label>
                    </div>
                    <ButtonShowPassword status={showPassword} changeStatus={setShowPassword} className="absolute bottom-0 right-0 size-10"/>
                </div>
                <div className="mt-4 w-full flex justify-end">
                    <FormErrorMessage condition={errors?.password} message={errors?.password?.message} className="w-fit"/>
                    <Link href={"/password-recovery"} className="subtitle-1 hover:text-stannum transition-200">¿Olvidaste tu contraseña?</Link>
                </div>
            </div>
            <FormErrorMessage condition={!!errorMessage} message={errorMessage||''} className="mt-4 w-fit"/>
            {needsActivation && (
                <div className="mt-4 w-full rounded border border-stannum/40 bg-stannum/5 p-4 flex flex-col gap-2">
                    {resendState === "sent" ? (
                        <p className="text-sm text-stannum">Si la cuenta existe y está pendiente de activación, te reenviamos el correo. Revisá tu bandeja de entrada y spam.</p>
                    ) : (
                        <>
                            <p className="text-sm text-white/80">Tu cuenta todavía no está activada. Activala desde el enlace que te enviamos por correo.</p>
                            {activationEmail ? (
                                <button
                                    type="button"
                                    onClick={() => onResendActivation()}
                                    disabled={resendState === "loading"}
                                    className="w-fit text-sm font-semibold text-stannum hover:text-stannum-light disabled:opacity-60 transition-200"
                                >
                                    {resendState === "loading" ? "Enviando..." : "Reenviar mail de activación"}
                                </button>
                            ) : (
                                <div className="flex gap-2 items-center mt-1">
                                    <input
                                        type="email"
                                        placeholder="Tu correo electrónico"
                                        value={resendEmailInput}
                                        onChange={e => setResendEmailInput(e.target.value)}
                                        disabled={resendState === "loading"}
                                        className="flex-1 h-8 px-2 text-sm border-b border-card-lighter bg-transparent focus-visible:border-stannum disabled:opacity-60 outline-none transition-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onResendActivation(resendEmailInput)}
                                        disabled={resendState === "loading" || !isEmail(resendEmailInput)}
                                        className="text-sm font-semibold text-stannum hover:text-stannum-light disabled:opacity-40 transition-200 whitespace-nowrap"
                                    >
                                        {resendState === "loading" ? "Enviando..." : "Reenviar"}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
            <SubmitButtonLoading isLoading={isLoading} text="Iniciar sesión" className="mt-8 w-full h-12 bg-stannum hover:bg-stannum-light rounded text-card lg:text-lg font-semibold flex justify-center items-center transition-200"/>
        </form>
    )
}
