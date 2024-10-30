'use client'

import { Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { SidebarLink } from '@/interfaces';
import { BuscadorSidebarMobile, Icon, SidebarMobileLink } from '@/components';
import styles from '@/components/styles/sidebar.module.css';
import mateo from "@/assets/user/usuario_mateo.webp";

interface Props{
    links:Array<SidebarLink>;
    pathname: string
}

export const SidebarMobile = ({links, pathname}:Props) => {
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    return (
        <div className="lg:hidden w-full min-h-[calc(100dvh+env(safe-area-inset-top))] fixed top-0 left-0 pointer-events-none z-[9999999]">
            <div className={`w-full min-h-12 bg-background flex justify-between items-center pointer-events-auto absolute top-0 left-0 ${styles.sidebar__mobile}`}>
                <Link href={'/'} aria-label="Inicio STANNUM Game">
                    <Icon className="fill-white w-8" pathClassName="fill-white"/>
                </Link>
                <Link href={'/'} className="size-8 aspect-square rounded-full relative overflow-hidden">
                    { !imageLoaded && <div className='size-full bg-gradient-to-br from-card to-card-light absolute top-0 left-0 animate-pulse z-0'></div> }
                    <Image
                        priority
                        src={mateo}
                        alt='Usuario STANNUM Game'
                        className="size-full object-cover absolute top-0 left-0 z-10"
                        onLoad={() => setImageLoaded(true)}
                    />
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
                            <Fragment key={`sidebar_mobile_link_${i}`}>
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
