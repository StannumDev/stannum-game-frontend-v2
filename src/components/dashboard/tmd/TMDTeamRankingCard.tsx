'use client'

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from 'framer-motion';
import { SimpleRanking } from "@/interfaces";
import { ArrowDownIcon } from "@/icons";
import { FirstPlaceIcon, TMDPlayerRankingCard } from "@/components";
import mateo from '@/assets/user/usuario_mateo.webp';
import photo from '@/assets/user/default_user.webp';

const players:Array<SimpleRanking> = [
    {
        position: 1,
        name:"Mateo Bernabé Lohezic",
        username:"mateolohezic",
        photo: mateo,
        enterprise: "Desarrollador",
        points: 100,
    },
    {
        position: 2,
        name:"Nicolas Darelli",
        username:"nicodarelli",
        photo: photo,
        enterprise: "Diseñador UI/UX",
        points: 93,
    },
    {
        position: 3,
        name:"Nani Ghiotto",
        username:"nanighiotto",
        photo: photo,
        enterprise: "Director de Marketing",
        points: 87,
    },
    {
        position: 4,
        name:"Martin Merlini",
        username:"martinmerlini",
        photo: photo,
        enterprise: "Director Estratégico",
        points: 86,
    },
    {
        position: 5,
        name:"Alejandro de la Zerda Alejandro de la Zerda Alejandro de la Zerda Alejandro de la Zerda",
        username:"alezerda",
        photo: photo,
        enterprise: "Director INVEO Director INVEO Director INVEO Director INVEO Director INVEO Director INVEO",
        points: 84,
    },
]

export const TMDTeamRankingCard = () => {

    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [isHovered, setIsHovered] = useState<boolean>(false)

    return (
        <div className="w-full">
            <motion.article
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={ () => setIsExpanded(!isExpanded) }
                className={`w-full p-4 grid grid-cols-12 items-center gap-1 lg:gap-2 relative z-10 cursor-pointer transition-200 ${ isExpanded ? 'rounded-t-lg bg-stannum/75' : 'rounded-lg bg-card hover:bg-card-light/75' }`}
            >
                <h3 className="col-span-1 flex justify-center items-center relative">
                    <span className="sr-only">
                        Segundo puesto
                    </span>
                    <FirstPlaceIcon/>
                </h3>
                <h3 className="col-span-4 flex items-center gap-2 lg:gap-4">
                    <Image src={photo} alt='Primer puesto Mateo Bernabé Lohezic' className="size-7 lg:size-9 rounded-full drop-shadow-sm"/>
                    <span className="whitespace-nowrap truncate text-sm lg:text-base">STANNUM</span>
                </h3>
                <h3 className="col-span-4 text-sm lg:text-base">
                    <AnimatePresence>
                        { isExpanded &&
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                Integrantes
                            </motion.span>
                        }
                    </AnimatePresence>
                </h3>
                <h3 className="col-span-2 text-sm lg:text-base">
                    <div className="w-14 text-end">
                        <span className="relative right-0.5">85 Pts</span>
                    </div>
                </h3>
                <h3 className="col-span-1 text-sm lg:text-base flex justify-center">
                    <motion.span
                        animate={{ opacity: isHovered || isExpanded ? 1 : 0, rotate: isExpanded ? '-180deg' : 0 }}
                    >
                        <ArrowDownIcon/>
                    </motion.span>
                </h3>
            </motion.article>
            <div className="w-full overflow-hidden">
                <AnimatePresence>
                    {
                        isExpanded &&
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="w-full flex flex-col relative z-0"
                        >
                            {
                                players.map( (player, i) => (
                                    <TMDPlayerRankingCard player={player} key={i}/>
                                ))
                            }
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}
