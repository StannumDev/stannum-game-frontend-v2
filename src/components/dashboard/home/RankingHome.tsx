'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { getIndividualRanking  } from "@/services";
import type { SimpleRanking } from "@/interfaces";
import { InfoCircleIcon, RankingStarIcon } from "@/icons";
import { CardRankingHome, MotionWrapperLayoutClient } from "@/components";


export const RankingHome = () => {

    const [rankings, setRankings] = useState<Array<SimpleRanking>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const data = await getIndividualRanking("TMD", 10);
                setRankings(data);
            } catch (err) {
                console.error("Error loading ranking:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRanking();
    }, []);

    return (
        <MotionWrapperLayoutClient>
            <section id="top-leaders" className="w-full card">
                <div className="w-full flex justify-between items-center">
                    <h2 className="w-fit title-2 flex items-center gap-2">
                        <div>
                            <RankingStarIcon className="text-2xl lg:text-3xl relative -top-px"/>
                        </div>
                        Top Leaders
                    </h2>
                    <Link href={'/dashboard/library/tmd?section=ranking'} className="w-fit px-2.5 lg:px-4 py-1 text-sm lg:text-lg rounded-lg border border-card relative group hover:bg-card-hover transition-200">
                        <InfoCircleIcon className="text-xs lg:text-base text-stannum absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 rounded-full bg-card scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-200"/>
                        Temporada 1
                    </Link>
                </div>
                <div className="mt-4 lg:mt-8 w-full">
                    <div className="w-full grid grid-cols-12 lg:grid-cols-8 gap-1 lg:gap-2 px-1 lg:px-4">
                        <h3 className="col-span-2 lg:col-span-1 text-center text-xs lg:text-base">Posición</h3>
                        <h3 className="col-span-5 lg:col-span-4 lg:pl-2 text-xs lg:text-base">Jugador</h3>
                        <h3 className="col-span-3 lg:col-span-2 lg:pl-2 text-xs lg:text-base">Empresa</h3>
                        <h3 className="col-span-2 lg:col-span-1 text-center text-xs lg:text-base">Puntos</h3>
                    </div>
                    <div className="mt-2 w-[calc(100%+11px)] lg:w-[calc(100%+13px)] pr-1.5 lg:pr-2 flex flex-col gap-1.5 lg:gap-3 items-start max-h-80 lg:max-h-64 overflow-y-scroll overflow-x-hidden">
                        { loading ?
                            <p className="text-white/75 text-center w-full py-6">Cargando ranking...</p>
                        :
                            rankings.map((player, i) => <CardRankingHome {...player} key={`ranking_home_${i}`} />)
                        }
                    </div>
                </div>
            </section>
        </MotionWrapperLayoutClient>
    )
}