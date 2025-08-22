'use client'

import { useEffect, useState } from "react";
import { getIndividualRanking  } from "@/services";
import { errorHandler } from "@/helpers";
import type { AppError, SimpleRanking } from "@/interfaces";
import { RankingStarIcon, SpinnerIcon } from "@/icons";
import { CardRankingHome, MotionWrapperLayoutClient } from "@/components";


export const RankingHome = () => {

    const [rankings, setRankings] = useState<Array<SimpleRanking>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRanking = async () => {
            setIsLoading(true);
            try {
                const data = await getIndividualRanking(10);
                setRankings(data);
            } catch (error:unknown) {
                const appError:AppError = errorHandler(error);
                console.error(appError);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRanking();
    }, []);

    return (
        <MotionWrapperLayoutClient className="grow">
            <section id="top-leaders" className="size-full card flex flex-col">
                <div className="w-full flex justify-between items-center">
                    <h2 className="w-fit title-2 flex items-center gap-2">
                        <div>
                            <RankingStarIcon className="text-2xl lg:text-3xl relative -top-px"/>
                        </div>
                        Top Líderes
                    </h2>
                    <div className="w-fit px-2.5 lg:px-4 py-1 text-sm lg:text-lg rounded-lg border border-card relative transition-200">
                        {/* <InfoCircleIcon className="text-xs lg:text-base text-stannum absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 rounded-full bg-card scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-200"/> */}
                        Temporada 1
                    </div>
                </div>
                <div className="mt-4 lg:mt-8 w-full grow flex flex-col">
                    <div className="w-full grid grid-cols-12 lg:grid-cols-8 gap-1 lg:gap-2 px-1 lg:px-4">
                        <h3 className="col-span-2 lg:col-span-1 text-center text-xs lg:text-base">Posición</h3>
                        <h3 className="col-span-6 lg:col-span-3 lg:pl-2 text-xs lg:text-base">Jugador</h3>
                        <h3 className="hidden lg:block lg:col-span-2 lg:pl-2 text-xs lg:text-base">Empresa</h3>
                        <h3 className="col-span-2 lg:col-span-1 text-center text-xs lg:text-base">Nivel</h3>
                        <h3 className="col-span-2 lg:col-span-1 text-center text-xs lg:text-base">XP</h3>
                    </div>
                    <div className="mt-2 w-full grow min-h-72 lg:min-h-24 overflow-y-auto overflow-x-hidden relative">
                        { isLoading ?
                            <div className="size-full flex justify-center items-center">
                                <SpinnerIcon className="animate-spin size-8"/>
                            </div>
                        : rankings.length === 0 ? (
                            <div className="size-full bg-card flex justify-center items-center"><p className="max-w-sm text-center text-card-lightest">En breve veras reflejado tu puntaje y del resto de jugadores aquí.</p></div>
                        ) : (
                            <div className="w-full lg:w-[calc(100%+5px)] grow flex flex-col gap-1.5 lg:gap-3 items-start absolute top-0 left-0">
                                {rankings.map((player, i) => <CardRankingHome {...player} key={`ranking_home_${i}`} />)}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MotionWrapperLayoutClient>
    )
}