'use client'

import { useEffect, useState } from "react";
import { getTeamRanking } from "@/services";
import { RankingStarIcon } from "@/icons";
import { AppError, TeamRanking } from "@/interfaces";
import { TMDTeamRankingCard } from "@/components";
import { errorHandler } from "@/helpers";

export const TMDRankingLayout = () => {
    
    const [teams, setTeams] = useState<Array<TeamRanking>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTeamRanking = async () => {
            try {
                const data = await getTeamRanking("TMD");
                setTeams(data);
            } catch (error) {
                const appError:AppError = errorHandler(error);
                console.error(appError);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeamRanking();
    }, []);

    return (
        <section className="w-full">
            <div className="w-full flex items-end gap-2 lg:gap-4">
                <RankingStarIcon className="text-3xl lg:text-4xl"/>
                <h2 className="title-2 flex flex-col justify-center leading-none grow">
                    <span className="subtitle-1">Temporada 1</span>
                    <span>Top leaders</span>
                </h2>
                <p className="px-2 lg:px-4 py-1 rounded-lg bg-stannum/40 text-stannum text-xs lg:text-sm"><span className="hidden lg:inline">Tiempo restante: </span>25d 20h 15m</p>
            </div>
            <div className="mt-6 w-full flex flex-col gap-2 lg:gap-4">
            { isLoading ?
                <p className="text-white/75 text-center w-full py-6">Cargando ranking por equipos...</p>
            :
                teams.map((team) => ( <TMDTeamRankingCard key={team.team} team={team} /> ))
            }
            </div>
        </section>
    )
}