'use client'

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormErrorMessage, ButtonLoading, ButtonShowPassword } from "@/components";
import { CiAt } from "react-icons/ci";

const schema = z.object({
    username: z.string().nonempty("Campo requerido.").regex(/^[a-z0-9._]+$/, "Nombre de usuario invalido.").min(6, "Debe contener más de 6 caracteres.").max(25, "Debe contener menos de 25 caracteres.").trim().toLowerCase(),
    password: z.string().nonempty("Campo requerido.").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,25}$/, "Contraseña invalida.").min(6, "Debe contener más de 6 caracteres.").max(25, "Debe contener menos de 25 caracteres."),
    passwordRepeat: z.string().nonempty("Campo requerido.")
}).refine((data) => data.password === data.passwordRepeat, { message: "Las contraseñas no coinciden.", path: ["passwordRepeat"] });

type Schema = z.infer<typeof schema>

export const RegisterPasswordStep = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }} = useForm<Schema>({ resolver: zodResolver(schema) })

    const onSubmit:SubmitHandler<Schema> = async (data:Schema) => {
        setIsLoading(true);
        try {
            console.log(data);
            // setIsLoading(false);
        } catch (error:any) {
            console.log(error);
            // setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="w-full">
                <div className='w-full flex flex-col gap-1'>
                    <label htmlFor="username" className="text-white text-base md:text-lg">Elige tu nombre de usuario.</label>
                    <div className="w-full flex">
                        <div className="size-9 bg-card-lighter flex justify-center items-center rounded-s">
                            <CiAt className="text-neutral-400 stroke-1 text-base md:text-lg"/>
                        </div>
                        <div className="grow flex flex-col gap-1 relative">
                            <input
                                type='text'
                                minLength={6}
                                maxLength={25}
                                id="username"
                                autoComplete="username"
                                className="peer w-full h-9 px-2 bg-card-light text-white rounded-tr lowercase"
                                {...register("username",{
                                    required: true,
                                    minLength: 6,
                                    maxLength: 25
                                })}
                                />
                            <span className="w-0 peer-focus-visible:w-full h-[2px] bg-gradient-to-r from-card to-stannum to-100 absolute bottom-0 translate-y-full transition-all duration-200 ease-in-out"></span>
                        </div>
                    </div>
                </div>
                <FormErrorMessage condition={errors?.username} message={errors?.username?.message} className="mt-2"/>
            </div>
            <div className="mt-6 md:mt-4 w-full">
                <div className='w-full flex flex-col gap-1 relative'>
                    <label htmlFor="password" className="text-white text-base md:text-lg">Ahora crea tu contraseña!</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        minLength={6}
                        maxLength={25}
                        id="password"
                        autoComplete="password"
                        className={`peer w-full h-9 px-2 bg-card-light text-white rounded-t ${ !showPassword && 'tracking-widest'}`}
                        {...register("password",{
                            required: true,
                            minLength: 6,
                            maxLength: 25
                        })}
                    />
                    <ButtonShowPassword status={showPassword} changeStatus={setShowPassword} className="absolute bottom-0 right-0 size-9"/>
                    <span className="w-0 peer-focus-visible:w-full h-[2px] bg-gradient-to-r from-card to-stannum to-100 absolute bottom-0 translate-y-full transition-all duration-200 ease-in-out"></span>
                </div>
                <p className="mt-2 text-sm text-neutral-400">Debe contener al menos una minúscula, una mayúscula y un número.</p>
                <FormErrorMessage condition={errors?.password} message={errors?.password?.message} className="mt-2"/>
            </div>
            <div className="mt-6 md:mt-4 w-full">
                <div className='w-full flex flex-col gap-1 relative'>
                    <label htmlFor="passwordRepeat" className="text-white text-base md:text-lg leading-tight mb-2">Repite tu contraseña.</label>
                    <input
                        type={showPasswordRepeat ? 'text' : 'password'}
                        minLength={6}
                        maxLength={25}
                        id="passwordRepeat"
                        autoComplete="password"
                        className={`peer w-full h-9 px-2 bg-card-light text-white rounded-t ${ !showPasswordRepeat && 'tracking-widest'}`}
                        {...register("passwordRepeat",{
                            required: true,
                            minLength: 6,
                            maxLength: 25
                        })}
                    />
                    <ButtonShowPassword status={showPasswordRepeat} changeStatus={setShowPasswordRepeat} className="absolute bottom-0 right-0 size-9"/>
                    <span className="w-0 peer-focus-visible:w-full h-[2px] bg-gradient-to-r from-card to-stannum to-100 absolute bottom-0 translate-y-full transition-all duration-200 ease-in-out"></span>
                </div>
                <FormErrorMessage condition={errors?.passwordRepeat} message={errors?.passwordRepeat?.message} className="mt-2"/>
            </div>
            <div className="mt-8 w-full flex justify-center">
                <ButtonLoading isLoading={isLoading} text="Continuar" className="w-full md:w-32 h-10 text-sm font-semibold"/>
            </div>
        </form>
    )
}
