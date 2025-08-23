'use client'

import Link from "next/link"
import Image from "next/image"
import type { SimpleRanking } from "@/interfaces"
import { FirstPlaceIcon, SecondPlaceIcon, ThirdPlaceIcon } from "@/components"
import default_user from "@/assets/user/default_user.webp";

interface Props{
  user:SimpleRanking;
  owner: boolean;
}

export const CardRankingHome = ({ user, owner }: Props) => {

  const { position, name, username, photo, enterprise, level, points } = user;

  const renderPositionIcon = () => {
    if (position === 1) return <FirstPlaceIcon />;
    if (position === 2) return <SecondPlaceIcon />;
    if (position === 3) return <ThirdPlaceIcon />;
    return <span className="text-sm lg:text-base font-black">{position}</span>;
  };
  
  return (
      <Link href={`/dashboard/profile/${username}`} className={`w-full ${ owner && "text-stannum" } bg-card hover:bg-card-light/75 px-1 lg:px-4 py-2 rounded-lg grid grid-cols-12 lg:grid-cols-8 items-center gap-1 lg:gap-2`}>
          <h3 className="col-span-2 lg:col-span-1 flex justify-center items-center relative">
              <span className="sr-only">
                {position === 1 ? "Primer puesto" : position === 2 ? "Segundo puesto" : position === 3 ? "Tercer puesto" : `Puesto número ${position}`}
              </span>
              {renderPositionIcon()}
          </h3>
          <h3 className="col-span-6 lg:col-span-3 lg:pl-2 flex items-center gap-2 lg:gap-3">
            <Image src={photo || default_user} alt={`Foto de ${name}`} width={36} height={36} className="size-7 lg:size-9 rounded-full" />
            <span className="grow whitespace-nowrap truncate text-sm lg:text-base">{name}</span>
          </h3>
          <h3 className="hidden lg:block lg:col-span-2 lg:pl-2 whitespace-nowrap truncate text-sm lg:text-base">{enterprise||"-"}</h3>
          <h3 className="col-span-2 lg:col-span-1 text-center text-sm lg:text-base">{level}</h3>
          <h3 className="col-span-2 lg:col-span-1 text-center text-sm lg:text-base">{points}</h3>
      </Link>
  )
}