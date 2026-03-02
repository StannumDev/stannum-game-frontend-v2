'use client'

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import type { SidebarLink } from "@/interfaces";
import { AppsIcon, CommunityIcon, HomeIcon, StoreIcon, UserCircleIcon, RotateRightIcon } from "@/icons";
import { SidebarDesktop, SidebarMobile } from "@/components";
import { useUserStore } from "@/stores/userStore";
import { isSubscription } from "@/utilities";

const SKELETON_LINKS: Array<SidebarLink> = [
    { label: 'Inicio', href: '/dashboard', Icon: HomeIcon },
    { label: 'Biblioteca', href: '/dashboard/library', Icon: AppsIcon },
    { label: 'Comunidad', href: '/dashboard/community', Icon: CommunityIcon },
    { label: 'Tienda', href: '/dashboard/store', Icon: StoreIcon },
    { label: 'Mi perfil', href: '/dashboard', Icon: UserCircleIcon },
];

export const Sidebar = () => {
    const pathname = usePathname();

    const user = useUserStore(s => s.user);
    const isLoading = useUserStore(s => s.isLoading);
    const isAuthenticated = useUserStore(s => s.isAuthenticated);
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
        return { id: user.id, username: user.username, profilePhoto: photoUrl, currentLevel: user.level?.currentLevel ?? 1, coins: user.coins ?? 0 };
    }, [user?.id, user?.username, user?.profilePhoto, user?.level?.currentLevel, user?.coins, refreshCount]);

    const hasSubscription = user?.programs && Object.values(user.programs).some(p => isSubscription(p));

    if (pathname.startsWith('/dashboard/checkout') || pathname.startsWith('/dashboard/subscription/checkout') || pathname.startsWith('/dashboard/subscription/result')) return null;

    const links: Array<SidebarLink> = userData ? [
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
        ...(hasSubscription ? [{
            label: 'Suscripciones',
            href: '/dashboard/subscriptions',
            Icon: RotateRightIcon,
        }] : []),
        {
            label: 'Mi perfil',
            href: `/dashboard/profile/${userData.username}`,
            Icon: UserCircleIcon,
        },
    ] : SKELETON_LINKS;

    const showLoading = isLoading || (isAuthenticated && !userData);

    return (
    isLargeScreen ?
        <SidebarDesktop user={userData} links={links} pathname={pathname} isLoading={showLoading} />
    :
        <SidebarMobile key={pathname} user={userData} links={links} pathname={pathname} isLoading={showLoading} />
    )
};
