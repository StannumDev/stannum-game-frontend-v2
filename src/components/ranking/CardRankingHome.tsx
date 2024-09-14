'use client'

import Image from "next/image"
import { motion } from 'framer-motion';
import { SimpleRanking } from "@/interfaces"
import { FirstPlaceIcon, SecondPlaceIcon, ThirdPlaceIcon } from "@/components"

export const CardRankingHome = ({position, name, photo, enterprise, points}:SimpleRanking) => {
  return (
    <motion.article
      initial={ position === 1 || position === 2 || position === 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="w-full bg-card-light px-4 py-3 rounded-lg grid grid-cols-8 items-center gap-2"
    >
        <h3 className="col-span-1 flex justify-center items-center relative">
            <span className="sr-only">
              { position === 1 ? 'Primer puesto' : position === 2 ? 'Segundo puesto' : position === 3 ? 'Tercer puesto' : `Puesto número ${position}` }
            </span>
          { position === 1 ? <FirstPlaceIcon/> : position === 2 ? <SecondPlaceIcon/>: position === 3 ? <ThirdPlaceIcon/> : <span className="text-base font-black">{position}</span> }
        </h3>
        <h3 className="col-span-4 pl-2 flex justify-start items-center gap-3">
            <Image src={photo} alt='Primer puesto Mateo Bernabé Lohezic' className="size-9 rounded-full"/>
            <span className="grow whitespace-nowrap truncate">{name}</span>
        </h3>
        <h3 className="col-span-2 pl-2 whitespace-nowrap truncate">{enterprise}</h3>
        <h3 className="col-span-1 text-center">{points}</h3>
    </motion.article>
  )
}