'use client'

import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { getUserSidebarDetails } from '@/services';
import { errorHandler } from '@/helpers';
import type { SidebarLink, UserSidebarDetails } from '@/interfaces';
import { BuscadorSidebarMobile, STANNUMIcon, SidebarMobileLink } from '@/components';
import styles from '@/components/styles/sidebar.module.css';
import mateo from "@/assets/user/usuario_mateo.webp";


interface Props{
    links: Array<SidebarLink>;
    pathname: string
}

export const SidebarMobile = ({links, pathname}:Props) => {
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserSidebarDetails | null>(null);
    // const [isLoading, setIsLoading] = useState<boolean>(true);

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
        const fetchUserDetails = async () => {
            // setIsLoading(true);
            try {
                const details = await getUserSidebarDetails();
                setUserData(details);
            } catch (error) {
                const appError = errorHandler(error);
                console.error(`[${appError.code}] ${appError.techMessage}`);
            } finally {
                // setIsLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

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
                                <STANNUMIcon className="fill-white w-8"/>
                            </Link>
                            <Link href={'/dashboard/profile/mateolohezic'} className="size-8 aspect-square rounded-full relative overflow-hidden">
                                <Image
                                    priority
                                    src={userData?.profilePhoto || mateo}
                                    alt='Foto de perfil Usuario STANNUM Game'
                                    className="size-full object-cover absolute top-0 left-0 z-10"
                                    onError={(e) => (e.currentTarget.src = mateo.src)}
                                />
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
                </motion.nav>
            </div>
        </>
    )
}
