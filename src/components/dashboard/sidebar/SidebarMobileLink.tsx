'use client'

import Link from "next/link";
import { SidebarLink } from "@/interfaces";
import { SidebarMobileIndicator } from "@/components";

interface Props{
    link: SidebarLink;
    pathname: string;
    isSearching: boolean
}

export const SidebarMobileLink = ({link, pathname, isSearching}:Props) => {
    const { label, href, Icon } = link
    return (
        <Link
            href={href}
            aria-label={`Navegar a ${label}`}
            className={`w-full py-3 flex flex-col justify-center items-center gap-0.5 transition-all duration-200 ease-in-out relative
                ${pathname === href && !isSearching ? 'text-stannum' : 'text-card-lightest'}
            `}
        >
            <Icon className="size-8"/>
            <span className="sr-only">{label}</span>
            { pathname === href && !isSearching && <SidebarMobileIndicator/> }
        </Link>
    )
}