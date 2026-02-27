'use client'

import { Fragment, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { m, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import type { SidebarLink, UserSidebarDetails } from '@/interfaces';
import { BuscadorSidebarMobile, STANNUMIcon, SidebarMobileLink } from '@/components';
import { useUserStore } from '@/stores/userStore';
import { PowerIcon } from '@/icons';
import { formatCoins } from '@/utilities';
import { getRankByLevel } from '@/config/ranks';
import styles from '@/components/styles/sidebar.module.css';
import default_user from "@/assets/user/default_user.webp";
import stannum_coin from "@/assets/tins_coin.svg";

interface Props{
    user: UserSidebarDetails | null;
    links: Array<SidebarLink>;
    pathname: string;
    isLoading: boolean;
}

export const SidebarMobile = ({user, links, pathname, isLoading}:Props) => {

    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [profilePhotoError, setProfilePhotoError] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const storeLogout = useUserStore(s => s.logout);

    const [isShow, setIsShow] = useState(true);
    const { scrollY } = useScroll();
    const [lastScroll, setLastScroll] = useState(0);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useMotionValueEvent(scrollY, "change", (scrollYPosition) => {
        const distanceFromBottom = document.documentElement.scrollHeight - (scrollYPosition + window.innerHeight)
        setIsShow(
            distanceFromBottom <= 80 ||
            scrollYPosition <= 10 ||
            scrollYPosition <= lastScroll
        );
        setLastScroll(scrollYPosition);
    });

    return (
        <>
            <div className="lg:hidden lg:content-visibility-hidden w-full min-h-dvh fixed top-0 left-0 pointer-events-none z-[9999999]">
                <AnimatePresence>
                    { isShow &&
                        <m.div
                            initial={{ y: '-100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ type: 'spring', bounce: 0 }}
                            className={`w-full bg-background flex justify-between items-center pointer-events-auto absolute top-0 left-0 right-0 mx-auto ${styles.sidebar}`}
                        >
                            <Link href={'/dashboard'} aria-label="Inicio STANNUM Game">
                                <STANNUMIcon className="fill-white h-8"/>
                            </Link>
                            <div className="flex items-center gap-2">
                                {!isLoading && user && (
                                    <div id="tins-display" className="flex items-center gap-1">
                                        <Image src={stannum_coin} alt="Tins" width={14} height={14} className="shrink-0" />
                                        <span className="text-xs text-amber-400 font-bold">{formatCoins(user.coins ?? 0)}</span>
                                    </div>
                                )}
                                <div className="relative" ref={menuRef}>
                                    <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} className="size-8 aspect-square rounded-full relative overflow-hidden block">
                                        { isLoading ?
                                            <div className="size-full bg-gradient-to-br from-card to-card-light absolute top-0 left-0 animate-pulse z-10"></div>
                                        :
                                            <Image
                                                priority
                                                width={32}
                                                height={32}
                                                src={ profilePhotoError || !user?.profilePhoto ? default_user : user.profilePhoto}
                                                alt='Foto de perfil Usuario STANNUM Game'
                                                className="size-full object-cover absolute top-0 left-0 z-10"
                                                onError={() => setProfilePhotoError(true)}
                                            />
                                        }
                                    </button>
                                    {!isLoading && user && (() => {
                                        const rank = getRankByLevel(user.currentLevel);
                                        return (
                                            <span className="absolute -bottom-1 -right-1 z-20 min-w-4 h-4 px-0.5 rounded-full bg-card text-[8px] font-black flex justify-center items-center border-2 border-background">
                                                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${rank.color}, ${rank.colorSecondary})` }}>
                                                    {user.currentLevel}
                                                </span>
                                            </span>
                                        );
                                    })()}
                                    <AnimatePresence>
                                        {isMenuOpen && (
                                            <m.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute top-full right-0 mt-2 w-48 bg-card border border-card-light rounded-lg overflow-hidden shadow-xl z-50"
                                            >
                                                <Link
                                                    href={`/dashboard/profile/${user?.username ?? ''}`}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-card-light hover:text-white transition-200"
                                                >
                                                    Mi perfil
                                                </Link>
                                                <Link
                                                    href="/dashboard/purchases"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-card-light hover:text-white transition-200"
                                                >
                                                    Mis compras
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => { setIsMenuOpen(false); storeLogout(); }}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-card-light transition-200"
                                                >
                                                    <PowerIcon className="text-base"/>
                                                    Cerrar sesión
                                                </button>
                                            </m.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </m.div>
                    }
                </AnimatePresence>
                <m.nav
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
                                    <m.li
                                        key={i}
                                        className="w-full"
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ type: 'spring', delay: i === 0 ? 0.125 : 0.125 + (i*0.125 + 0.125), bounce: 0}}
                                    >
                                        <SidebarMobileLink link={link} pathname={pathname} isSearching={isSearching}/>
                                    </m.li>
                                </Fragment>
                            )
                        }
                    </ul>
                </m.nav>
            </div>
        </>
    )
}
