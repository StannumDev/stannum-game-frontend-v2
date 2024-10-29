'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SimpleRanking } from '@/interfaces';
import { UserIcon } from '@/icons';

interface Props{
    player: SimpleRanking;
}

export const TMDPlayerRankingCard = ({player}:Props) => {

    const { position, name, username, photo, enterprise, points  } = player
    const [isUser] = useState<boolean>( username === 'mateolohezic' )

    return (
        <Link href={'/dashboard/profile'} className={`w-full px-4 py-2 lg:p-4 last:rounded-b-lg odd:bg-card hover:bg-card-light/75 grid grid-cols-8 lg:grid-cols-12 items-center gap-4 lg:gap-2 cursor-pointer group ${ isUser && 'text-stannum' }`}>
            <h3 className="col-span-1 flex justify-center items-center relative">
                <span className="sr-only">
                    Segundo puesto
                </span>
                <span className="text-sm lg:text-base font-black">{position}</span>
            </h3>
            <h3 className="col-span-4 flex items-center gap-2 lg:gap-4">
                <Image src={photo} alt='Primer puesto Mateo Bernabé Lohezic' className="size-7 lg:size-9 rounded-full"/>
                <span className="whitespace-nowrap truncate text-sm lg:text-base">{name}</span>
            </h3>
            <h3 className="hidden lg:block col-span-4 whitespace-nowrap truncate text-sm lg:text-base">{enterprise}</h3>
            <h3 className="col-span-2 text-sm lg:text-base">
                <div className="min-w-14 text-end">
                    <span className="relative right-0.5">{points} Pts</span>
                </div>
            </h3>
            <h3 className="col-span-1 text-xs lg:text-base flex justify-center">
                <div className="lg:bg-card-lighter w-full lg:w-auto lg:size-8 aspect-square rounded-full flex justify-center items-center lg:opacity-0 lg:group-hover:opacity-100 transition-200">
                    <UserIcon className="size-4 lg:size-5"/>
                </div>
            </h3>
        </Link>
    )
}
