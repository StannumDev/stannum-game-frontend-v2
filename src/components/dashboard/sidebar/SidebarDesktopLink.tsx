import type { SidebarLink } from "@/interfaces"
import Link from "next/link"

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
            className={`w-full py-4 px-8 flex justify-start items-center gap-2 transition-all duration-200 ease-in-out
                ${pathname === href ? 'bg-gradient-to-tr from-stannum to-teal-200' : 'hover:bg-[rgba(103,204,185,0.25)]'}
            `}
        >
            <Icon className="size-5"/>
            <span className="font-semibold">{label}</span>
        </Link>
    )
}