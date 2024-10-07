'use client'

import Link from "next/link"
import { AnimatePresence, motion } from 'framer-motion';
import type { SidebarLink } from "@/interfaces"
import { useEffect, useState } from "react";

interface Props{
    link: SidebarLink
    pathname: string;
    isExpanded: boolean
}

export const SidebarDesktopLink = ({link, pathname, isExpanded}:Props) => {
    const { label, href, Icon } = link
    const [isActive, setIsActive] = useState<boolean>(false)

    const checkActive = () => {
        if(href === '/dashboard' && pathname === href){
            setIsActive(true);
            return;
        } else if(href !== '/dashboard' && pathname.startsWith(href)){
            setIsActive(true);
            return
        } else {
            setIsActive(false);
        }
    }

    useEffect(() => {
        checkActive()
    }, [pathname])
    

    const linkVariants = {
        active: 'text-white',
        inactive: 'hover:bg-card-hover text-neutral-400 hover:text-neutral-200',
    }

    return (
        <Link
            href={href}
            aria-label={`Navegar a ${label}`}
            className={`w-full py-4 px-8 flex items-center transition-200 relative
                ${ isActive ? linkVariants.active : linkVariants.inactive}
                ${isExpanded ? 'justify-start' : 'justify-center'}
            `}
        >
            {
                isActive &&
                <motion.div
                    layoutId="activeSidebar"
                    transition={{ duration: 0.125, type: 'spring', bounce: 0 }}
                    className="size-full bg-gradient-to-tr from-stannum to-teal-200 absolute top-0 left-0 z-0"
                ></motion.div>
            }
            <AnimatePresence mode="popLayout" initial={false}>
                {
                    isExpanded ?
                    <motion.div
                        initial={{ x: -150, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -150, opacity: 0 }}
                        transition={{ x:{ duration: 0.25 }, opacity:{ duration: 0.125 } }}
                        className="flex justify-start items-center gap-2 relative z-10"
                        key='textSidebarLinkDesktop'
                    >
                        <Icon className="size-5"/>
                        <span className="font-semibold">
                            {label}
                        </span>
                    </motion.div>
                    :
                    <motion.div
                        initial={{ x: 150, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 150, opacity: 0 }}
                        transition={{ x:{ duration: 0.25 }, opacity:{ duration: 0.125 } }}
                        key='iconSidebarLinkDesktop'
                    >
                        <Icon className='size-7 relative z-10'/>
                    </motion.div>
                }
            </AnimatePresence>
        </Link>
    )
}