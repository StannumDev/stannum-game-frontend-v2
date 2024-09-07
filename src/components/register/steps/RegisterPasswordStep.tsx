'use client'

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormErrorMessage, ButtonLoading, ButtonShowPassword } from "@/components";
import { watch } from "fs";

const schema = z.object({
    username: z.string().nonempty("Campo requerido."),
    password: z.string().nonempty("Campo requerido.").min(6, "Debe contener más de 6 caracteres.").max(25, "Debe contener menos de 25 caracteres."),
    passwordRepeat: z.string().nonempty("Campo requerido.").min(6, "Debe contener más de 6 caracteres.").max(25, "Debe contener menos de 25 caracteres.")
})

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
            <div className='w-full flex flex-col gap-1 relative'>
                <label htmlFor="password" className="text-white text-lg leading-tight mb-2">Ahora elige una contraseña, debe contener al menos una minúscula, una mayúscula y un número.</label>
                <input
                    type={showPassword ? 'password' : 'text'}
                    minLength={6}
                    maxLength={25}
                    id="password"
                    autoComplete="password"
                    className="peer w-full h-9 px-2 bg-card-light text-white rounded-t lowercase"
                    {...register("password",{
                        required: true,
                        minLength: 6,
                        maxLength: 25
                    })}
                />
                <ButtonShowPassword status={showPassword} changeStatus={setShowPassword} className="absolute bottom-0 right-0 size-9"/>
                <span className="w-0 peer-focus-visible:w-full h-[2px] bg-gradient-to-r from-card to-stannum to-100 absolute bottom-0 translate-y-full transition-all duration-200 ease-in-out"></span>
            </div>
            <FormErrorMessage condition={errors?.password} message={errors?.password?.message} className="mt-2"/>
            <div className='mt-6 w-full flex flex-col gap-1 relative'>
                <label htmlFor="passwordRepeat" className="text-white text-lg leading-tight mb-2">Repite tu contraseña.</label>
                <input
                    type={showPassword ? 'password' : 'text'}
                    minLength={6}
                    maxLength={25}
                    id="passwordRepeat"
                    autoComplete="password"
                    className="peer w-full h-9 px-2 bg-card-light text-white rounded-t lowercase"
                    {...register("passwordRepeat",{
                        required: true,
                        minLength: 6,
                        maxLength: 25,
                        // validate: watch("password")
                    })}
                />
                <ButtonShowPassword status={showPasswordRepeat} changeStatus={setShowPasswordRepeat} className="absolute bottom-0 right-0 size-9"/>
                <span className="w-0 peer-focus-visible:w-full h-[2px] bg-gradient-to-r from-card to-stannum to-100 absolute bottom-0 translate-y-full transition-all duration-200 ease-in-out"></span>
            </div>
            <FormErrorMessage condition={errors?.passwordRepeat} message={errors?.passwordRepeat?.message} className="mt-2"/>
            <div className="mt-8 w-full flex justify-center">
                <ButtonLoading isLoading={isLoading} text="Continuar" className="w-full md:w-32 h-10 text-sm font-semibold"/>
            </div>
        </form>
    )
}
