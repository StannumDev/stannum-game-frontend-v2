'use client'

import { Fragment, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, m } from 'framer-motion';
import type { SidebarLink, UserSidebarDetails } from '@/interfaces';
import { useUserStore } from '@/stores/userStore';
import { useSidebarStore } from '@/stores/sidebarStore';
import { PanelCloseIcon, PanelOpenIcon, PowerIcon } from '@/icons';
import { BuscadorSidebar, STANNUMIcon, STANNUMLogo, SidebarDesktopLink, Tooltip } from '@/components';
import default_user from "@/assets/user/default_user.webp";
import { formatCoins } from '@/utilities';
import { getRankByLevel } from '@/config/ranks';
import stannum_coin from "@/assets/tins_coin.svg";

interface Props{
    user: UserSidebarDetails | null;
    links: Array<SidebarLink>;
    pathname: string;
    isLoading: boolean;
}

const LINK_HEIGHT = 56;

export const SidebarDesktop = ({user, links, pathname, isLoading}:Props) => {

    const isExpanded = useSidebarStore(s => s.isExpanded);
    const toggleExpanded = useSidebarStore(s => s.toggleExpanded);
    const [profilePhotoError, setProfilePhotoError] = useState(false);
    const storeLogout = useUserStore(s => s.logout);

    const onLogout = () => {
        storeLogout();
    }

    const activeIndex = useMemo(() => {
        return links.findIndex(link => {
            if (link.href === '/dashboard') return pathname === link.href;
            return pathname.startsWith(link.href);
        });
    }, [links, pathname]);

    const profileHref = user?.username ? `/dashboard/profile/${user.username}` : '/dashboard';

    return (
        <Fragment>
            <m.div
                initial={{ maxWidth: 0 }}
                animate={{ maxWidth: isExpanded ? 320 : 80 }}
                className='hidden lg:block content-visibility-hidden lg:content-visibility-visible lg:w-64 2xl:w-80 min-h-svh shrink-0'
            >
                <m.div
                    initial={{ maxWidth: 0 }}
                    animate={{ maxWidth: isExpanded ? 320 : 80 }}
                    className="hidden lg:block w-full min-h-svh sticky top-0 left-0"
                >
                    <m.nav
                        initial={{ x: '-100%', opacity: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: 'spring', duration: 0.375 }}
                        className="w-full min-h-svh bg-transparent border-r border-card overflow-hidden pt-16 flex flex-col items-center relative"
                    >
                        <m.button
                            type="button"
                            animate={{ width: isExpanded ? 20 : 48 }}
                            transition={{duration: 0}}
                            className={`h-7 flex justify-center items-center text-neutral-600 hover:text-neutral-500 absolute top-4 left-4 transition-200`}
                            onClick={toggleExpanded}
                        >
                            {
                                isExpanded ?
                                <PanelCloseIcon className='size-5'/>
                                :
                                <PanelOpenIcon className='size-5'/>
                            }
                            <span className='sr-only'>{ isExpanded ? 'Cerrar' : 'Abrir'}</span>
                        </m.button>
                        <Link href={'/dashboard'} aria-label="Inicio STANNUM Game" className={`${isExpanded ? 'w-44 ' : 'w-12'} h-10 relative block hover:scale-105 translate-all duration-200 ease-in-out`}>
                            <AnimatePresence mode='popLayout' initial={false}>
                                {
                                    isExpanded ?
                                    <m.span
                                        initial={{ x: -150, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -150, opacity: 0 }}
                                        transition={{ x:{ duration: 0.25 }, opacity:{ duration: 0.125 } }}
                                        key='logoNavbar'
                                        className='block'
                                    >
                                        <STANNUMLogo className="w-44" gameColor='fill-stannum' stannumColor='fill-white'/>
                                    </m.span>
                                    :
                                    <m.span
                                        initial={{ x: 150, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 150, opacity: 0 }}
                                        transition={{ x:{ duration: 0.25 }, opacity:{ duration: 0.125 } }}
                                        key='iconNavbar'
                                        className='h-10 w-12 flex justify-center items-start absolute top-0 left-0 right-0 mx-auto'
                                    >
                                        <STANNUMIcon className="fill-white"/>
                                    </m.span>
                                }
                            </AnimatePresence>
                        </Link>
                        <ul id='sidebar-buttons' className="mt-24 w-full grow relative">
                            {activeIndex >= 0 && (
                                <m.div
                                    animate={{ y: activeIndex * LINK_HEIGHT }}
                                    transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                                    className="w-full absolute top-0 left-0 z-0 pointer-events-none"
                                    style={{ height: LINK_HEIGHT }}
                                >
                                    <div className="size-full bg-gradient-to-br from-stannum to-stannum-light" />
                                </m.div>
                            )}
                            {
                                links.map((link:SidebarLink, i:number) => (
                                    <m.li
                                        key={`sidebar_link_${i}`}
                                        className="w-full"
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ type: 'spring', delay: 0.125 + i*0.125 }}
                                    >
                                        <SidebarDesktopLink link={link} pathname={pathname} isActive={activeIndex === i}/>
                                    </m.li>
                                ))
                            }
                        </ul>
                        <BuscadorSidebar />
                        <m.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.75 }}
                            className="w-full py-8 px-4 flex items-center gap-4"
                        >
                            <div className="relative shrink-0">
                                <Link href={profileHref} className={`${ isExpanded ? 'size-14' : 'size-11' } aspect-square rounded-full outline outline-2 outline-stannum relative overflow-hidden block transition-200`}>
                                    { isLoading ?
                                        <div className="size-full bg-gradient-to-br from-card to-card-light absolute top-0 left-0 animate-pulse z-0"></div>
                                    :
                                        <Image
                                            priority
                                            width={56}
                                            height={56}
                                            src={ profilePhotoError || !user?.profilePhoto ? default_user : user.profilePhoto}
                                            alt="Usuario STANNUM Game"
                                            className="size-full object-cover absolute top-0 left-0 z-10"
                                            onError={() => setProfilePhotoError(true)}
                                        />
                                    }
                                </Link>
                                {!isLoading && user && (() => {
                                    const rank = getRankByLevel(user.currentLevel);
                                    return (
                                        <span className="absolute -bottom-1 -right-1 z-20 size-5 aspect-square rounded-full bg-card text-[10px] font-black flex justify-center items-center border-2 border-background">
                                            <span
                                                className="bg-clip-text text-transparent"
                                                style={{ backgroundImage: `linear-gradient(135deg, ${rank.color}, ${rank.colorSecondary})` }}
                                            >
                                                {user.currentLevel}
                                            </span>
                                        </span>
                                    );
                                })()}
                            </div>
                            <AnimatePresence>
                                {
                                    isExpanded &&
                                        <m.div
                                            key={'sidebar_username_desktop'}
                                            initial={{ y: 150, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: 150, opacity: 0 }}
                                            className='grow truncate'
                                        >
                                            { isLoading ?
                                                <div className="w-24 h-4 bg-card-light rounded animate-pulse" />
                                            :
                                                <div className="w-full flex flex-col gap-1">
                                                    <Link href={profileHref} className="w-full lowercase truncate">
                                                        { user?.username || 'Mi perfil' }
                                                    </Link>
                                                    <Tooltip text="Tins">
                                                        <div id="tins-display" className="flex items-center gap-1">
                                                            <Image src={stannum_coin} alt="Tins" width={14} height={14} className="shrink-0" />
                                                            <span className="text-xs text-amber-400 font-bold">{formatCoins(user?.coins ?? 0)}</span>
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                            }
                                        </m.div>
                                }
                                {
                                    isExpanded && !isLoading &&
                                    <m.button
                                        key={'sidebar_logout_desktop'}
                                        initial={{ y: 150, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 150, opacity: 0 }}
                                        type="button"
                                        onClick={onLogout}
                                        className="bg-card h-8 aspect-square rounded-full flex justify-center items-center text-neutral-400 hover:text-white shrink-0"
                                    >
                                        <span className="sr-only">Cerrar sesión</span>
                                        <PowerIcon className="text-xl transition-200"/>
                                    </m.button>
                                }
                            </AnimatePresence>
                        </m.div>
                    </m.nav>
                </m.div>
            </m.div>
        </Fragment>
    )
}
