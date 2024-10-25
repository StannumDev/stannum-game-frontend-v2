'use client'

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownIcon } from "@/icons";
import { FirstPlaceIcon, TMDPlayerRankingCard } from "@/components";
import photo from '@/assets/user/default_user.webp';

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
                    <Image src={photo} alt='Primer puesto Mateo Bernabé Lohezic' className="size-7 lg:size-9 rounded-full"/>
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
                                Equipo
                            </motion.span>
                        }
                    </AnimatePresence>
                </h3>
                <h3 className="col-span-2 text-sm lg:text-base">85 Pts</h3>
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
                            <TMDPlayerRankingCard/>
                            <TMDPlayerRankingCard/>
                            <TMDPlayerRankingCard/>
                            <TMDPlayerRankingCard/>
                            <TMDPlayerRankingCard/>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}
