'use client'

import { Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { GrPowerShutdown } from 'react-icons/gr';
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import type { SidebarLink } from '@/interfaces';
import { BuscadorSidebar, Icon, Logo, SidebarDesktopLink } from '@/components';
// import default_user from "@/assets/user/default_user.webp";
import mateo from "@/assets/user/usuario_mateo.webp";

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
                className='hidden lg:block lg:w-64 2xl:w-80 min-h-svh shrink-0'
            ></motion.div>
            <motion.div
                animate={{ maxWidth: isExpanded ? 320 : 80 }}
                className="hidden lg:block lg:w-64 2xl:w-80 min-h-svh fixed top-0 left-0"
            >
                <motion.nav
                    initial={{ x: '-100%', opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.375 }}
                    className="w-full min-h-svh bg-background-sidebar overflow-hidden pt-16 flex flex-col justify-start items-center relative"
                >
                    <motion.button
                        type="button"
                        animate={{ width: isExpanded ? 20 : 48 }}
                        transition={{duration: 0}}
                        className={`h-7 flex justify-center items-center text-neutral-600 hover:text-neutral-500 absolute top-4 left-4 transition-200`}
                        onClick={()=> setIsExpanded(!isExpanded) }
                    >
                        {
                            isExpanded ?
                            <LuPanelLeftClose className='size-5'/>
                            :
                            <LuPanelLeftOpen className='size-5'/>
                        }
                        <span className='sr-only'>{ isExpanded ? 'Cerrar' : 'Abrir'}</span>
                    </motion.button>
                    <Link href={'/dashboard'} aria-label="Inicio STANNUM Game" className={`h-6 ${isExpanded ? 'w-40' : 'w-12'} relative block hover:scale-105 translate-all duration-200 ease-in-out`}>
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
                                    key={`sidebar_link_${i}`}
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
                    <BuscadorSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.75 }}
                        className="w-full py-8 px-4 flex justify-start items-center gap-4"
                    >
                        <Link href={'/dashboard'} className={`${ isExpanded ? 'size-14' : 'size-11' } aspect-square rounded-full outline outline-2 outline-stannum relative overflow-hidden shrink-0 transition-200`}>
                            <div className='size-full bg-gradient-to-br from-card to-card-light absolute top-0 left-0 animate-pulse z-0'></div>
                            <Image priority src={mateo} alt='Usuario STANNUM Game' className='size-full object-cover absolute top-0 left-0 z-10'/>
                        </Link>
                        <AnimatePresence>
                            {
                                isExpanded &&
                                    <motion.div
                                        key={'sidebar_username_desktop'}
                                        initial={{ y: 150, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 150, opacity: 0 }}
                                        className='grow truncate'
                                    >
                                        <Link href={'/dashboard'} className="w-full lowercase truncate">mateolohezicmateolohezic</Link>
                                    </motion.div>
                            }
                            {
                                isExpanded &&
                                <motion.button
                                    key={'sidebar_logout_desktop'}
                                    initial={{ y: 150, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 150, opacity: 0 }}
                                    type="button"
                                    className="bg-card h-8 aspect-square rounded-full flex justify-center items-center text-neutral-400 hover:text-white shrink-0"
                                >
                                    <span className="sr-only">Cerrar sesión</span>
                                    <GrPowerShutdown className="text-xl transition-200"/>
                                </motion.button>
                            }
                        </AnimatePresence>
                    </motion.div>
                </motion.nav>
            </motion.div>
        </Fragment>
    )
}
