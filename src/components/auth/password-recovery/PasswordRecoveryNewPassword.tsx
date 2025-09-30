'use client'

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormErrorMessage, SubmitButtonLoading, ButtonShowPassword } from "@/components";

const schema = z.object({
    password: z.string().min(1, { message: "Campo requerido." }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,50}$/, "Debe contener al menos una minúscula, una mayúscula y un número, y tener entre 8 y 50 caracteres.").min(8, "Debe contener más de 8 caracteres.").max(50, "Debe contener menos de 50 caracteres."),
    passwordRepeat: z.string().min(1, { message: "Campo requerido." }),
}).refine((data) => data.password === data.passwordRepeat, { message: "Las contraseñas no coinciden.", path: ["passwordRepeat"] });

type Schema = z.infer<typeof schema>

interface Props {
    onSubmit: (password: string) => void;
    isLoading: boolean;
}

export const PasswordRecoveryNewPassword = ({onSubmit, isLoading}:Props) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({ resolver: zodResolver(schema) });

    const handleFormSubmit: SubmitHandler<Schema> = (data) => {
        onSubmit(data.password);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
            <div className="w-full">
                <div className='w-full flex flex-col gap-1 relative'>
                    <label htmlFor="password" className="md:text-lg">Ahora crea tu nueva contraseña!</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        enterKeyHint="next"
                        minLength={8}
                        maxLength={50}
                        id="password"
                        autoComplete="password"
                        placeholder="********"
                        disabled={isLoading}
                        className={`w-full h-10 pl-2 pr-10 border-b border-card-lighter focus-visible:border-stannum placeholder:opacity-50 disabled:text-white/75 ${ !showPassword && 'tracking-widest'} transition-colors ease-in-out duration-200`}
                        {...register("password",{
                            required: true,
                            minLength: 8,
                            maxLength: 50
                        })}
                    />
                    <ButtonShowPassword status={showPassword} changeStatus={setShowPassword} className="absolute bottom-0 right-0 size-10"/>
                </div>
                <p className={`mt-2 text-xs ${errors?.password ? 'text-invalid' : 'text-neutral-400'}`}>Debe contener al menos una minúscula, una mayúscula, un número y tener entre 8 a 50 caracteres.</p>
            </div>
            <div className="mt-6 md:mt-4 w-full">
                <div className='w-full flex flex-col gap-1 relative'>
                    <label htmlFor="passwordRepeat" className="md:text-lg leading-tight mb-2">Repite tu contraseña.</label>
                    <input
                        type={showPasswordRepeat ? 'text' : 'password'}
                        enterKeyHint="done"
                        minLength={8}
                        maxLength={50}
                        id="passwordRepeat"
                        autoComplete="password"
                        placeholder="********"
                        disabled={isLoading}
                        className={`w-full h-10 pl-2 pr-10 border-b border-card-lighter focus-visible:border-stannum placeholder:opacity-50 disabled:text-white/75 ${ !showPasswordRepeat && 'tracking-widest'} transition-colors ease-in-out duration-200`}
                        {...register("passwordRepeat",{
                            required: true,
                            minLength: 8,
                            maxLength: 50
                        })}
                    />
                    <ButtonShowPassword status={showPasswordRepeat} changeStatus={setShowPasswordRepeat} className="absolute bottom-0 right-0 size-10"/>
                </div>
                <FormErrorMessage condition={errors?.passwordRepeat} message={errors?.passwordRepeat?.message} className="mt-2"/>
            </div>
            <div className="mt-8 w-full flex justify-center">
                <SubmitButtonLoading isLoading={isLoading} text="Cambiar contraseña" className="w-full md:w-40 h-10 text-sm font-semibold"/>
            </div>
        </form>
    )
}
