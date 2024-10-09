'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import type { SidebarLink } from "@/interfaces";
import { SidebarMobileIndicator } from "@/components";

interface Props{
    link: SidebarLink;
    pathname: string;
    isSearching: boolean
}

export const SidebarMobileLink = ({link, pathname, isSearching}:Props) => {
    const { label, href, Icon } = link

    const [isActive, setIsActive] = useState<boolean>(false)

    useEffect(() => {
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
        checkActive()
    }, [pathname, href])

    return (
        <Link
            href={href}
            aria-label={`Navegar a ${label}`}
            className={`w-full py-3 flex flex-col justify-center items-center gap-0.5 transition-200 relative ${isActive && !isSearching ? 'text-stannum' : 'text-card-lightest'}`}
        >
            <Icon className="size-8"/>
            <span className="sr-only">{label}</span>
            {isActive && !isSearching && <SidebarMobileIndicator/>}
        </Link>
    )
}