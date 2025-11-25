'use client'

import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import type { SidebarLink, UserSidebarDetails } from '@/interfaces';
import { BuscadorSidebarMobile, STANNUMIcon, SidebarMobileLink } from '@/components';
import styles from '@/components/styles/sidebar.module.css';
import default_user from "@/assets/user/default_user.webp";

interface Props{
    user: UserSidebarDetails;
    links: Array<SidebarLink>;
    pathname: string;
    isLoading: boolean;
}

export const SidebarMobile = ({user, links, pathname, isLoading}:Props) => {
    
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [profilePhotoError, setProfilePhotoError] = useState(false);

    const [isShow, setIsShow] = useState(true);
    const { scrollY } = useScroll();
    const [lastScroll, setLastScroll] = useState(0);

    useMotionValueEvent(scrollY, "change", (scrollYPosition) => {
        const distanceFromBottom = document.documentElement.scrollHeight - (scrollYPosition + window.innerHeight)
        setIsShow(
            distanceFromBottom <= 80 ||
            scrollYPosition <= 10 ||
            scrollYPosition <= lastScroll
        );
        setLastScroll(scrollYPosition);
    });

    useEffect(() => {
      setIsSearching(false);
    }, [pathname])
    

    return (
        <>
            <div className="lg:hidden lg:content-visibility-hidden w-full min-h-dvh fixed top-0 left-0 pointer-events-none z-[9999999]">
                <AnimatePresence>
                    { isShow &&
                        <motion.div
                            initial={{ y: '-100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ type: 'spring', bounce: 0 }}
                            className={`w-full bg-background flex justify-between items-center pointer-events-auto absolute top-0 left-0 right-0 mx-auto ${styles.sidebar}`}
                        >
                            <Link href={'/dashboard'} aria-label="Inicio STANNUM Game">
                                <STANNUMIcon className="fill-white h-8"/>
                            </Link>
                            <Link href={`/dashboard/profile/${user?.username}`} className="size-8 aspect-square rounded-full relative overflow-hidden">
                                { isLoading ?
                                    <div className="size-full bg-gradient-to-br from-card to-card-light absolute top-0 left-0 animate-pulse z-10"></div>
                                :
                                    <Image
                                        priority
                                        width={32}
                                        height={32}
                                        src={ profilePhotoError || !user.profilePhoto ? default_user : user.profilePhoto}
                                        alt='Foto de perfil Usuario STANNUM Game'
                                        className="size-full object-cover absolute top-0 left-0 z-10"
                                        onError={() => setProfilePhotoError(true)}
                                    />
                                }
                            </Link>
                        </motion.div>
                    }
                </AnimatePresence>
                <motion.nav
                    className={`w-full bg-background pointer-events-auto absolute bottom-0 left-0 ${styles.sidebar__links}`}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', bounce: 0 }}
                >
                    <ul id='sidebar-buttons' className="w-full grid grid-cols-6 justify-center items-center overflow-hidden">
                        {
                            links.map((link:SidebarLink, i:number) => 
                                <Fragment key={`sidebar_mobile_link_${i}`}>
                                    {i === 1 && (
                                        <BuscadorSidebarMobile pathname={pathname} isSearching={isSearching} setIsSearching={setIsSearching}/>
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
                            )
                        }
                    </ul>
                </motion.nav>
            </div>
        </>
    )
}
