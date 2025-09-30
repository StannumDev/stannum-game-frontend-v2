'use client'

import { ChangeEvent, Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { activateProductKey, verifyProductKey } from "@/services";
import { achievementHandler, callToast, errorHandler } from "@/helpers";   
import { KeyIcon, AlertHexagonIcon, SpinnerIcon } from '@/icons';
import { AppError } from "@/interfaces";
import { FormErrorMessage, Modal, MotionWrapperLayoutClient, SubmitButtonLoading } from "@/components";
import activar_producto from "@/assets/background/activar_producto.webp";
import redeem_code from "@/assets/background/stannum_game_trophy.webp";
import { programs } from "@/config/programs";

const schema = z.object({
    code: z.string()
      .min(1, { message: "Campo requerido." })
      .regex(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/, "Formato incorrecto. Debe ser XXXX-XXXX-XXXX-XXXX con letras y números.")
      .transform((val) => val.toUpperCase()),
  });

type Schema = z.infer<typeof schema>

interface ProductInfo {
    product: string;
    team?: string;
    used: boolean;
};

export const ActivarProductoHome = () => {

    const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
    const [error, setError] = useState<AppError | null>(null);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors }} = useForm<Schema>({ resolver: zodResolver(schema) })

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

    const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await verifyProductKey(data.code);
            const program = programs.find((p) => p.id === response.product )
            if (!program) throw new Error("Ocurrio un error inesperador. Intenta nuevamente o contacta al soporte.")
            setProductInfo({ ...response, product: program.name});
            setIsSubmitted(true);
        } catch (error:unknown) {
            const appError:AppError = errorHandler(error);
            setError(appError);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleActivate = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { achievementsUnlocked } = await activateProductKey(watch("code"));
            achievementsUnlocked && achievementHandler(achievementsUnlocked);
            callToast({ message: { title: "Producto activado", description: `Ya puedes acceder a ${productInfo?.product} desde tu biblioteca.`}})
            window.location.replace("/dashboard/library");
        } catch (error:unknown) {
            const appError:AppError = errorHandler(error);
            setError(appError);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        reset();
        setIsLoading(false);
        setIsSubmitted(false);
        setProductInfo(null);
        setError(null);
      }, [showModal, reset]);
    
    return (
        <Fragment>
            <MotionWrapperLayoutClient className="order-3 lg:order-none">
                <button
                    onClick={ () => setShowModal(true) }
                    type="button"
                    className="w-full card card-link relative overflow-hidden group text-start">
                    <div className="w-full relative z-20">
                        <h2 className="title-2">Activar producto</h2>
                        <p className="mt-2 w-full text-sm lg:text-base"><b className="text-stannum">Ingresa tu clave</b> de producto y comenza a <span className="block">disfrutar tu producto al maximo.</span></p>
                    </div>
                    <div className="size-full bg-gradient-to-r from-card to-transparent to-[150%] absolute top-0 left-0 z-10"></div>
                    <div className="size-full absolute top-0 left-0 z-0 group-hover:scale-125 transition-200">
                        <Image priority src={activar_producto} alt="Activar producto STANNUM Game" className="size-full object-cover"/>
                    </div>
                </button>
            </MotionWrapperLayoutClient>
            <Modal
                className="max-w-5xl lg:aspect-video h-auto p-0"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <div className="size-full flex flex-col lg:flex-row rounded-lg divide-card divide-x">
                    <div className="w-full lg:grow h-48 lg:h-auto relative">
                        <div className="size-full bg-gradient-to-br from-transparent to-black/75 absolute top-0 left-0 z-10"></div>
                        <Image src={redeem_code} fill alt="Activar producto STANNUM Game" className="size-full object-cover object-[90%_50%] rounded-t-lg lg:rounded-t-none lg:rounded-s-lg"/>
                    </div>
                    <main className="w-full lg:max-w-[calc(384px+4rem)] p-6 g:p-8 flex flex-col text-center lg:text-start">
                        <h2 className="title-2 text-5xl text-stannum">Activa un <span className="block text-white">producto</span></h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 lg:mt-6 w-full max-w-sm flex flex-col gap-2" id="formActivarProducto">
                            <label htmlFor="code" className="w-full max-w-xs">Ingresa tu clave de producto para comenzar tu entrenamiento.</label>
                            <div className='mt-2 w-full relative'>
                                <input
                                    type='text'
                                    enterKeyHint="done"
                                    minLength={19}
                                    maxLength={19}
                                    id="code"
                                    autoComplete="off"
                                    disabled={isSubmitted||isLoading}
                                    placeholder="XXXX-XXXX-XXXX-XXXX"
                                    className="w-full h-10 ps-10 pr-2 bg-card rounded tracking-wide uppercase placeholder:text-card-lightest placeholder:tracking-wide disabled:text-white/75"
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
                        { isSubmitted && productInfo && !productInfo.used && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 w-full">
                                <p className="hidden lg:block w-full max-w-xs">Esta clave de producto corresponde a:</p>
                                <div className="mt-0 lg:mt-4 flex flex-col lg:flex-row items-center gap-3 text-stannum">
                                    <AlertHexagonIcon className="size-8 lg:size-6" />
                                    <div className="flex flex-col">
                                        <p className="subtitle-1 text-white">Programa</p>
                                        <h3 className="text-xl font-semibold uppercase tracking-widest">{productInfo.product}</h3>
                                    </div>
                                </div>
                                {/* <div className="mt-4 flex flex-col lg:flex-row items-center gap-3 text-stannum">
                                    <AlertHexagonIcon className="size-6 hidden lg:block" />
                                    <div className="flex flex-col">
                                        <p className="subtitle-1 text-white">Equipo</p>
                                        <h3 className="text-xl font-semibold uppercase tracking-widest">{productInfo.team}</h3>
                                    </div>
                                </div> */}
                            </motion.div>
                        )}
                        {error && <FormErrorMessage condition={!!error} message={error.friendlyMessage} className="mt-4"/> }
                        <div className="mt-6 lg:mt-4 w-full grow flex justify-end items-end gap-4">
                            <button
                                type="button"
                                onClick={ () => { setShowModal(false); reset() } }
                                className="w-full h-9 text-sm font-semibold bg-card-light hover:bg-card-lighter rounded tracking-tighter flex justify-center items-center transition-200"
                            >
                                Cancelar
                            </button>
                            { isSubmitted && productInfo && !productInfo.used ?
                                <button
                                    type="button"
                                    onClick={handleActivate}
                                    disabled={isLoading}
                                    className="mt-6 w-full h-9 bg-stannum hover:bg-stannum-light disabled:bg-stannum-light text-card text-sm font-semibold rounded tracking-tighter flex justify-center items-center transition-200"
                                >
                                    { isLoading ? <SpinnerIcon className="animate-spin size-6"/> : "Activar producto"}
                                </button>
                            :
                                <SubmitButtonLoading isLoading={isLoading} text="Verificar" form="formActivarProducto" className="w-full h-9 text-sm font-semibold"/>
                            }
                        </div>
                    </main>
                </div>
            </Modal>
        </Fragment>
    )
}