'use client'

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { SidebarLink } from "@/interfaces";
import { AppsIcon, HomeIcon, StoreIcon, UserCircleIcon } from "@/icons";
import { SidebarDesktop, SidebarMobile } from "@/components";

const links: Array<SidebarLink> = [
    {
        label: 'Inicio',
        href: '/dashboard',
        Icon: HomeIcon,
    },
    {
        label: 'Biblioteca',
        href: '/dashboard/library',
        Icon: AppsIcon,
    },
    {
        label: 'Tienda',
        href: '/dashboard/store',
        Icon: StoreIcon,
    },
    {
        label: 'Mi perfil',
        href: '/dashboard/profile/mateolohezic',
        Icon: UserCircleIcon,
    },
];

export const Sidebar = () => {
    const pathname = usePathname();
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
    
    useEffect(() => {
        const checkScreenSize = () => {
            window && setIsLargeScreen(window.innerWidth >= 1024);
        };
        checkScreenSize();
        window && window.addEventListener('resize', checkScreenSize);
        return () => {
            window && window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return ( 
    isLargeScreen ?
        <SidebarDesktop links={links} pathname={pathname} />
    :
        <SidebarMobile links={links} pathname={pathname} />
    )
};
