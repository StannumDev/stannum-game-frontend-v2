'use client'

import Link from "next/link"
import { AnimatePresence, m } from 'framer-motion';
import type { SidebarLink } from "@/interfaces";
import { useSidebarStore } from "@/stores/sidebarStore";

interface Props{
    link: SidebarLink
    pathname: string;
    isActive: boolean;
}

export const SidebarDesktopLink = ({link, isActive}:Props) => {
    const storeExpanded = useSidebarStore(s => s.isExpanded);
    const hydrated = useSidebarStore(s => s._hydrated);
    const isExpanded = hydrated ? storeExpanded : true;
    const { label, href, Icon } = link

    return (
        <Link
            href={href}
            aria-label={`Navegar a ${label}`}
            className={`w-full h-14 px-8 flex items-center transition-200 relative ${ !isActive ? 'hover:bg-card-hover text-neutral-400 hover:text-neutral-200' : 'text-card' } ${!isExpanded && 'justify-center'}`}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                {
                    isExpanded ?
                    <m.div
                        initial={{ x: -150, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -150, opacity: 0 }}
                        transition={{ x:{ duration: 0.25 }, opacity:{ duration: 0.125 } }}
                        className="flex items-center gap-2 relative z-10"
                        key='textSidebarLinkDesktop'
                    >
                        <Icon className="size-5"/>
                        <span className="font-semibold">
                            {label}
                        </span>
                    </m.div>
                    :
                    <m.div
                        initial={{ x: 150, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 150, opacity: 0 }}
                        transition={{ x:{ duration: 0.25 }, opacity:{ duration: 0.125 } }}
                        key='iconSidebarLinkDesktop'
                    >
                        <Icon className='size-7 relative z-10'/>
                    </m.div>
                }
            </AnimatePresence>
        </Link>
    )
}
