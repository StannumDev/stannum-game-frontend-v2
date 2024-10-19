import Link from "next/link";
import type { SocialMedia } from "@/interfaces";
import { InstagramIcon, LinkedInIcon, WorldIcon } from "@/icons";

export const UserProfileSocialMedias = () => {

    const socialMedias:Array<SocialMedia> = [
        {
            label: 'Linkedin',
            url: 'https://www.linkedin.com/in/martinmerlini/',
            Icon: LinkedInIcon,
        },
        {
            label: 'Instagram',
            url: 'https://www.instagram.com/martinmerlini.em/',
            Icon: InstagramIcon,
        },
        {
            label: 'Website',
            url: 'https://stannum.com.ar/',
            Icon: WorldIcon,
        },
    ]

    return (
        <div className="flex justify-start lg:justify-end items-center lg:items-end gap-2 absolute top-4 lg:bottom-6 left-4 lg:right-6 z-10">
            {
                socialMedias && socialMedias.length > 0 &&
                socialMedias.map(({label, url, Icon}:SocialMedia, i:number) => (
                    <Link
                        key={`socialmedia_${i}`}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="size-7 lg:size-10 rounded-lg lg:rounded-xl bg-card-light hover:bg-card-lighter flex justify-center items-center group/link transition-200"
                    >
                        <span className="sr-only">{label}</span>
                        <Icon className="size-4 lg:size-5 text-neutral-400 group-hover/link:text-white transition-200"/>
                    </Link>
                ))
            }
        </div>
    )
}
