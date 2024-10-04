'use client'

import { Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { GrPowerShutdown } from 'react-icons/gr';
import type { SidebarLink } from '@/interfaces';
import { BuscadorSidebar, Icon, Logo, SidebarDesktopLink } from '@/components';
import default_user from "@/assets/user/default_user.webp";

interface Props{
    links:Array<SidebarLink>;
    pathname: string
}

export const SidebarDesktop = ({links, pathname}:Props) => {

    const [isExpanded, setIsExpanded] = useState<boolean>(true)

    return (
        <Fragment>
            <motion.div
                animate={{ maxWidth: isExpanded ? 320 : 80 }}
                className='hidden md:block w-full max-w-xs min-h-svh'
            ></motion.div>
            <motion.div
                animate={{ maxWidth: isExpanded ? 320 : 80 }}
                className="hidden md:block w-full max-w-xs min-h-svh fixed top-0 left-0"
            >
                <motion.nav
                    initial={{ x: '-100%', opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.375 }}
                    className="w-full min-h-svh bg-background-sidebar overflow-hidden pt-12 flex flex-col justify-start items-center relative"
                >
                    <button
                        type="button"
                        className='bg-red-500 absolute top-4 left-4'
                        onClick={()=> setIsExpanded(!isExpanded) }
                    >
                        { isExpanded ? 'Cerrar' : 'Abrir'}
                    </button>
                    <Link href={'/'} aria-label="Inicio STANNUM Game" className={`h-6 ${isExpanded ? 'w-40' : 'w-12'} relative block hover:scale-105 translate-all duration-200 ease-in-out`}>
                        <AnimatePresence mode='popLayout' initial={false}>
                            {
                                isExpanded ?
                                <motion.span
                                    initial={{ x: -150, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -150, opacity: 0 }}
                                    transition={{ x:{ duration: 0.25 }, opacity:{ duration: 0.125 } }}
                                    key='logoNavbar'
                                    className='block'
                                >
                                    <Logo className="fill-white h-6" pathClassName="fill-white"/>
                                </motion.span>
                                :
                                <motion.span
                                    initial={{ x: 150, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 150, opacity: 0 }}
                                    transition={{ x:{ duration: 0.25 }, opacity:{ duration: 0.125 } }}
                                    key='iconNavbar'
                                    className='h-6 w-12 flex justify-center items-center absolute top-0 left-0 right-0 mx-auto'
                                >
                                    <Icon className="fill-white h-6" pathClassName="fill-white"/>
                                </motion.span>
                            }
                        </AnimatePresence>
                    </Link>
                    <ul className="mt-24 w-full grow">
                        {
                            links.map((link:SidebarLink, i:number) => (
                                <motion.li
                                    key={i}
                                    className="w-full"
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ type: 'spring', delay: 0.125 + i*0.125 }}
                                >
                                    <SidebarDesktopLink link={link} pathname={pathname} isExpanded={isExpanded}/>
                                </motion.li>
                            ))
                        }
                    </ul>
                    <BuscadorSidebar/>
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.75 }}
                        className="w-full py-8 px-4 flex justify-start items-center gap-4"
                    >
                        <Link href={'/'} className="rounded-full border-2 border-stannum relative overflow-hidden shrink-0">
                            <Image src={default_user} alt='Usuario STANNUM Game' className="min-w-14 max-w-14 aspect-square object-cover"/>
                        </Link>
                        <Link href={'/'} className="grow lowercase truncate">mateolohezicmateolohezicmateolohezicmateolohezicmateolohezicmateolohezic</Link>
                        <button type="button" className="bg-card h-8 aspect-square rounded-full flex justify-center items-center text-neutral-400 hover:text-white shrink-0">
                            <span className="sr-only">Cerrar sesión</span>
                            <GrPowerShutdown className="text-xl relative -top-px transition-all duration-200 ease-in-out"/>
                        </button>
                    </motion.div>
                </motion.nav>
            </motion.div>
        </Fragment>
    )
}
