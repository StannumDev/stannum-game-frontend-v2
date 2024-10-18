import Image from "next/image"
import { LazyMotion, domAnimation } from "framer-motion"
import * as motion from "framer-motion/m"
import type { SimpleRanking } from "@/interfaces"
import { FirstPlaceIcon, SecondPlaceIcon, ThirdPlaceIcon } from "@/components"

export const CardRankingHome = ({position, name, photo, enterprise, points}:SimpleRanking) => {
  return (
    <LazyMotion features={domAnimation}>
      <motion.article
        initial={ position !== 1 && position !== 2 && position !== 3 ? { opacity: 0, x: '100%' } : { opacity: 1, x: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        className="w-full bg-card-light px-1 lg:px-4 py-2 rounded-lg grid grid-cols-12 lg:grid-cols-8 items-center gap-1 lg:gap-2"
      >
          <h3 className="col-span-2 lg:col-span-1 flex justify-center items-center relative">
              <span className="sr-only">
                { position === 1 ? 'Primer puesto' : position === 2 ? 'Segundo puesto' : position === 3 ? 'Tercer puesto' : `Puesto número ${position}` }
              </span>
            { position === 1 ? <FirstPlaceIcon/> : position === 2 ? <SecondPlaceIcon/>: position === 3 ? <ThirdPlaceIcon/> : <span className="text-sm lg:text-base font-black">{position}</span> }
          </h3>
          <h3 className="col-span-5 lg:col-span-4 lg:pl-2 flex justify-start items-center gap-2 lg:gap-3">
              <Image src={photo} alt='Primer puesto Mateo Bernabé Lohezic' className="size-7 lg:size-9 rounded-full"/>
              <span className="grow whitespace-nowrap truncate text-sm lg:text-base">{name}</span>
          </h3>
          <h3 className="col-span-3 lg:col-span-2 lg:pl-2 whitespace-nowrap truncate text-sm lg:text-base">{enterprise}</h3>
          <h3 className="col-span-2 lg:col-span-1 text-center text-sm lg:text-base">{points}</h3>
      </motion.article>
    </LazyMotion>
  )
}