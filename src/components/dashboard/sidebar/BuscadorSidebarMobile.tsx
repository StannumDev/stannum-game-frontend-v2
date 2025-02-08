'use client'

import { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { CrossIcon, SearchIcon } from "@/icons";
import { useSearchHandler } from "@/hooks";
import { SidebarMobileIndicator } from "@/components";
import styles from "@/components/styles/sidebar.module.css";

interface Props{
    isSearching: boolean;
    setIsSearching: Dispatch<SetStateAction<boolean>>
}

export const BuscadorSidebarMobile = ({isSearching, setIsSearching}:Props) => {

    const { register, handleSubmit, onSubmit, reset, setFocus } = useSearchHandler();

    useEffect(() => {
        isSearching && setFocus("search");
    }, [isSearching, setFocus]);

    return (
    <Fragment>
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
                className={`w-full py-3 flex flex-col justify-center items-center gap-0.5 transition-200 relative ${isSearching ? 'text-stannum' : 'text-card-lightest'}`}
            >
                <SearchIcon className="size-8"/>
                <span className="sr-only">Buscar</span>
                { isSearching && <SidebarMobileIndicator/> }
            </button>
        </motion.li>
        <AnimatePresence>
            {
                isSearching &&
                <Fragment>
                    <motion.div
                        className={`w-full pl-3 pb-3 bg-background flex justify-center items-end fixed top-0 left-0 z-[99999999] pointer-events-auto ${styles.sidebar__search}`}
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.375 }}
                    >
                        <div className="w-full flex justify-center items-center">
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-card rounded-lg flex flex-row-reverse justify-center items-center">
                                <label htmlFor="search" className="sr-only">Buscar en STANNUM Game</label>
                                <input
                                    type='search'
                                    inputMode="search"
                                    enterKeyHint="search"
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
                                    <SearchIcon className="size-5 transition-200"/>
                                </motion.button>
                            </form>
                            <motion.button
                                type="button"
                                onClick={() => {
                                    reset();
                                    setIsSearching(false);
                                }}
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ type: 'spring', bounce: 0 }}
                                className="size-12 flex justify-center items-center"
                            >
                                <span className="sr-only">Limpiar buscador</span>
                                <CrossIcon className="size-6 text-card-lighter"/>
                            </motion.button>
                        </div>
                    </motion.div>
                    <motion.div
                        className="w-full min-h-dvh bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-[9999999]"
                        onClick={() => {
                            reset();
                            setIsSearching(false);
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    ></motion.div>
                </Fragment>
            }
        </AnimatePresence>
    </Fragment>
    )
}
