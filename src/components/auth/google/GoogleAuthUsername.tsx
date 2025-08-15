'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkUsernameExists, updateUsername } from "@/services";
import { errorHandler } from "@/helpers";
import { AtIcon } from "@/icons";
import { AppError } from "@/interfaces";
import { FormErrorMessage, SubmitButtonLoading, STANNUMLogo } from "@/components";

const schema = z.object({
    username: z.string().nonempty("Campo requerido.").regex(/^[a-zA-Z0-9._]+$/, "Nombre de usuario inválido.").min(6, "Debe contener más de 6 caracteres.").max(25, "Debe contener menos de 25 caracteres.").trim().toLowerCase(),
})

type Schema = z.infer<typeof schema>

export const GoogleAuthUsername = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }} = useForm<Schema>({ resolver: zodResolver(schema) })
    const router = useRouter();

    const onSubmit: SubmitHandler<Schema> = async ({ username }: Schema) => {
        setIsLoading(true);
        try {
            router.prefetch('/dashboard');
            const usernameAvailable = await checkUsernameExists(username);
            if (!usernameAvailable) {
                console.error("El nombre de usuario ya está en uso.");
                setIsLoading(false);
                return;
            }

            const success = await updateUsername(username);
            if (success) router.push('/dashboard');
        } catch (error) {
            const appError:AppError = errorHandler(error);
            console.error("Error en el registro:", appError);
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <section className="w-full min-h-svh px-4 md:px-0 py-12 lg:py-24 flex justify-center items-center">
        <div className="w-full max-w-2xl bg-card rounded-lg p-6 md:p-12 flex flex-col justify-center items-center relative">
            <div className="w-full flex flex-col justify-center items-center gap-4">
                <STANNUMLogo className="w-40 hidden md:block" gameColor='fill-stannum' stannumColor='fill-white'/>
                <h2 className="text-3xl md:text-5xl font-black uppercase"><b className="text-stannum font-black">Crea</b> tu cuenta</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 w-full">
                <div className='w-full flex flex-col gap-1'>
                    <label htmlFor="username" className="md:text-lg">Elige tu nombre de usuario.</label>
                    <div className="w-full relative">
                        <div className="pl-2 h-10 flex justify-center items-center absolute top-0 left-0">
                            <AtIcon className="text-white/25 size-4 md:size-5"/>
                        </div>
                        <input
                            type='text'
                            enterKeyHint="next"
                            minLength={6}
                            maxLength={25}
                            id="username"
                            autoComplete="username"
                            disabled={isLoading}
                            className='w-full h-10 pl-8 pr-2 border-b border-card-lighter focus-visible:border-stannum placeholder:opacity-50 disabled:text-white/75 transition-200'
                            {...register("username",{
                                required: true,
                                minLength: 6,
                                maxLength: 25
                            })}
                        />
                    </div>
                </div>
                <FormErrorMessage condition={errors?.username} message={errors?.username?.message} className="mt-2"/>
                <div className="mt-8 w-full flex justify-center">
                    <SubmitButtonLoading isLoading={isLoading} text="Continuar" className="w-full md:w-32 h-10 text-sm font-semibold"/>
                </div>
            </form>
        </div>
    </section>
    )
}
