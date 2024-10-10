'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { UserProfileEditCover } from "@/components";
import profile_background from '@/assets/profile/achievement_background_3.webp';

export const UserProfileCover = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return (
        <div className="w-full card rounded-b-none border-b-0 p-0 overflow-hidden relative group/main" >
            <div
                onClick={() => { !isLargeScreen && setShowModal(true) }}
                className="size-full bg-gradient-to-b from-transparent to-black absolute top-0 left-0 z-10"
            ></div>
            <Image priority src={profile_background} alt="Profile background STANNUM Game" className="w-full aspect-video lg:aspect-auto lg:h-80 object-cover relative z-0 object-[50%_65%]"/>
            <UserProfileEditCover
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </div>
    )
}
