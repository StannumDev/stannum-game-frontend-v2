'use client'

import { useEffect, useState } from "react";
import { getProgramIndividualRanking } from "@/services";
import { errorHandler } from "@/helpers";
import type { SimpleRanking } from "@/interfaces";
import { RankingStarIcon } from "@/icons";
import { CardRankingHome, RankingRowSkeleton } from "@/components";
import { useUserStore } from "@/stores/userStore";

interface Props {
    programId: string;
}

export const ProgramIndividualRankingLayout = ({ programId }: Props) => {
    const username = useUserStore(s => s.user?.username);

    const [rankings, setRankings] = useState<Array<SimpleRanking>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        let cancelled = false;
        const fetchRanking = async () => {
            setIsLoading(true);
            setHasError(false);
            try {
                const data = await getProgramIndividualRanking(programId, 100);
                if (!cancelled) setRankings(data);
            } catch (error:unknown) {
                if (!cancelled) {
                    errorHandler(error);
                    setHasError(true);
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };
        fetchRanking();
        return () => { cancelled = true; };
    }, [programId]);

    return (
        <section className="w-full">
            <div className="w-full flex items-center gap-2 lg:gap-4">
                <RankingStarIcon className="text-2xl lg:text-3xl"/>
                <div>
                    <h2 className="title-2">Top Líderes</h2>
                    <p className="text-xs lg:text-sm text-card-lightest">Ranking de los participantes de este programa</p>
                </div>
            </div>
            <div className="mt-4 lg:mt-8 w-full flex flex-col">
                <div className="w-full grid grid-cols-12 lg:grid-cols-8 gap-1 lg:gap-2 px-1 lg:px-4">
                    <h3 className="col-span-2 lg:col-span-1 text-center text-xs lg:text-base">Posición</h3>
                    <h3 className="col-span-6 lg:col-span-3 lg:pl-2 text-xs lg:text-base">Jugador</h3>
                    <h3 className="hidden lg:block lg:col-span-2 lg:pl-2 text-xs lg:text-base">Empresa</h3>
                    <h3 className="col-span-2 lg:col-span-1 text-center text-xs lg:text-base">Nivel</h3>
                    <h3 className="col-span-2 lg:col-span-1 text-center text-xs lg:text-base">Rango</h3>
                </div>
                <div className="mt-2 w-full">
                    { isLoading ? (
                        <div className="w-full flex flex-col gap-1.5 lg:gap-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <RankingRowSkeleton key={i} />
                            ))}
                        </div>
                    ) : hasError ? (
                        <div className="size-full flex justify-center items-center py-12">
                            <p className="max-w-sm text-center text-card-lightest">Ocurrió un error al cargar el ranking. Intentá de nuevo más tarde.</p>
                        </div>
                    ) : rankings.length === 0 ? (
                        <div className="size-full flex justify-center items-center py-12">
                            <p className="max-w-sm text-center text-card-lightest">Aún no hay suficientes datos para mostrar el ranking de este programa.</p>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col gap-1.5 lg:gap-3">
                            {rankings.map((player) => (
                                <CardRankingHome user={player} owner={username === player.username} key={player.username} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
