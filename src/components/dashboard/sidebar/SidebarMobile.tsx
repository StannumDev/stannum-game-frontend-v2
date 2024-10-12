'use client'

import { Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { SidebarLink } from '@/interfaces';
import { BuscadorSidebarMobile, Icon, SidebarMobileLink } from '@/components';
// import default_user from "@/assets/user/default_user.webp";
import mateo from "@/assets/user/usuario_mateo.webp";

interface Props{
    links:Array<SidebarLink>;
    pathname: string
}

export const SidebarMobile = ({links, pathname}:Props) => {
    const [isSearching, setIsSearching] = useState<boolean>(false)

    return (
        <div className="lg:hidden w-full min-h-dvh fixed top-0 left-0 pointer-events-none z-[9999999]">
            <div className="w-full px-4 py-2 h-12 bg-background flex justify-between items-center pointer-events-auto absolute top-0 left-0">
                <Link href={'/'} aria-label="Inicio STANNUM Game">
                    <Icon className="fill-white w-8" pathClassName="fill-white"/>
                </Link>
                <Link href={'/'} className="rounded-full relative overflow-hidden">
                    <Image src={mateo} alt='Usuario STANNUM Game' className="size-8 aspect-square object-cover"/>
                </Link>
            </div>
            <motion.div
                className="w-full bg-background pb-2 pointer-events-auto absolute bottom-0 left-0"
                initial={{ y: '100%', opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0 }}
            >
                <ul className="w-full grid grid-cols-5 justify-center items-center overflow-hidden">
                    {
                        links.map((link:SidebarLink, i:number) => (
                            <Fragment key={i}>
                                {i === 1 && (
                                    <BuscadorSidebarMobile isSearching={isSearching} setIsSearching={setIsSearching}/>
                                )}
                                <motion.li
                                    key={i}
                                    className="w-full"
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ type: 'spring', delay: i === 0 ? 0.125 : 0.125 + (i*0.125 + 0.125), bounce: 0}}
                                >
                                    <SidebarMobileLink link={link} pathname={pathname} isSearching={isSearching}/>
                                </motion.li>
                            </Fragment>
                        ))
                    }
                </ul>
            </motion.div>
        </div>
    )
}
