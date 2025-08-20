'use client'

import { useState } from "react";
import Image from "next/image";
import { UserProfileEditCover } from "@/components";
import profile_background from '@/assets/profile/achievement_background_3.webp';

interface Props{
    owner: boolean;
}

export const UserProfileCover = ({owner}:Props) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <div className="w-full card rounded-b-none border-b-0 p-0 overflow-hidden relative group/main" >
            <div className='size-full bg-gradient-to-br from-card to-card-light absolute top-0 left-0 animate-pulse z-0'></div>
            <div className="size-full bg-gradient-to-b from-transparent to-black absolute top-0 left-0 z-20"></div>
            <div onClick={() => owner && setShowModal(true)} className="lg:hidden size-full opacity-0 absolute top-0 left-0 z-30"></div>
            <Image priority src={profile_background} alt="Profile background STANNUM Game" className="w-full aspect-video lg:aspect-auto lg:h-80 object-cover relative z-10 object-[50%_65%]"/>
            { owner &&
                <UserProfileEditCover
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            }
        </div>
    )
}
