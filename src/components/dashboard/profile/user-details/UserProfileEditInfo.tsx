'use client'

import { Fragment, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { updateUserProfile } from "@/services";
import { FullUserDetails } from "@/interfaces";
import { EditIcon, SelectorIcon } from "@/icons";
import { Modal, FormErrorMessage, SubmitButtonLoading } from "@/components";

interface Props{
    user: FullUserDetails,
    fetchUserData: () => Promise<void>
}

const schema = z.object({
    name: z.string().nonempty("Campo requerido.").min(2, "Debe contener más de 2 caracteres.").max(50, "Debe contener menos de 50 caracteres."),
    birthdate: z.string().nonempty("Campo requerido.")
    .refine(date => {
        const today = new Date();
        const birthDate = new Date(date);
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18;
    }, { message: "Debes tener al menos 18 años." }),
    country: z.string().nonempty("Campo requerido."),
    region: z.string().nonempty("Campo requerido."),
    enterprise: z.string().nonempty("Campo requerido.").max(100, "Debe contener menos de 100 caracteres."),
    enterpriseRole: z.string().nonempty("Campo requerido.").max(50, "Debe contener menos de 50 caracteres."),
    // website: z.string().url("Debe ser una URL válida.").max(100, "Debe contener menos de 100 caracteres.").optional(),
    aboutme: z.string().nonempty("Campo requerido.").max(2600, "Debe contener menos de 2600 caracteres.")
});

type Schema = z.infer<typeof schema>

export const UserProfileEditInfo = ({user, fetchUserData}:Props) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, setValue, reset, formState: { errors }} = useForm<Schema>({ resolver: zodResolver(schema) });

    const [country, setCountry] = useState<string|undefined>('');
    const [region, setRegion] = useState<string|undefined>('');

    const onSubmit:SubmitHandler<Schema> = async (data:Schema) => {
        setIsLoading(true);
        try {
            console.log(data)
            const success = await updateUserProfile(data);
            if (success) {
                console.log("Perfil actualizado con éxito.");
                await fetchUserData();
                setShowModal(false);
            }
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleFormValues = () => {
            setValue('name', user.profile.name);
            const dateOnly = new Date(user.profile.birthdate||"").toISOString().split("T")[0];
            setValue('birthdate', dateOnly);
            setValue('country', user.profile.country || "");
            setCountry(user.profile.country);
            setValue('region', user.profile.region || "");
            setRegion(user.profile.region);
            setValue('enterprise', user.enterprise?.name || "");
            setValue('enterpriseRole', user.enterprise?.jobPosition || "");
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
                                <label htmlFor="name" className="md:text-lg">Nombre</label>
                                <input
                                    type='text'
                                    enterKeyHint="next"
                                    maxLength={50}
                                    id="name"
                                    autoComplete="name"
                                    autoCapitalize="true"
                                    className="w-full h-10 px-2 border-b border-card-lighter focus-visible:border-stannum transition-200"
                                    {...register("name",{
                                        required: true,
                                        maxLength: 50
                                    })}
                                    />
                            </div>
                            <FormErrorMessage condition={errors?.name} message={errors?.name?.message} className="mt-2"/>
                        </div>
                        <div className="w-full">
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="name" className="md:text-lg">Fecha de nacimiento</label>
                                <input
                                    type='date'
                                    enterKeyHint="next"
                                    id="birthdate"
                                    autoComplete="bday"
                                    className="w-full h-10 px-2 border-b border-card-lighter focus-visible:border-stannum transition-200"
                                    {...register("birthdate",{
                                        required: true
                                    })}
                                    />
                            </div>
                            <FormErrorMessage condition={errors?.birthdate} message={errors?.birthdate?.message} className="mt-2"/>
                        </div>
                        <div className="w-full">
                            <div className='w-full flex flex-col gap-1 relative'>
                                <label htmlFor="name" className="md:text-lg">País</label>
                                <CountryDropdown
                                    value={country||""}
                                    onChange={(val) => { setCountry(val); setValue("country", val) }}
                                    name="country"
                                    id="country"
                                    defaultOptionLabel="Seleccionar"
                                    classes="w-full h-10 px-2 bg-transparent lg:focus:bg-card border-b border-card-lighter focus-visible:border-stannum outline-none focus-visible:outline-none appearance-none transition-200"
                                />
                                <span className="text-sm absolute bottom-3 right-2 pointer-events-none"><SelectorIcon/></span>
                            </div>
                            <FormErrorMessage condition={errors?.country} message="Campo requerido." className="mt-2"/>
                        </div>
                        <div className="w-full">
                            <div className='w-full flex flex-col gap-1 relative'>
                                <label htmlFor="name" className="md:text-lg">Región</label>
                                <RegionDropdown
                                    country={country||""}
                                    value={region||""}
                                    onChange={(val) => { setRegion(val); setValue("region", val) }}
                                    name="region"
                                    id="region"
                                    disableWhenEmpty={true}
                                    defaultOptionLabel="Seleccionar"
                                    classes="w-full h-10 px-2 bg-transparent lg:focus:bg-card border-b border-card-lighter focus-visible:border-stannum outline-none focus-visible:outline-none disabled:opacity-25 appearance-none transition-200"
                                />
                                <span className="text-sm absolute bottom-3 right-2 pointer-events-none"><SelectorIcon/></span>
                            </div>
                            <FormErrorMessage condition={errors?.region} message="Campo requerido." className="mt-2"/>
                        </div>
                        <div className="w-full">
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="enterprise" className="md:text-lg">Empresa</label>
                                <input
                                    type='text'
                                    enterKeyHint="next"
                                    maxLength={50}
                                    id="enterprise"
                                    autoComplete="organization"
                                    autoCapitalize="true"
                                    className="w-full h-10 px-2 border-b border-card-lighter focus-visible:border-stannum transition-200"
                                    {...register("enterprise",{
                                        required: true,
                                        maxLength: 50
                                    })}
                                    />
                            </div>
                            <FormErrorMessage condition={errors?.enterprise} message={errors?.enterprise?.message} className="mt-2"/>
                        </div>
                        <div className="w-full">
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="enterpriseRole" className="md:text-lg">Tu rol en la empresa</label>
                                <input
                                    type='text'
                                    enterKeyHint="next"
                                    maxLength={50}
                                    id="enterpriseRole"
                                    autoComplete="organization-title"
                                    autoCapitalize="true"
                                    className="w-full h-10 px-2 border-b border-card-lighter focus-visible:border-stannum transition-200"
                                    {...register("enterpriseRole",{
                                        required: true,
                                        maxLength: 50
                                    })}
                                    />
                            </div>
                            <FormErrorMessage condition={errors?.enterpriseRole} message={errors?.enterpriseRole?.message} className="mt-2"/>
                        </div>
                    </div>
                    <div className="mt-4 w-full">
                        <div className='w-full flex flex-col gap-1'>
                            <label htmlFor="aboutme" className="md:text-lg">Sobre mí</label>
                            <textarea
                                maxLength={2600}
                                id="aboutme"
                                autoComplete="off"
                                autoCapitalize="true"
                                placeholder='Cuéntanos un poco sobre ti...'
                                className="w-full h-72 md:h-52 p-2 bg-card-light/40 border border-transparent focus-visible:border-stannum rounded resize-none placeholder:text-neutral-400 transition-200"
                                {...register("aboutme",{
                                    required: true,
                                    maxLength: 2600
                                })}
                            />
                        </div>
                        <FormErrorMessage condition={errors?.aboutme} message={errors?.aboutme?.message} className="mt-2"/>
                    </div>
                    <div className="mt-6 lg:mt-4 w-full grow flex justify-end items-end gap-4">
                        <button
                            type="button"
                            onClick={ () => { setShowModal(false); reset() } }
                            className="w-full h-9 text-sm font-semibold bg-card-light hover:bg-card-lighter rounded tracking-tighter flex justify-center items-center transition-200"
                        >
                            Cancelar
                        </button>
                        <SubmitButtonLoading isLoading={isLoading} text="Editar" form="formEditProfile" className="w-full h-9 text-sm font-semibold"/>
                    </div>
                </form>
                </div>
            </Modal>
        </Fragment>
    )
}