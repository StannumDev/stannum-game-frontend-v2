'use client'

import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { errorHandler } from "@/helpers";
import { STANNUMLogo, FormErrorMessage, SubmitButtonLoading, ButtonShowPassword } from "@/components";
import { AppError } from "@/interfaces";
import { changePasswordWithToken } from "@/services";

const schema = z.object({
    password: z.string().nonempty("Campo requerido.").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,50}$/, "Debe contener al menos una minúscula, una mayúscula y un número, y tener entre 8 y 50 caracteres.").min(8, "Debe contener más de 8 caracteres.").max(50, "Debe contener menos de 50 caracteres."),
    passwordRepeat: z.string().nonempty("Campo requerido."),
}).refine((data) => data.password === data.passwordRepeat, { message: "Las contraseñas no coinciden.", path: ["passwordRepeat"] });

type Schema = z.infer<typeof schema>

interface Props{
    token: string
}

export const PasswordRecoveryNewPassword = ({token}:Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }} = useForm<Schema>({ resolver: zodResolver(schema) })

    const [isSended, setIsSended] = useState<boolean>(false);

    const onSubmit: SubmitHandler<Schema> = async ({password}: Schema) => {
        setIsLoading(true);
        try {
            const success = await changePasswordWithToken(token, password);
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
                <div className="w-full text-center flex flex-col justify-center items-center gap-4">
                    <STANNUMLogo className="fill-white w-40 hidden md:block"/>
                    <h2 className="text-3xl md:text-5xl font-black uppercase"><b className="text-stannum font-black block">RECUPERA</b> TU CONTRASEÑA</h2>
                </div>
                <div className="w-full mt-4 md:mt-6 overflow-hidden md:min-h-48 flex flex-col justify-center items-center">
                    { !isSended ?
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
                                        className={`w-full h-10 pl-2 pr-10 border-b border-card-lighter focus-visible:border-stannum placeholder:opacity-50 ${ !showPassword && 'tracking-widest'} transition-colors ease-in-out duration-200`}
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
                                        className={`w-full h-10 pl-2 pr-10 border-b border-card-lighter focus-visible:border-stannum placeholder:opacity-50 ${ !showPasswordRepeat && 'tracking-widest'} transition-colors ease-in-out duration-200`}
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
                        :
                        <div className="grow flex flex-col items-center text-center">
                            <div className="w-full grow flex justify-center items-center">
                                <p className="md:text-lg">Tu <b className="text-stannum">contraseña ha sido restablecida con éxito.</b> Ahora puedes iniciar sesión con tu nueva contraseña. Si tienes algún problema, por favor contacta con soporte.</p>
                            </div>
                            <Link href={"/"} className="mt-4 md:mt-8 w-full md:w-32 h-10 text-sm font-semibold bg-stannum hover:bg-stannum-light rounded tracking-tighter flex justify-center items-center transition-200">Volver al inicio</Link>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}
