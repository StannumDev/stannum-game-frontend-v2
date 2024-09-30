import type { SidebarLink } from "@/interfaces"
import Link from "next/link"
import { motion } from 'framer-motion';

interface Props{
    link: SidebarLink
    pathname: string;
}

export const SidebarDesktopLink = ({link, pathname}:Props) => {
    const { label, href, Icon } = link
    return (
        <Link
            href={href}
            aria-label={`Navegar a ${label}`}
            className={`w-full py-4 px-8 flex justify-start items-center gap-2 transition-all duration-200 ease-in-out relative
                ${pathname !== href && 'hover:bg-[rgba(103,204,185,0.25)]'}
            `}
        >
            {
                pathname === href &&
                <motion.div
                    layoutId="activeSidebar"
                    transition={{ duration: 0.125, type: 'spring', bounce: 0 }}
                    className="size-full bg-gradient-to-tr from-stannum to-teal-200 absolute top-0 left-0 z-0"
                ></motion.div>
            }
            <Icon className="size-5 relative z-10"/>
            <span className="font-semibold relative z-10">{label}</span>
        </Link>
    )
}