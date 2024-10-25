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
        <Link href={'/dashboard/profile'} className={`w-full p-4 last:rounded-b-lg odd:bg-card hover:bg-card-light/75 grid grid-cols-12 items-center gap-1 lg:gap-2 cursor-pointer group ${ isUser && 'text-stannum' }`}>
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
            <h3 className="col-span-4 text-sm lg:text-base">{enterprise}</h3>
            <h3 className="col-span-2 text-sm lg:text-base">{points} Pts</h3>
            <h3 className="col-span-1 text-sm lg:text-base flex justify-center">
                <div className="bg-card-lighter size-8 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-200">
                    <UserIcon className="size-5"/>
                </div>
            </h3>
        </Link>
    )
}
