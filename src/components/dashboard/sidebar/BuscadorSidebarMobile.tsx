'use client'

import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from 'framer-motion';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

interface Props{
    isSearching: boolean;
    setIsSearching: Dispatch<SetStateAction<boolean>>
}

const schema = z.object({
    search: z.string().nonempty().min(1).max(50),
})

type Schema = z.infer<typeof schema>

export const BuscadorSidebarMobile = ({isSearching, setIsSearching}:Props) => {

    const { register, handleSubmit, reset, setFocus } = useForm<Schema>({ resolver: zodResolver(schema) })
    const router = useRouter();

    const onSubmit:SubmitHandler<Schema> = async ({search}:Schema) => {
        try {
            console.log(search);
            // callToast(response);
            router.push('/login');
        } catch (error:unknown) {
            console.log(error);
        }
    }

    useEffect(() => {
        isSearching && setFocus("search")
    }, [isSearching, setFocus])
    

    return (
    <>
        <motion.li
            key={'search'}
            className="w-full"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.25, bounce: 0 }}
        >
            <button
                type="button"
                onClick={() => { setIsSearching(!isSearching) }}
                aria-label={`Buscar en STANNUM Game`}
                className={`w-full py-3 flex flex-col justify-center items-center gap-0.5 transition-all duration-200 ease-in-out
                    ${isSearching ? 'text-stannum' : 'text-card-lightest'}
                `}
            >
                <CiSearch className="size-8"/>
                <span className="sr-only">Buscar</span>
            </button>
        </motion.li>
        <AnimatePresence>
            {
                isSearching &&
                <>
                <motion.div
                    className="w-full pl-3 h-16 bg-card flex justify-center items-center fixed top-0 left-0 z-10 pointer-events-auto"
                    initial={{ y: '-100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.375 }}
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-card-light rounded-lg flex flex-row-reverse justify-center items-center">
                        <label htmlFor="search" className="sr-only">Buscar en STANNUM Game</label>
                        <input
                            type='search'
                            maxLength={50}
                            id="search"
                            autoComplete="off"
                            placeholder="Buscar..."
                            className="grow h-10 peer placeholder:text-card-lighter focus-visible:placeholder:text-card-lightest"
                            {...register("search",{
                                required: true,
                                maxLength: 50
                            })}
                        />
                        <motion.button
                            type="submit"
                            whileTap={{ scale: 1.25, color: 'white' }}
                            className="px-2 h-10 text-card-lighter peer-focus-visible:text-card-lightest flex justify-center items-center"
                        >
                            <CiSearch className="text-xl transition-all duration-200 ease-in-out"/>
                        </motion.button>
                    </form>
                    <motion.button
                        type="button"
                        onClick={() => { reset(); setIsSearching(false) }}
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: 'spring', bounce: 0 }}
                        className="size-12 flex justify-center items-center"
                    >
                        <span className="sr-only">Limpiar buscador</span>
                        <IoClose className="text-3xl text-card-lighter"/>
                    </motion.button>
                </motion.div>
                <motion.div
                    className="w-full min-h-svh bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-0"
                    onClick={ () => { reset(); setIsSearching(false) }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                ></motion.div>
                </>
            }
        </AnimatePresence>
    </>
    )
}
