import { RankingStarIcon } from "@/icons";
import { TMDTeamRankingCard } from "@/components";

export const TMDRankingLayout = () => {
    
    return (
        <section className="w-full">
            <div className="w-full flex items-center gap-4">
                <RankingStarIcon className="text-3xl lg:text-4xl"/>
                <h2 className="title-2 flex flex-col justify-center leading-none">
                    <span className="subtitle-1">Temporada 1</span>
                    <span>Top leaders</span>
                </h2>
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