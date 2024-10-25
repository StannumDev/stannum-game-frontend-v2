'use client'

import { ChangeEvent, Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { KeyIcon, AlertHexagonIcon } from '@/icons';
import { FormErrorMessage, Modal, MotionWrapperLayoutClient, SubmitButtonLoading } from "@/components";
import activar_producto from "@/assets/wallpaper/activar_producto.webp";
import redeem_code from "@/assets/wallpaper/redeem_code.webp";

const schema = z.object({
    code: z.string()
      .nonempty("Campo requerido.")
      .regex(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/, "Formato incorrecto. Debe ser XXXX-XXXX-XXXX-XXXX con letras y números.")
      .transform((val) => val.toUpperCase()),
  });

type Schema = z.infer<typeof schema>

export const ActivarProductoHome = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const { register, handleSubmit, setValue, reset, formState: { errors }} = useForm<Schema>({ resolver: zodResolver(schema) })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        let cleanValue = value.replace(/[^A-Z0-9-]/g, '');

        if (cleanValue.length > 0) {
            cleanValue = cleanValue
                .split('')
                .filter((char, index) => {
                    if (char === '-' && (index !== 4 && index !== 9 && index !== 14)) {
                        return false;
                    }
                    return true;
                })
                .join('');
        }
    
        const parts = cleanValue.replace(/-/g, '').match(/.{1,4}/g) || [];
        let formattedValue = parts.join('-');
    
        if (value.endsWith('-') && [5, 10, 15].includes(value.length)) {
            formattedValue += '-';
        }
    
        setValue('code', formattedValue.substring(0, 19));
    };

    const onSubmit:SubmitHandler<Schema> = async (data:Schema) => {
        setIsLoading(true);
        // setErrorMessage(null);
        try {
            console.log(data);
            setIsSubmitted(true);
            // callToast(response);
            setIsLoading(false)
        } catch (error:unknown) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        reset();
        setIsLoading(false);
        setIsSubmitted(false);
    }, [showModal, reset])
    

    return (
        <Fragment>
            <MotionWrapperLayoutClient>
                <button
                    onClick={ () => setShowModal(true) }
                    type="button"
                    className="w-full card card-link relative overflow-hidden group text-start">
                    <div className="w-full relative z-20">
                        <h2 className="title-2">Activar producto</h2>
                        <p className="mt-2 w-full text-sm lg:text-base"><b className="text-stannum">Ingresa tu código</b> de activación y comenza a <span className="block">disfrutar tu producto al maximo.</span></p>
                    </div>
                    <div className="size-full bg-gradient-to-r from-card to-transparent to-[150%] absolute top-0 left-0 z-10"></div>
                    <div className="size-full absolute top-0 left-0 z-0 group-hover:scale-125 transition-200">
                        <Image priority src={activar_producto} alt="Activar producto STANNUM Game" className="size-full object-cover"/>
                    </div>
                </button>
            </MotionWrapperLayoutClient>
            <Modal
                className="max-w-5xl h-auto p-0"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <div className="size-full flex flex-col lg:flex-row rounded-lg divide-card divide-x">
                    <div className="w-full lg:grow h-48 lg:h-auto relative">
                        <div className="size-full bg-gradient-to-br from-transparent to-black/75 absolute top-0 left-0 z-10"></div>
                        <Image src={redeem_code} alt="Activar producto STANNUM Game" className="size-full object-cover rounded-t-lg lg:rounded-t-none lg:rounded-s-lg"/>
                    </div>
                    <main className="w-full lg:max-w-[calc(384px+4rem)] p-6 g:p-8 flex flex-col text-center lg:text-start">
                        <h2 className="title-2 text-5xl text-stannum">Activa un <span className="block text-white">producto</span></h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 lg:mt-6 w-full max-w-sm flex flex-col gap-2" id="formActivarProducto">
                            <label htmlFor="code" className="w-full max-w-xs">Ingresa tu código de activación para comenzar tu entrenamiento.</label>
                            <div className='mt-2 w-full relative'>
                                <input
                                    type='text'
                                    minLength={19}
                                    maxLength={19}
                                    id="code"
                                    autoComplete="off"
                                    disabled={isSubmitted}
                                    placeholder="XXXX-XXXX-XXXX-XXXX"
                                    className="w-full h-10 ps-10 pr-2 bg-card rounded tracking-wide uppercase placeholder:text-card-lightest placeholder:tracking-wide disabled:text-card-lighter"
                                    {...register("code",{
                                        required: true,
                                        minLength: 19,
                                        maxLength: 19,
                                        onChange: handleInputChange
                                    })}
                                />
                                <div className={`size-10 flex justify-center items-center absolute top-0 left-0 ${ isSubmitted ? 'text-card-lighter' : 'text-card-lightest'}`}>
                                    <KeyIcon className="size-5 -rotate-45"/>
                                </div>
                            </div>
                            <FormErrorMessage condition={errors?.code} message={errors?.code?.message}/>
                        </form>
                        {
                            isSubmitted &&
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-6 w-full"
                            >
                                <p className="w-full max-w-xs">Este código de producto corresponde a:</p>
                                <div className="mt-4 flex flex-col lg:flex-row items-center gap-3 text-stannum">
                                    <AlertHexagonIcon className="size-8 lg:size-6"/>
                                    <div className="flex flex-col">
                                        <p className="subtitle-1 text-white">Producto</p>
                                        <h3 className="text-xl font-semibold uppercase tracking-widest">TRENNO Mark Digital</h3>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-col lg:flex-row items-center gap-3 text-stannum">
                                    <AlertHexagonIcon className="size-6 hidden lg:block"/>
                                    <div className="flex flex-col">
                                        <p className="subtitle-1 text-white">Equipo</p>
                                        <h3 className="text-xl font-semibold uppercase tracking-widest">STANNUM</h3>
                                    </div>
                                </div>
                            </motion.div>
                        }
                        <div className="mt-6 lg:mt-4 w-full grow flex justify-end items-end gap-4">
                            <button
                                type="button"
                                onClick={ () => { setShowModal(false); reset() } }
                                className="w-full h-9 text-sm font-semibold bg-card-light hover:bg-card-lighter rounded tracking-tighter flex justify-center items-center transition-200"
                            >
                                Cancelar
                            </button>
                            <SubmitButtonLoading isLoading={isLoading} text="Verificar" form="formActivarProducto" className="w-full h-9 text-sm font-semibold"/>
                        </div>
                    </main>
                </div>
            </Modal>
        </Fragment>
    )
}