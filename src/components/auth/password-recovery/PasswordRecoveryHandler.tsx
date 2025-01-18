'use client'

import { useRef, useState } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { sendPasswordRecoveryEmail, validateReCAPTCHA } from "@/services";
import { errorHandler } from "@/helpers";
import { STANNUMLogo, GoBackButton, FormErrorMessage, SubmitButtonLoading } from "@/components";
import { AppError } from "@/interfaces";

const schema = z.object({
    username: z.string().nonempty("Campo requerido.").trim().toLowerCase(),
})

type Schema = z.infer<typeof schema>

export const PasswordRecoveryHandler = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }} = useForm<Schema>({ resolver: zodResolver(schema) })

    const [isSended, setIsSended] = useState<boolean>(false);

    const [reCAPTCHAError, setReCAPTCHAError] = useState<string | null>(null);
    const reCAPTCHARef = useRef<ReCAPTCHA | null>(null);
    const [reCAPTCHACompleted, setReCAPTCHACompleted] = useState(false);

    const resetReCAPTCHA = () => {
        if (reCAPTCHARef?.current) {
            reCAPTCHARef.current.reset();
        }
        setReCAPTCHAError(null);
        setReCAPTCHACompleted(false);
    };
    
    const handleReCAPTCHA = async (token: string | null) => {
        try {
            const isValid = await validateReCAPTCHA(token);
            if (!isValid) {
                setReCAPTCHAError("ReCAPTCHA no válido, por favor intente nuevamente.");
                resetReCAPTCHA();
                return;
            }
            setReCAPTCHACompleted(true);
            setReCAPTCHAError(null);
        } catch (error) {
            console.error("Error validando reCAPTCHA:", error);
            setReCAPTCHAError("Ocurrió un error al validar el reCAPTCHA. Inténtalo de nuevo.");
            resetReCAPTCHA();
        }
    };

    const onSubmit: SubmitHandler<Schema> = async ({ username }: Schema) => {
        setIsLoading(true);
        try {
            if (!reCAPTCHACompleted) {
                setReCAPTCHAError("Debe completar el reCAPTCHA.");
                setIsLoading(false);
                return;
            }

            const success = await sendPasswordRecoveryEmail(username);
            if (success) setIsSended(true);
        } catch (error) {
            const appError:AppError = errorHandler(error);
            console.log(appError);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="w-full min-h-svh px-4 md:px-0 py-12 lg:py-24 flex justify-center items-center">
            <div className="w-full max-w-2xl bg-card rounded-lg p-6 md:p-12 flex flex-col justify-center items-center relative">
                <GoBackButton className="absolute -top-4 lg:-top-4 left-0 -translate-y-full"/>
                <div className="w-full text-center flex flex-col justify-center items-center gap-4">
                    <STANNUMLogo className="fill-white w-40 hidden md:block"/>
                    <h2 className="text-3xl md:text-5xl font-black uppercase"><b className="text-stannum font-black block">RECUPERA</b> TU CONTRASEÑA</h2>
                </div>
                <div className="w-full mt-4 md:mt-6 overflow-hidden md:min-h-48 flex flex-col justify-center items-center">
                    { !isSended ?
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                            <div className="w-full">
                                <div className='w-full flex flex-col gap-1 relative'>
                                    <label htmlFor="username" className="md:text-lg text-center md:text-start md:px-0 mb-2 md:mb-0">Ingresa tu correo electrónico o nombre de usuario</label>
                                    <input
                                        type='text'
                                        inputMode="email"
                                        enterKeyHint="done"
                                        maxLength={50}
                                        id="username"
                                        autoComplete="username"
                                        placeholder="stannum@stannumgame.com"
                                        className="mt-2 w-full h-10 px-2 border-b border-card-lighter lowercase focus-visible:border-stannum placeholder:opacity-50 transition-200"
                                        {...register("username",{
                                            required: true,
                                            maxLength: 50
                                        })}
                                    />
                                </div>
                                <FormErrorMessage condition={errors?.username} message={errors?.username?.message} className="mt-2"/>
                            </div>
                            <div className="mt-8 mx-auto w-[300px] h-[74px] border border-card-light rounded-lg flex justify-center items-center overflow-hidden relative">
                                <div className="w-[304px] h-[78px] absolute -top-px scale-[1.0125]">
                                    <ReCAPTCHA
                                        size="normal"
                                        hl="es-419"
                                        theme="dark"
                                        ref={reCAPTCHARef}
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                        onError={() => setReCAPTCHAError("Hubo un error con el reCAPTCHA.")}
                                        onExpired={() => setReCAPTCHAError("El reCAPTCHA expiró. Por favor, inténtalo nuevamente.")}
                                        onChange={handleReCAPTCHA}
                                    />
                                </div>
                            </div>
                            <FormErrorMessage condition={!!reCAPTCHAError} message={reCAPTCHAError || ''} className="mt-2 text-center" />
                            <div className="mt-8 w-full flex justify-center">
                                <SubmitButtonLoading isLoading={isLoading} text="Continuar" className="w-full md:w-32 h-10 text-sm font-semibold"/>
                            </div>
                        </form>
                        :
                        <div className="grow flex flex-col items-center text-center">
                            <p className="md:text-lg">Si una cuenta está asociada a la información proporcionada, <b className="text-stannum">recibirás un correo</b> con un enlace de recuperación. Revisa tu <b className="text-stannum">bandeja de entrada</b>, spam o correo no deseado.</p>
                            <p className="mt-4 text-xs md:text-sm text-white/40 grow">Si no recibes un correo en unos minutos, intenta nuevamente o contacta con soporte para más asistencia.</p>
                            <Link href={"/"} className="mt-4 md:mt-8 w-full md:w-32 h-10 text-sm font-semibold bg-stannum hover:bg-stannum-light rounded tracking-tighter flex justify-center items-center transition-200">Volver al inicio</Link>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}
