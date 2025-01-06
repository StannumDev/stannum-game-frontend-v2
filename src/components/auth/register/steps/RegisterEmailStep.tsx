'use client';

import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormErrorMessage, SubmitButtonLoading } from "@/components";
import { RegisterState } from "@/interfaces";
import { validateReCAPTCHA, checkEmailExists } from "@/services";

interface Props {
    nextStep: () => void;
    updateRegisterState: (data: Partial<RegisterState>) => void;
}

const schema = z.object({
    email: z.string().nonempty("Campo requerido.").email("Correo electrónico inválido.").trim().toLowerCase(),
});

type Schema = z.infer<typeof schema>;

export const RegisterEmailStep = ({ nextStep, updateRegisterState }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [reCAPTCHAError, setReCAPTCHAError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

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

    const onSubmit: SubmitHandler<Schema> = async ({ email }) => {
        setIsLoading(true);
        try {
            if (!reCAPTCHACompleted) {
                setReCAPTCHAError("Debe completar el reCAPTCHA.");
                setIsLoading(false);
                return;
            }

            const emailAvailable = await checkEmailExists(email);
            if (!emailAvailable) {
                setIsLoading(false);
                return;
            }

            updateRegisterState({ email });
            nextStep();
        } catch (error) {
            console.error("Error en el registro:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="w-full">
                <div className="w-full flex flex-col gap-1 relative">
                    <label htmlFor="email" className="md:text-lg text-center md:text-start md:px-0 mb-2 md:mb-0">
                        Elige el correo electrónico que usarás para tu cuenta.
                    </label>
                    <input
                        type="email"
                        inputMode="email"
                        enterKeyHint="done"
                        maxLength={50}
                        id="email"
                        autoComplete="email"
                        placeholder="stannum@stannumgame.com"
                        className="mt-2 w-full h-10 px-2 border-b border-card-lighter lowercase focus-visible:border-stannum placeholder:opacity-50 transition-200"
                        {...register("email", { required: true, maxLength: 50 })}
                    />
                </div>
                <FormErrorMessage condition={errors?.email} message={errors?.email?.message} className="mt-2" />
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
                <SubmitButtonLoading isLoading={isLoading} text="Continuar" className="w-full md:w-32 h-10 text-sm font-semibold" />
            </div>
        </form>
    );
};