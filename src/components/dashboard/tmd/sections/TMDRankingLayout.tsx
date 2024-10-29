import { RankingStarIcon } from "@/icons";
import { TMDTeamRankingCard } from "@/components";

export const TMDRankingLayout = () => {
    
    return (
        <section className="w-full">
            <div className="w-full flex items-end gap-4">
                <RankingStarIcon className="text-3xl lg:text-4xl"/>
                <h2 className="title-2 flex flex-col justify-center leading-none grow">
                    <span className="subtitle-1">Temporada 1</span>
                    <span>Top leaders</span>
                </h2>
                <p className="px-4 py-1 rounded-lg bg-stannum/40 text-stannum text-sm">Tiempo restante: 25d 20h 15m</p>
            </div>
            <div className="mt-6 w-full flex flex-col gap-4">
                <TMDTeamRankingCard/>
                <TMDTeamRankingCard/>
                <TMDTeamRankingCard/>
                <TMDTeamRankingCard/>
            </div>
        </section>
    )
}