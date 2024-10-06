import Link from "next/link";
import { FaLinkedinIn, FaInstagram,  } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import type { SocialMedia } from "@/interfaces";

export const UserProfileSocialMedias = () => {

    const socialMedias:Array<SocialMedia> = [
        {
            label: 'Linkedin',
            url: 'https://www.linkedin.com/in/martinmerlini/',
            Icon: FaLinkedinIn,
        },
        {
            label: 'Instagram',
            url: 'https://www.instagram.com/martinmerlini.em/',
            Icon: FaInstagram,
        },
        {
            label: 'Website',
            url: 'https://stannum.com.ar/',
            Icon: TbWorld,
        },
    ]

    return (
        <div className="flex justify-end items-center gap-2 absolute bottom-6 right-6">
            {
                socialMedias && socialMedias.length > 0 &&
                socialMedias.map(({label, url, Icon}:SocialMedia, i:number) => (
                    <Link key={i} href={url} target="_blank" rel="noopener noreferrer" className="size-10 rounded-xl bg-card-light hover:bg-card-lighter flex justify-center items-center group/link transition-all duration-200 ease-in-out">
                        <span className="sr-only">{label}</span>
                        <Icon className="size-5 text-neutral-400 group-hover/link:text-white transition-all duration-200 ease-in-out"/>
                    </Link>
                ))
            }
        </div>
    )
}
