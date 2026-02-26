'use client'

import { useEffect, useState } from "react";
import { getIndividualRanking  } from "@/services";
import { errorHandler } from "@/helpers";
import type { SimpleRanking } from "@/interfaces";
import { RankingStarIcon } from "@/icons";
import { CardRankingHome, MotionWrapperLayout, RankingRowSkeleton } from "@/components";
import { useUserStore } from "@/stores/userStore";

export const RankingHome = () => {
    const username = useUserStore(s => s.user?.username);
    const _refreshCount = useUserStore(s => s._refreshCount);

    const [rankings, setRankings] = useState<Array<SimpleRanking>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRanking = async () => {
            setIsLoading(true);
            try {
                const data = await getIndividualRanking(100);
                setRankings(data);
            } catch (error:unknown) {
                errorHandler(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRanking();
    }, [_refreshCount]);

    return (
        <MotionWrapperLayout className="grow">
            <section id="top-leaders" className="size-full card flex flex-col">
                <div className="w-full flex justify-between items-start">
                    <div className="w-fit flex items-center gap-2">
                        <div>
                            <RankingStarIcon className="text-2xl lg:text-3xl relative -top-px"/>
                        </div>
                        <div>
                            <h2 className="title-2">Top Líderes</h2>
                            <p className="text-xs lg:text-sm text-card-lightest">Ranking global de todos los programas</p>
                        </div>
                    </div>
                    <div className="w-fit px-2.5 lg:px-4 py-1 text-xs lg:text-lg rounded-lg border border-card relative whitespace-nowrap transition-200">
                        Pretemporada 2026
                    </div>
                </div>
                <div className="mt-4 lg:mt-8 w-full grow flex flex-col">
                    <div className="w-full grid grid-cols-12 lg:grid-cols-8 gap-1 lg:gap-2 px-1 lg:px-4">
                        <h3 className="col-span-2 lg:col-span-1 text-center text-xs lg:text-base">Posición</h3>
                        <h3 className="col-span-6 lg:col-span-3 lg:pl-2 text-xs lg:text-base">Jugador</h3>
                        <h3 className="hidden lg:block lg:col-span-2 lg:pl-2 text-xs lg:text-base">Empresa</h3>
                        <h3 className="col-span-2 lg:col-span-1 text-center text-xs lg:text-base">Nivel</h3>
                        <h3 className="col-span-2 lg:col-span-1 text-center text-xs lg:text-base">Rango</h3>
                    </div>
                    <div className="mt-2 w-[calc(100%+9px)] lg:w-[calc(100%+13px)] grow min-h-72 xl:min-h-48 overflow-y-auto overflow-x-hidden relative">
                        { isLoading ?
                            <div className="w-full pr-1 lg:pr-2 flex flex-col gap-1.5 lg:gap-3 absolute top-0 left-0">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <RankingRowSkeleton key={i} />
                                ))}
                            </div>
                        : rankings.length === 0 ? (
                            <div className="size-full bg-card flex flex-col justify-center items-center gap-2 py-8">
                                <RankingStarIcon className="text-4xl text-card-lighter" />
                                <p className="max-w-sm text-center text-card-lightest">El ranking se actualizará a medida que los jugadores completen lecciones e instrucciones.</p>
                            </div>
                        ) : (
                            <div className="w-full pr-1 lg:pr-2 grow flex flex-col gap-1.5 lg:gap-3 items-start absolute top-0 left-0">
                                {rankings.map((player) => <CardRankingHome user={player} owner={username === player.username} key={`ranking_home_${player.username}`} />)}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MotionWrapperLayout>
    )
}