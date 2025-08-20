'use client'

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownIcon } from "@/icons";
import { SimpleRanking, TeamRanking } from "@/interfaces";
import { FirstPlaceIcon, ProgramPlayerRankingCard } from "@/components";
import default_user from '@/assets/user/default_user.webp';

interface Props {
    team: TeamRanking;
}

export const ProgramTeamRankingCard = ({ team }: Props) => {

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const { team: teamName, position, points, members } = team;

    return (
        <div className="w-full">
            <motion.article
                onClick={ () => setIsExpanded(!isExpanded) }
                className={`w-full px-4 py-2 lg:p-4 grid grid-cols-8 lg:grid-cols-12 items-center gap-4 lg:gap-2 relative z-10 cursor-pointer transition-200 group ${ isExpanded ? 'rounded-t-lg bg-stannum/40' : 'rounded-lg bg-card lg:hover:bg-card-light/75' }`}
            >
                <h3 className="col-span-1 flex justify-center items-center relative">
                    <span className="sr-only">Puesto {position}</span>
                    {position === 1 ? <FirstPlaceIcon /> : <span className="text-sm lg:text-base font-black">{position}</span>}
                </h3>
                <h3 className="col-span-4 flex items-center gap-2 lg:gap-4">
                    <Image src={default_user} alt={`Equipo ${teamName}`} className="size-7 lg:size-9 rounded-full drop-shadow-sm" />
                    <span className="whitespace-nowrap truncate text-sm lg:text-base">{teamName}</span>
                </h3>
                <h3 className="hidden lg:block col-span-4">
                    <AnimatePresence>
                        { isExpanded &&
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                Rol en el equipo
                            </motion.span>
                        }
                    </AnimatePresence>
                </h3>
                <h3 className="col-span-2 text-sm lg:text-base">
                    <div className="min-w-14 text-end">
                        <span className="relative right-0.5">{points} Pts</span>
                    </div>
                </h3>
                <h3 className={`col-span-1 text-xs lg:text-base flex justify-center ${ isExpanded ? 'opacity-100 -rotate-180' : 'opacity-100 lg:opacity-0 lg:group-hover:opacity-100' } transition-200`}>
                    <ArrowDownIcon/>
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
                            { members.map((player:SimpleRanking, i:number) => (
                                <ProgramPlayerRankingCard player={player} key={i} />
                            ))}
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}
