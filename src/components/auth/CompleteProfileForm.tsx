'use client'

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { SelectorIcon } from "@/icons";
import { getUserByTokenClient, updateUserProfile } from "@/services";
import { achievementHandler, errorHandler } from "@/helpers";
import { FormErrorMessage, SubmitButtonLoading, STANNUMLogo, LoadingScreen } from "@/components";
import { AppError } from "@/interfaces";

const schema = z.object({
    name: z.string().min(1, { message: "Campo requerido." }).min(2, "Debe contener más de 2 caracteres.").max(50, "Debe contener menos de 50 caracteres.").regex(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/, "El nombre solo puede contener letras, números y espacios."),
    birthdate: z.string().min(1, { message: "Campo requerido." })
        .refine(date => {
            const today = new Date();
            const birthDate = new Date(date);
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 18 && birthDate <= today;
    }, { message: "Debes tener al menos 18 años." }),
    country: z.string().min(1, { message: "Campo requerido." }),
    region: z.string().min(1, { message: "Campo requerido." }),
    enterprise: z.string().min(1, { message: "Campo requerido." }).max(100, "Debe contener menos de 100 caracteres."),
    enterpriseRole: z.string().min(1, { message: "Campo requerido." }).max(50, "Debe contener menos de 50 caracteres."),
    aboutme: z.string().min(1, { message: "Campo requerido." }).max(2600, "Debe contener menos de 2600 caracteres."),
});

type Schema = z.infer<typeof schema>

export const CompleteProfileForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [country, setCountry] = useState<string>('');
    const [region, setRegion] = useState<string>('');

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Schema>({ resolver: zodResolver(schema) });

    useEffect(() => {
        const fetchUserData = async () => {
            setIsFetching(true);
            try {
                const user = await getUserByTokenClient();
                if (user.profile?.name) setValue('name', user.profile.name);
                if (user.profile?.birthdate) {
                    const dateOnly = new Date(user.profile.birthdate).toISOString().split("T")[0];
                    setValue('birthdate', dateOnly);
                }
                if (user.profile?.country) {
                    setValue('country', user.profile.country);
                    setCountry(user.profile.country);
                }
                if (user.profile?.region) {
                    setValue('region', user.profile.region);
                    setRegion(user.profile.region);
                }
                if (user.enterprise?.name) setValue('enterprise', user.enterprise.name);
                if (user.enterprise?.jobPosition) setValue('enterpriseRole', user.enterprise.jobPosition);
                if (user.profile?.aboutMe) setValue('aboutme', user.profile.aboutMe);
            } catch (error: unknown) {
                const appError: AppError = errorHandler(error);
                console.error("Error fetching user data:", appError);
            } finally {
                setIsFetching(false);
            }
        };
        fetchUserData();
    }, [setValue]);

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setIsLoading(true);
        try {
            const { success, achievementsUnlocked } = await updateUserProfile(data);
            if (success) {
                achievementsUnlocked?.length && achievementHandler(achievementsUnlocked);
                window.location.replace('/dashboard');
            }
        } catch (error: unknown) {
            const appError: AppError = errorHandler(error);
            console.error("Error completando perfil:", appError);
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) return <LoadingScreen fullScreen/>

    return (
        <section className="w-full min-h-svh px-4 md:px-0 py-12 lg:py-24 flex justify-center items-center">
            <div className="w-full max-w-2xl bg-card rounded-lg p-6 md:p-12 flex flex-col justify-center items-center relative">
                <div className="w-full flex flex-col justify-center items-center">
                    <STANNUMLogo className="w-40 hidden md:block" gameColor='fill-stannum' stannumColor='fill-white'/>
                    <h2 className="md:mt-12 text-3xl md:text-5xl font-black uppercase text-center"><b className="text-stannum font-black">Completá</b> tu perfil</h2>
                    <p className="mt-4 text-center text-neutral-400 max-w-md">Necesitamos algunos datos más para que puedas acceder a la plataforma.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 w-full">
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
                                <label htmlFor="birthdate" className="md:text-lg required">Fecha de nacimiento</label>
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
                                <label htmlFor="country" className="md:text-lg required">País</label>
                                <CountryDropdown
                                    value={country}
                                    onChange={(val) => { setCountry(val); setValue("country", val); }}
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
                                <label htmlFor="region" className="md:text-lg required">Región</label>
                                <RegionDropdown
                                    country={country}
                                    value={region}
                                    onChange={(val) => { setRegion(val); setValue("region", val); }}
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
                                <label htmlFor="enterprise" className="md:text-lg required">Empresa</label>
                                <input
                                    type='text'
                                    enterKeyHint="next"
                                    maxLength={100}
                                    id="enterprise"
                                    autoComplete="organization"
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
                                autoCapitalize="sentences"
                                placeholder='Cuéntanos un poco sobre ti...'
                                disabled={isLoading}
                                className="w-full h-32 p-2 bg-card-light/40 border border-transparent focus-visible:border-stannum rounded resize-none placeholder:text-neutral-400 disabled:text-white/75 transition-200"
                                {...register("aboutme")}
                            />
                        </div>
                        <FormErrorMessage condition={errors?.aboutme} message={errors?.aboutme?.message} className="mt-2"/>
                    </div>
                    <div className="mt-8 w-full flex justify-center">
                        <SubmitButtonLoading isLoading={isLoading} text="Completar perfil" className="w-full md:w-48 h-12 text-sm font-semibold"/>
                    </div>
                </form>
            </div>
        </section>
    );
};