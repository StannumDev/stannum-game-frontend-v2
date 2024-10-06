'use client'

import { useState, useEffect, Fragment } from "react";
import { usePathname } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { RiApps2Fill } from "react-icons/ri";
import { IoBagHandle } from "react-icons/io5";
import { PiUserCircleFill } from "react-icons/pi";
import type { SidebarLink } from "@/interfaces";
import { SidebarDesktop, SidebarMobile } from "@/components";

const links: Array<SidebarLink> = [
    {
        label: 'Inicio',
        href: '/dashboard',
        Icon: GoHomeFill,
    },
    {
        label: 'Biblioteca',
        href: '/dashboard/library',
        Icon: RiApps2Fill,
    },
    {
        label: 'Tienda',
        href: '/dashboard/store',
        Icon: IoBagHandle,
    },
    {
        label: 'Mi perfil',
        href: '/dashboard/profile',
        Icon: PiUserCircleFill,
    },
];

export const Sidebar = () => {
    const pathname = usePathname();
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

    const checkScreenSize = () => {
        setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return ( 
    isLargeScreen ?
        <SidebarDesktop links={links} pathname={pathname} />
    :
        <SidebarMobile links={links} pathname={pathname} />
    )
};
