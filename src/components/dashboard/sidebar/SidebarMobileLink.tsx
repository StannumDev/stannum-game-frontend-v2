import { SidebarLink } from "@/interfaces"
import Link from "next/link"

interface Props{
    link: SidebarLink
    pathname: string;
}

export const SidebarMobileLink = ({link, pathname}:Props) => {
    const { label, href, Icon } = link
    return (
        <Link
            href={href}
            aria-label={`Navegar a ${label}`}
            className={`w-full py-3 flex flex-col justify-center items-center gap-0.5 transition-all duration-200 ease-in-out
                ${pathname === href ? 'text-stannum' : 'text-card-lightest'}
            `}
        >
            <Icon className="size-8"/>
            <span className="sr-only">{label}</span>
        </Link>
    )
}