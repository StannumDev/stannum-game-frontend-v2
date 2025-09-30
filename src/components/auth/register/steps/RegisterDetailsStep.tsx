'use client'

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { SelectorIcon } from "@/icons";
import { FormErrorMessage, SubmitButtonLoading } from "@/components";
import { RegisterState } from "@/interfaces";

interface Props{
    handleNextStep: (data: Partial<RegisterState>) => void
}

const schema = z.object({
    name: z.string().min(1, { message: "Campo requerido." }).min(2, "Debe contener más de 8 caracteres.").max(50, "Debe contener menos de 50 caracteres.").regex(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/, "El nombre solo puede contener letras, números y espacios."),
    birthdate: z.string().min(1, { message: "Campo requerido." })
        .refine(date => {
            const today = new Date();
            const birthDate = new Date(date);
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 18 && birthDate <= today;
        }, { message: "Debes tener al menos 18 años y la fecha no puede estar en el futuro." }),
    country: z.string().min(1, { message: "Campo requerido." }),
    region: z.string().min(1, { message: "Campo requerido." }),
    enterprise: z.string().min(1, { message: "Campo requerido." }).max(100, "Debe contener menos de 100 caracteres."),
    enterpriseRole: z.string().min(1, { message: "Campo requerido." }).max(50, "Debe contener menos de 50 caracteres."),
    // website: z.string().url("Debe ser una URL válida.").max(100, "Debe contener menos de 100 caracteres.").optional(),
    aboutme: z.string().min(1, { message: "Campo requerido." }).max(2600, "Debe contener menos de 2600 caracteres.")
});

type Schema = z.infer<typeof schema>

export const RegisterDetailsStep = ({handleNextStep}:Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, setValue, formState: { errors }} = useForm<Schema>({ resolver: zodResolver(schema) })
    const [location, setLocation] = useState({ country: "", region: "" });

    const handleCountryChange = (val: string) => {
        setLocation({ ...location, country: val });
        setValue("country", val);
    };

    const handleRegionChange = (val: string) => {
        setLocation({ ...location, region: val });
        setValue("region", val);
    };

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setIsLoading(true);
        try {
            if (!location.country || !location.region) {
                console.error("Country and region must be selected.");
                return;
            }
            await handleNextStep({
                ...data,
                country: location.country,
                region: location.region,
            });
        } catch (error:unknown) {
            console.error("Error durante el envío:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <p className="text-center text-sm md:text-base">Ahora, ¡Cuéntanos un poco sobre ti!</p>
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="name" className="md:text-lg">Nombre completo</label>
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
                        <label htmlFor="name" className="md:text-lg">Fecha de nacimiento</label>
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
                        <label htmlFor="name" className="md:text-lg">País</label>
                        <CountryDropdown
                            value={location.country}
                            onChange={handleCountryChange}
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
                        <label htmlFor="name" className="md:text-lg">Región</label>
                        <RegionDropdown
                            country={location.country}
                            value={location.region}
                            onChange={handleRegionChange}
                            name="region"
                            id="region"
                            disableWhenEmpty={true}
                            defaultOptionLabel="Seleccionar"
                            disabled={isLoading}
                            classes="w-full h-10 px-2 bg-transparent lg:focus:bg-card border-b border-card-lighter focus-visible:border-stannum outline-none focus-visible:outline-none disabled:text-white/75 appearance-none transition-200"
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
                            disabled={isLoading}
                            className="w-full h-10 px-2 border-b border-card-lighter focus-visible:border-stannum disabled:text-white/75 transition-200"
                            {...register("enterprise")}
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
                    <label htmlFor="aboutme" className="md:text-lg">Sobre mí</label>
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
            <div className="mt-8 w-full flex justify-center">
                <SubmitButtonLoading isLoading={isLoading} text="Continuar" className="w-full md:w-32 h-10 text-sm font-semibold"/>
            </div>
        </form>
    )
}
