'use client'

import { useState } from "react";
import Image from "next/image";
import { UserProfileEditCover } from "@/components";
import { getCoverImage } from "@/config/covers";
import { RankingStarIcon } from "@/icons";

interface Props {
    rankingPosition?: number;
    equippedCoverId?: string;
    owner: boolean;
    unlockedCoverIds?: string[];
}

export const UserProfileCover = ({ rankingPosition, equippedCoverId, owner, unlockedCoverIds }: Props) => {

    const [showModal, setShowModal] = useState(false);
    const coverImage = getCoverImage(equippedCoverId || 'cover_default');

    return (
        <div className="w-full card rounded-b-none border-b-0 p-0 overflow-hidden relative group/main">
            <div className='size-full bg-gradient-to-br from-card to-card-light absolute top-0 left-0 animate-pulse z-0'></div>
            <div className="size-full bg-gradient-to-b from-transparent to-black absolute top-0 left-0 z-20"></div>
            <div onClick={() => owner && setShowModal(true)} className="lg:hidden size-full opacity-0 absolute top-0 left-0 z-30"></div>
            <Image priority src={coverImage} alt="Profile background STANNUM Game" className="w-full aspect-video lg:aspect-auto lg:h-80 object-cover relative z-10 object-[50%_65%]" />
            {rankingPosition != null && rankingPosition > 0 && (
                <div className="absolute top-3 right-3 lg:top-4 lg:right-4 z-30 flex flex-col items-center">
                    <RankingStarIcon className="text-stannum text-sm lg:text-base drop-shadow-md" />
                    <div className="mt-0.5 rounded-full bg-stannum flex items-center justify-center shadow-lg px-3.5 py-1 lg:px-5 lg:py-1.5">
                        <span className="text-black/40 font-bold text-[10px] lg:text-xs">#</span>
                        <span className="text-black font-extrabold text-lg lg:text-2xl leading-none">{rankingPosition}</span>
                    </div>
                </div>
            )}
            {owner &&
                <UserProfileEditCover
                    showModal={showModal}
                    setShowModal={setShowModal}
                    equippedCoverId={equippedCoverId || 'default'}
                    unlockedCoverIds={unlockedCoverIds || ['default']}
                />
            }
        </div>
    )
}
