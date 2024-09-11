'use client'

import { usePathname } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { RiApps2Fill } from "react-icons/ri";
import { IoBagHandle } from "react-icons/io5";
import { PiUserCircleFill } from "react-icons/pi";
import type { SidebarLink } from "@/interfaces"
import { SidebarDesktop, SidebarMobile } from "@/components"

const links:Array<SidebarLink> = [
    {
        label: 'Inicio',
        href: '/dashboard',
        Icon: GoHomeFill
    },
    {
        label: 'Biblioteca',
        href: '/dashboard/aszxcd',
        Icon: RiApps2Fill
    },
    {
        label: 'Tienda',
        href: '/dashboard/asczxcvd',
        Icon: IoBagHandle
    },
    {
        label: 'Mi perfil',
        href: '/dashboard/asvsdd',
        Icon: PiUserCircleFill
    },
]

export const Sidebar = () => {
    const pathname = usePathname()

    return (
    <>
        <SidebarDesktop links={links} pathname={pathname} />
        <SidebarMobile links={links} pathname={pathname} />
    </>
    )
}