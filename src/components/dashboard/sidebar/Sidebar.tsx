'use client'

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { SidebarLink, UserSidebarDetails } from "@/interfaces";
import { AppsIcon, HomeIcon, StoreIcon, UserCircleIcon } from "@/icons";
import { SidebarDesktop, SidebarMobile } from "@/components";
import { getUserSidebarDetails } from "@/services";
import { errorHandler } from "@/helpers";

export const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<UserSidebarDetails|null>(null);
    
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

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const userFetch = await getUserSidebarDetails()
                if(userFetch.username.startsWith("google_")){
                    router.push('/register/google');
                    return;
                }
                setUserData(userFetch);
            } catch (error) {
                const appError = errorHandler(error);
                console.error(`[${appError.code}] ${appError.techMessage}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [router]);
    
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

    return ( 
    isLargeScreen ?
        <SidebarDesktop user={userData} links={links} pathname={pathname} isLoading={isLoading} />
    :
        <SidebarMobile user={userData} links={links} pathname={pathname} isLoading={isLoading} />
    )
};