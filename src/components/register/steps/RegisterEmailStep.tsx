'use client'

import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormErrorMessage, SubmitButtonLoading } from "@/components";
import { validateReCAPTCHA } from "@/services";
// import { checkEmailExist } from "@/services/register";

interface Props{
    nextStep:() => void
}

const schema = z.object({
    email: z.string().nonempty("Campo requerido.").email("Correo electrónico invalido.").trim().toLowerCase(),
})

type Schema = z.infer<typeof schema>

export const RegisterEmailStep = ({nextStep}:Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }} = useForm<Schema>({ resolver: zodResolver(schema) })

    const [reCAPTCHACompleted, setReCAPTCHACompleted] = useState<boolean>(true) // TODO: poner en false
    const [reCAPTCHAError, setReCAPTCHAError] = useState<boolean>(false);
    const [reCAPTCHAErrorMessage, setReCAPTCHAErrorMessage] = useState<string>('');
    const reCAPTCHARef = useRef<ReCAPTCHA | null>(null);

    const resetReCAPTCHA = () => {
        if (reCAPTCHARef?.current) {
            reCAPTCHARef?.current?.reset();
        }
    };

    const errorReCAPTCHA = (message:string) => {
        setReCAPTCHAErrorMessage(message);
        setReCAPTCHAError(true);
        resetReCAPTCHA();
    }

    const handleReCAPTCHA = async (value:string|null) => {
        setReCAPTCHAError(false);
        setReCAPTCHAErrorMessage('');
        try {
            const success:boolean = await validateReCAPTCHA(value);
            if(!success){
                errorReCAPTCHA('Reintente completar el ReCAPTCHA.');
                setReCAPTCHACompleted(false);
            }
            setReCAPTCHACompleted(true);
        } catch (error:unknown) {
            // setRecaptchaError(true)
            // setRecaptchaErrorMessage(error.response.data.message)
            console.log(error);
            resetReCAPTCHA();
        }
    }

    const onSubmit:SubmitHandler<Schema> = async ({email}:Schema) => {
        setIsLoading(true);
        try {
            if(!reCAPTCHACompleted){
                setReCAPTCHAErrorMessage('Debe completar el ReCAPTCHA.');
                setReCAPTCHAError(true);
                resetReCAPTCHA();
                setIsLoading(false);
                return
            }
            // const available = await checkEmailExist(email);
            console.log(email);
            
            const available = true;
            if(!available){
                setIsLoading(false);
                return;
            }
            nextStep();
            setIsLoading(false);
        } catch (error:unknown) {
            console.log(error);
            // setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="w-full">
                <div className='w-full flex flex-col gap-1 relative'>
                    <label htmlFor="email" className="text-white text-base md:text-lg text-center md:text-start md:px-0 mb-2 md:mb-0">Elige el correo electrónico que usaras para tu cuenta.</label>
                    <input
                        type='email'
                        maxLength={50}
                        id="email"
                        autoComplete="email"
                        placeholder="ejemplo@stannumgame.com"
                        className="peer w-full h-9 px-2 bg-card-light text-white rounded-t lowercase placeholder:opacity-50"
                        {...register("email",{
                            required: true,
                            maxLength: 50
                        })}
                        />
                    <span className="w-0 peer-focus-visible:w-full h-[2px] bg-gradient-to-r from-card to-stannum to-100 absolute bottom-0 translate-y-full transition-200"></span>
                </div>
                <FormErrorMessage condition={errors?.email} message={errors?.email?.message} className="mt-2"/>
            </div>
            <div className="mt-8 w-full h-20 flex justify-center items-center">
                <ReCAPTCHA
                    size={'normal'}
                    hl='es-419'
                    theme={'dark'}
                    ref={reCAPTCHARef}
                    onError={ () => { errorReCAPTCHA('Hubo un error, complete de nuevo el ReCAPTCHA.') }}
                    onExpired={ () => { errorReCAPTCHA('El ReCAPTCHA expiró, vuelva a completarlo.') }}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                    onChange={handleReCAPTCHA}
                />
            </div>
            <FormErrorMessage condition={reCAPTCHAError} message={reCAPTCHAErrorMessage} className="mt-2 text-center"/>
            <div className="mt-8 w-full flex justify-center">
                <SubmitButtonLoading isLoading={isLoading} text="Continuar" className="w-full md:w-32 h-10 text-sm font-semibold"/>
            </div>
        </form>
    )
}
