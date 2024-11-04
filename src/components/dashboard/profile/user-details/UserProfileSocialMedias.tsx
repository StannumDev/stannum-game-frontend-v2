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
        <div className="mt-4 lg:mt-0 flex justify-center lg:justify-end items-center lg:items-end gap-2 lg:absolute lg:bottom-6 lg:right-6 z-10 pointer-events-auto">
            { socialMedias && socialMedias.length > 0 &&
                socialMedias.map(({label, url, Icon}:SocialMedia, i:number) => (
                    <Link
                        key={`socialmedia_${i}`}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lg:p-2 lg:rounded-lg lg:bg-card-light/40 lg:hover:bg-card-light flex justify-center items-center group/link transition-200"
                    >
                        <span className="sr-only">{label}</span>
                        <Icon className="size-5 text-card-lightest group-hover/link:text-white transition-200"/>
                    </Link>
                ))
            }
        </div>
    )
}
