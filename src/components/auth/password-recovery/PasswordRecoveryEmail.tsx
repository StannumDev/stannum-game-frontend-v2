'use client'

import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { validateReCAPTCHA } from "@/services";
import { FormErrorMessage, SubmitButtonLoading } from "@/components";

const schema = z.object({
    username: z.string().nonempty("Campo requerido.").trim().toLowerCase(),
})

type Schema = z.infer<typeof schema>

interface Props {
    onSubmit: (username: string) => void;
    isLoading: boolean;
}

export const PasswordRecoveryEmail = ({ onSubmit, isLoading }: Props) => {

    const { register, handleSubmit, formState: { errors }} = useForm<Schema>({ resolver: zodResolver(schema) })
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

    const onSubmitHandler: SubmitHandler<Schema> = async ({ username }: Schema) => {
        if (!reCAPTCHACompleted) {
            setReCAPTCHAError("Debe completar el reCAPTCHA.");
            return;
        }
        onSubmit(username);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
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
                        disabled={isLoading}
                        className="mt-2 w-full h-10 px-2 border-b border-card-lighter lowercase focus-visible:border-stannum placeholder:opacity-50 disabled:text-white/75 transition-200"
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
    )
}