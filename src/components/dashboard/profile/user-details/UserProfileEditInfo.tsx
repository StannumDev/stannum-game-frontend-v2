'use client'

import { Fragment, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { EditIcon, PlusIcon, SelectorIcon, TrashIcon } from "@/icons";
import { updateUserProfile } from "@/services";
import { Modal, FormErrorMessage, SubmitButtonLoading } from "@/components";
import { achievementHandler, errorHandler } from "@/helpers";
import { AppError, FullUserDetails } from "@/interfaces";

interface Props{
    user: FullUserDetails,
    fetchUserData: (force?: boolean) => Promise<void>
}

const socialEnum = z.enum(["LinkedIn", "Instagram", "Twitter", "TikTok", "Facebook", "YouTube", "GitHub", "Website", "Otra"]);
const schema = z.object({
    name: z.string().min(1, { message: "Campo requerido." }).min(2, "Debe contener más de 2 caracteres.").max(50, "Debe contener menos de 50 caracteres.").regex(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/, "El nombre solo puede contener letras, números y espacios."),
    birthdate: z.string().min(1, { message: "Campo requerido." }).refine(date => {
        const today = new Date();
        const birthDate = new Date(date);
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18 && birthDate <= today;
    }, { message: "Debes tener al menos 18 años y la fecha no puede estar en el futuro." }),
    country: z.string().min(1, { message: "Campo requerido." }),
    region: z.string().min(1, { message: "Campo requerido." }),
    enterprise: z.string().min(1, { message: "Campo requerido." }).max(100, "Debe contener menos de 100 caracteres."),
    enterpriseRole: z.string().min(1, { message: "Campo requerido." }).max(50, "Debe contener menos de 50 caracteres."),
    socialLinks: z.array(z.object({
        platform: socialEnum, 
        url: z.string().url("Debe ser una URL válida.").refine((url) => { 
            return url.startsWith('http://') || url.startsWith('https://')
        }, { message: "La URL debe comenzar con http:// o https://" })
    })).max(5, "No puedes añadir más de 5 redes sociales.").optional(),
    aboutme: z.string().min(1, { message: "Campo requerido." }).max(2600, "Debe contener menos de 2600 caracteres.")
});

type Schema = z.infer<typeof schema>

export const UserProfileEditInfo = ({user, fetchUserData}:Props) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, setValue, reset, control, formState: { errors }} = useForm<Schema>({ resolver: zodResolver(schema) });
    const { fields, append, remove } = useFieldArray({ control, name: "socialLinks" });

    const [country, setCountry] = useState<string|undefined>('');
    const [region, setRegion] = useState<string|undefined>('');

    const onSubmit:SubmitHandler<Schema> = async (data:Schema) => {
        setIsLoading(true);
        try {
            const { achievementsUnlocked } = await updateUserProfile(data);
            achievementsUnlocked && achievementHandler(achievementsUnlocked);
            await fetchUserData(true);
            setShowModal(false);
        } catch (error:unknown) {
            const appError:AppError = errorHandler(error);
            console.error(appError);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleFormValues = () => {
            setValue('name', user.profile.name);
            const dateOnly = user.profile.birthdate ? new Date(user.profile.birthdate).toISOString().split("T")[0] : '';
            setValue('birthdate', dateOnly);
            setValue('country', user.profile.country || "");
            setCountry(user.profile.country);
            setValue('region', user.profile.region || "");
            setRegion(user.profile.region);
            setValue('enterprise', user.enterprise?.name || "");
            setValue('enterpriseRole', user.enterprise?.jobPosition || "");
            setValue('socialLinks', user.profile.socialLinks || []);
            setValue('aboutme', user.profile.aboutMe || "");
        }
        handleFormValues();
    }, [user, showModal, setValue])
    
    return (
        <Fragment>
            <button
                type="button"
                onClick={() => setShowModal(true)}
                className="size-8 bg-transparent lg:hover:bg-card-light rounded-lg lg:flex justify-center items-center group absolute top-2 right-2 z-10 transition-200"
            >
                <span className="sr-only">Editar información del usuario</span>
                <EditIcon className="size-5 text-neutral-400 group-hover:text-white transition-200"/>
            </button>
            <Modal
                className="max-w-4xl h-auto"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <div className="size-full">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full" id="formEditProfile">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="w-full">
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="name" className="md:text-lg required">Nombre completo</label>
                                <input
                                    type='text'
                                    enterKeyHint="next"
                                    minLength={2}
                                    maxLength={50}
                                    id="name"
                                    autoComplete="name"
                                    autoCapitalize="words"
                                    disabled={isLoading}
                                    className="w-full h-10 px-2 border-b border-card-lighter focus-visible:border-stannum disabled:text-white/75 transition-200"
                                    {...register("name")}
                                />
                            </div>
                            <FormErrorMessage condition={errors?.name} message={errors?.name?.message} className="mt-2"/>
                        </div>
                        <div className="w-full">
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="birthdate" className="md:text-lg">Fecha de nacimiento</label>
                                <input
                                    type='date'
                                    enterKeyHint="next"
                                    id="birthdate"
                                    autoComplete="bday"
                                    disabled={isLoading}
                                    className="w-full h-10 px-2 border-b border-card-lighter focus-visible:border-stannum disabled:text-white/75 transition-200"
                                    {...register("birthdate")}
                                />
                            </div>
                            <FormErrorMessage condition={errors?.birthdate} message={errors?.birthdate?.message} className="mt-2"/>
                        </div>
                        <div className="w-full">
                            <div className='w-full flex flex-col gap-1 relative'>
                                <label htmlFor="country" className="md:text-lg">País</label>
                                <CountryDropdown
                                    value={country||""}
                                    onChange={(val) => { setCountry(val); setValue("country", val) }}
                                    name="country"
                                    id="country"
                                    defaultOptionLabel="Seleccionar"
                                    disabled={isLoading}
                                    classes="w-full h-10 px-2 bg-transparent lg:focus:bg-card border-b border-card-lighter focus-visible:border-stannum outline-none focus-visible:outline-none disabled:text-white/75 appearance-none transition-200"
                                />
                                <span className="text-sm absolute bottom-3 right-2 pointer-events-none"><SelectorIcon/></span>
                            </div>
                            <FormErrorMessage condition={errors?.country} message="Campo requerido." className="mt-2"/>
                        </div>
                        <div className="w-full">
                            <div className='w-full flex flex-col gap-1 relative'>
                                <label htmlFor="region" className="md:text-lg">Región</label>
                                <RegionDropdown
                                    country={country||""}
                                    value={region||""}
                                    onChange={(val) => { setRegion(val); setValue("region", val) }}
                                    name="region"
                                    id="region"
                                    disableWhenEmpty={true}
                                    defaultOptionLabel="Seleccionar"
                                    disabled={isLoading}
                                    classes="w-full h-10 px-2 bg-transparent lg:focus:bg-card border-b border-card-lighter focus-visible:border-stannum outline-none focus-visible:outline-none disabled:text-white/75 disabled:opacity-25 appearance-none transition-200"
                                />
                                <span className="text-sm absolute bottom-3 right-2 pointer-events-none"><SelectorIcon/></span>
                            </div>
                            <FormErrorMessage condition={errors?.region} message="Campo requerido." className="mt-2"/>
                        </div>
                        <div className="w-full">
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="enterprise" className="md:text-lg required">Empresa</label>
                                <input
                                    type='text'
                                    enterKeyHint="next"
                                    maxLength={50}
                                    id="enterprise"
                                    autoComplete="organization"
                                    autoCapitalize="true"
                                    disabled={isLoading}
                                    className="w-full h-10 px-2 border-b border-card-lighter focus-visible:border-stannum disabled:text-white/75 transition-200"
                                    {...register("enterprise")}
                                />
                            </div>
                            <FormErrorMessage condition={errors?.enterprise} message={errors?.enterprise?.message} className="mt-2"/>
                        </div>
                        <div className="w-full">
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="enterpriseRole" className="md:text-lg required">Tu rol en la empresa</label>
                                <input
                                    type='text'
                                    enterKeyHint="next"
                                    maxLength={50}
                                    id="enterpriseRole"
                                    autoComplete="organization-title"
                                    autoCapitalize="true"
                                    disabled={isLoading}
                                    className="w-full h-10 px-2 border-b border-card-lighter focus-visible:border-stannum disabled:text-white/75 transition-200"
                                    {...register("enterpriseRole")}
                                />
                            </div>
                            <FormErrorMessage condition={errors?.enterpriseRole} message={errors?.enterpriseRole?.message} className="mt-2"/>
                        </div>
                    </div>
                    <div className="mt-4 w-full">
                        <div className='w-full flex flex-col gap-1'>
                            <label htmlFor="aboutme" className="md:text-lg required">Sobre mí</label>
                            <textarea
                                maxLength={2600}
                                id="aboutme"
                                autoComplete="off"
                                autoCapitalize="true"
                                placeholder='Cuéntanos un poco sobre ti...'
                                disabled={isLoading}
                                className="w-full h-72 md:h-52 p-2 bg-card-light/40 border border-transparent focus-visible:border-stannum rounded resize-none placeholder:text-neutral-400 disabled:text-white/75 transition-200"
                                {...register("aboutme")}
                            />
                        </div>
                        <FormErrorMessage condition={errors?.aboutme} message={errors?.aboutme?.message} className="mt-2"/>
                    </div>
                    <div className="mt-6 w-full">
                        <label className="md:text-lg mb-3 block font-semibold">Redes Sociales</label>
                        {fields.length === 0 && <p className="text-sm text-neutral-400 mb-3">Conecta tus redes para que otros jugadores puedan conocerte mejor.</p>}
                        <div className="space-y-3">
                            <AnimatePresence mode="popLayout">
                                {fields.map((field, index) => (
                                    <motion.div 
                                        key={field.id}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        layout
                                        className="w-full"
                                    >
                                        <div className="flex gap-2 items-center relative">
                                            <select
                                                {...register(`socialLinks.${index}.platform`)}
                                                className="w-36 h-10 px-3 border border-card-lighter bg-card rounded focus-visible:border-stannum outline-none transition-200 appearance-none"
                                                defaultValue={field.platform}
                                                disabled={isLoading}
                                            >
                                                {socialEnum.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                            <span className="text-sm absolute bottom-3 left-[120px] pointer-events-none"><SelectorIcon/></span>
                                            <input
                                                {...register(`socialLinks.${index}.url`)}
                                                placeholder="https://tu-enlace.com"
                                                className="flex-1 h-10 px-3 border border-card-lighter bg-card rounded focus-visible:border-stannum outline-none transition-200"
                                                defaultValue={field.url}
                                                disabled={isLoading}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="size-10 flex-shrink-0 hover:bg-invalid/20 text-invalid rounded-lg flex items-center justify-center transition-200 group"
                                                disabled={isLoading}
                                            >
                                                <TrashIcon className="size-5"/>
                                            </button>
                                        </div>
                                        {errors.socialLinks?.[index]?.url && <FormErrorMessage condition={true} message={errors.socialLinks[index]?.url?.message} className="mt-1"/>}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        {fields.length < 5 &&
                            <button
                                type="button"
                                onClick={() => append({ platform: "Website", url: "" })}
                                className="mt-3 px-4 py-2 text-sm text-stannum font-semibold border border-stannum/30 hover:bg-stannum hover:text-black rounded-lg flex items-center gap-1 transition-200"
                                disabled={isLoading}
                            >
                                <PlusIcon/>
                                Añadir red social ({fields.length}/5)
                            </button>
                        }
                        {errors.socialLinks?.root && <FormErrorMessage condition={true} message={errors.socialLinks.root.message} className="mt-2"/>}
                    </div>
                    <div className="mt-6 lg:mt-4 w-full grow flex justify-end items-end gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                setShowModal(false);
                                reset();
                            }}
                            className="w-full h-10 text-sm font-semibold bg-card-light hover:bg-card-lighter rounded tracking-tighter flex justify-center items-center transition-200"
                        >
                            Cancelar
                        </button>
                        <SubmitButtonLoading isLoading={isLoading} text="Confirmar" form="formEditProfile" className="w-full h-10 text-sm font-semibold"/>
                    </div>
                </form>
                </div>
            </Modal>
        </Fragment>
    )
}