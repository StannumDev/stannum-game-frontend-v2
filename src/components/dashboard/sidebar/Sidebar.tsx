'use client'

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import type { SidebarLink } from "@/interfaces";
import { AppsIcon, CommunityIcon, HomeIcon, StoreIcon, UserCircleIcon } from "@/icons";
import { SidebarDesktop, SidebarMobile } from "@/components";
import { useUserStore } from "@/stores/userStore";

export const Sidebar = () => {
    const pathname = usePathname();

    const user = useUserStore(s => s.user);
    const isLoading = useUserStore(s => s.isLoading);
    const refreshCount = useUserStore(s => s._refreshCount);

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

    const userData = useMemo(() => {
        if (!user) return null;
        const photoUrl = user.profilePhoto ? `${user.profilePhoto}?v=${refreshCount}` : undefined;
        return { id: user.id, username: user.username, profilePhoto: photoUrl };
    }, [user?.id, user?.username, user?.profilePhoto, refreshCount]);

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
            label: 'Comunidad',
            href: '/dashboard/community',
            Icon: CommunityIcon,
        },
        {
            label: 'Tienda',
            href: '/dashboard/store',
            Icon: StoreIcon,
        },
        {
            label: 'Mi perfil',
            href: `${userData?.username ? `/dashboard/profile/${userData?.username}` : '/dashboard'}`,
            Icon: UserCircleIcon,
        },
    ];

    if(!userData) return;

    return (
    isLargeScreen ?
        <SidebarDesktop user={userData} links={links} pathname={pathname} isLoading={isLoading} />
    :
        <SidebarMobile user={userData} links={links} pathname={pathname} isLoading={isLoading} />
    )
};