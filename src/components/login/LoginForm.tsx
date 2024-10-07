'use client'

import { requestLogin } from "@/services";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FiUnlock, FiUser } from "react-icons/fi";
import { FormErrorMessage, SubmitButtonLoading, ButtonShowPassword } from "@/components";

const schema = z.object({
    username: z.string().nonempty("Campo requerido."),
    password: z.string().nonempty("Campo requerido."),
})

type Schema = z.infer<typeof schema>

export const LoginForm = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    // const [errorMessage, setErrorMessage] = useState<string|null>();
    const { register, handleSubmit, formState: { errors }} = useForm<Schema>({ resolver: zodResolver(schema) })
    const router = useRouter();

    const onSubmit:SubmitHandler<Schema> = async (data:Schema) => {
        setIsLoading(true);
        // setErrorMessage(null);
        try {
            console.log(data);
            await requestLogin(data);
            // callToast(response);
            router.push('/dashboard');
            setIsLoading(false)
        } catch (error:unknown) {
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mt-6 lg:mt-8">
            <div className="w-full flex flex-col gap-4">
                <div className='w-full flex flex-col gap-1 relative'>
                    <input
                        type='text'
                        maxLength={50}
                        id="username"
                        autoComplete="username"
                        className="peer order-2 w-full h-9 px-2 bg-card-light text-white rounded-t"
                        {...register("username",{
                            required: true,
                            maxLength: 50
                        })}
                    />
                    <span className="w-0 peer-focus-visible:w-full h-[2px] bg-gradient-to-r from-card to-stannum to-100 absolute bottom-0 translate-y-full transition-200"></span>
                    <div className="order-1 w-full flex items-center gap-1 text-white peer-focus-visible:text-stannum">
                        <FiUser className="size-5 relative transition-200"/>
                        <label htmlFor="username" className="text-lg transition-200">Correo electrónico</label>
                    </div>
                </div>
                <FormErrorMessage condition={errors?.username} message={errors?.username?.message} className="-mt-2"/>
                <div className='w-full max-w-xl flex flex-col justify-start items-start gap-1 relative'>
                    <input
                        type={ showPassword ? 'text' : 'password'}
                        maxLength={50}
                        autoComplete="password"
                        className="peer order-2 w-full h-9 px-2 bg-card-light text-white rounded-t"
                        {...register("password",{
                            required: true,
                            maxLength: 50
                        })}
                    />
                    <span className="w-0 peer-focus-visible:w-full h-[2px] bg-gradient-to-r from-card to-stannum to-100 absolute bottom-0 translate-y-full transition-200"></span>
                    <div className="order-1 w-full flex items-center gap-1 text-white peer-focus-visible:text-stannum">
                        <FiUnlock className="w-5 h-4 relative transition-200"/>
                        <label htmlFor="username" className="text-lg transition-200">Contraseña</label>
                    </div>
                    <ButtonShowPassword status={showPassword} changeStatus={setShowPassword} className="absolute bottom-0 right-0 size-9"/>
                </div>
                <FormErrorMessage condition={errors?.password} message={errors?.password?.message} className="-mt-2"/>
            </div>
            <div className="mt-8 w-full flex justify-end">
                <SubmitButtonLoading isLoading={isLoading} text="Iniciar sesión" className="w-full lg:w-32 h-9 text-sm font-semibold"/>
            </div>
        </form>
    )
}