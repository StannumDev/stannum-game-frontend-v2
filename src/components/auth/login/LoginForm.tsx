'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { requestLogin } from "@/services";
import { errorHandler } from "@/helpers";
import { AppError } from "@/interfaces";
import { UnlockIcon, UserIcon } from "@/icons";
import { FormErrorMessage, SubmitButtonLoading, ButtonShowPassword } from "@/components";

const schema = z.object({
    username: z.string().nonempty("Campo requerido.").trim().toLowerCase(),
    password: z.string().nonempty("Campo requerido."),
})

type Schema = z.infer<typeof schema>

export const LoginForm = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string|null>();
    const { register, handleSubmit, formState: { errors }} = useForm<Schema>({ resolver: zodResolver(schema) })
    const router = useRouter();

    const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            router.prefetch('/dashboard');
            const success = await requestLogin(data);
            if (success) router.push('/dashboard');
        } catch (error: unknown) {
            const appError:AppError = errorHandler(error);
            setErrorMessage(appError.friendlyMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mt-6 lg:mt-8">
            <div className="w-full flex flex-col">
                <div className='w-full flex flex-col gap-1'>
                    <input
                        type='text'
                        inputMode="email"
                        enterKeyHint="next"
                        maxLength={50}
                        id="username"
                        autoComplete="email"
                        className="peer order-2 w-full h-10 px-2 border-b border-card-lighter focus-visible:border-stannum transition-200"
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
                        autoComplete="password"
                        className="peer order-2 w-full h-10 pl-2 pr-10 border-b border-card-lighter focus-visible:border-stannum transition-200"
                        {...register("password",{
                            required: true,
                            maxLength: 50
                        })}
                    />
                    <div className="order-1 w-full flex items-center gap-1 peer-focus-visible:text-stannum">
                        <UnlockIcon className="w-5 h-4 relative transition-200"/>
                        <label htmlFor="username" className="text-lg transition-200">Contraseña</label>
                    </div>
                    <ButtonShowPassword status={showPassword} changeStatus={setShowPassword} className="absolute bottom-0 right-0 size-10"/>
                </div>
                <div className="mt-4 w-full flex justify-end">
                    <FormErrorMessage condition={errors?.password} message={errors?.password?.message} className="w-fit"/>
                    <Link href={"/password-recovery"} className="text-xs font-semibold uppercase tracking-widest text-card-lightest hover:text-stannum whitespace-nowrap transition-200">¿Olvidaste tu contraseña?</Link>
                </div>
            </div>
            <FormErrorMessage condition={!!errorMessage} message={errorMessage||''} className="mt-4 w-fit"/>
            <SubmitButtonLoading isLoading={isLoading} text="Iniciar sesión" className="mt-8 w-full h-9 text-sm font-semibold"/>
        </form>
    )
}