import Link from "next/link";
import type { FullUserDetails } from "@/interfaces";
import { InstagramIcon, LinkedInIcon, WorldIcon, TwitterIcon, TikTokIcon, FacebookIcon, YouTubeIcon, GitHubIcon, LinkIcon } from "@/icons";

interface Props {
    user: FullUserDetails;
}

const platformIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    LinkedIn: LinkedInIcon,
    Instagram: InstagramIcon,
    Twitter: TwitterIcon,
    TikTok: TikTokIcon,
    Facebook: FacebookIcon,
    YouTube: YouTubeIcon,
    GitHub: GitHubIcon,
    Website: WorldIcon,
    Otra: LinkIcon,
};

export const UserProfileSocialMedias = ({ user }: Props) => {
    const socialLinks = user?.profile?.socialLinks;

    if (!socialLinks || socialLinks.length === 0) return null;

    return (
        <div className="mt-4 lg:mt-0 flex justify-center lg:justify-end items-center lg:items-end gap-2 lg:absolute lg:bottom-6 lg:right-6 z-10 pointer-events-auto">
            {socialLinks.map((link, index) => {
                const Icon = platformIconMap[link.platform] || WorldIcon;
                return (
                    <div key={`socialmedia_${index}`}>
                        <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lg:p-2 lg:rounded-lg lg:bg-card-light/40 lg:hover:bg-card-light flex justify-center items-center group transition-200 hover:text-stannum"
                        >
                            <span className="sr-only">{link.platform}</span>
                            <div>
                                <Icon className={`size-5 text-card-lightest group-hover:text-stannum transition-200`}/>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};