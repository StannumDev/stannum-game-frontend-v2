'use client'

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from 'framer-motion';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { Dispatch, Fragment, SetStateAction } from "react";

interface Props{
    isExpanded: boolean;
    setIsExpanded: Dispatch<SetStateAction<boolean>>
}

const schema = z.object({
    search: z.string().nonempty().min(1).max(50),
})

type Schema = z.infer<typeof schema>

export const BuscadorSidebar = ({isExpanded, setIsExpanded}:Props) => {

    const { register, handleSubmit, watch, reset, setFocus } = useForm<Schema>({ resolver: zodResolver(schema) })
    const router = useRouter();

    const openSearchSidebar = () => {
        setIsExpanded(true);
        setFocus("search")
    }

    const onSubmit:SubmitHandler<Schema> = async ({search}:Schema) => {
        try {
            console.log(search);
            // callToast(response);
            router.push('/login');
        } catch (error:unknown) {
            console.log(error);
        }
    }

    return (
        <motion.div
            onClick={ () => { !isExpanded && openSearchSidebar() }}
            className={`w-full ${ isExpanded ? 'px-4' : 'hover:bg-card-hover group cursor-pointer'}`}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="w-full relative flex flex-row-reverse justify-center items-center">
                {
                    isExpanded &&
                    <Fragment>
                        <label htmlFor="search" className="sr-only">Buscar en STANNUM Game</label>
                        <input
                            type='search'
                            maxLength={50}
                            id="search"
                            autoComplete="off"
                            placeholder="Buscar..."
                            className="grow w-full h-9 pr-8 peer placeholder:text-card-lighter focus-visible:placeholder:text-card-lightest"
                            {...register("search",{
                                required: true,
                                maxLength: 50
                            })}
                        />
                    </Fragment>
                }
                <motion.button
                    type='submit'
                    whileTap={{ scale: isExpanded ? 1.25 : 1, color: 'white' }}
                    className={`${isExpanded ? 'size-9 text-card-lighter peer-focus-visible:text-card-lightest' : 'size-12 text-neutral-400 group-hover:text-neutral-200'} flex justify-center items-center`}
                >
                    <CiSearch className={`${ isExpanded ? 'size-5' : 'size-7' } transition-all duration-200 ease-in-out`}/>
                </motion.button>
                <div className="h-9 w-4 absolute right-0 bottom-0 opacity-0 peer-focus-visible:opacity-100 transition-all duration-200 ease-in-out">
                    <AnimatePresence>
                        {
                            watch("search") !== "" &&
                            <motion.button
                                type="button"
                                onClick={() => reset()}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                whileTap={{ scale: 1.25, color: 'white' }}
                                className="size-full flex justify-center items-center"
                            >
                                <span className="sr-only">Limpiar buscador</span>
                                <IoClose className="relative top-[2px] text-card-lighter transition-all duration-200 ease-in-out"/>
                            </motion.button>
                        }
                    </AnimatePresence>
                </div>
                <div className={`w-full h-9 border-b ${ isExpanded ? 'border-card peer-focus-visible:border-card-light' : 'border-transparent' } absolute top-0 left-0 pointer-events-none transition-all duration-200 ease-in-out`}></div>
            </form>
        </motion.div>
    )
}
