import { achievements } from "@/utilities";
import type { Achievement } from "@/interfaces";
import { ProfileAchievementsCard } from "@/components"

export const AchievementsLayout = () => {
    return (
        <section className="w-full flex flex-col items-start gap-8">
            <header>
                <div className="w-full lg:w-fit flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-2 lg:gap-4">
                    <h2 className="w-fit title-2">Logros y trofeos</h2>
                    <div className="w-fit text-stannum text-sm py-1 px-3 rounded-xl bg-stannum/40">3/25 conseguidos</div>
                </div>
                <p className="mt-4 lg:mt-2 text-center lg:text-start">Da un vistazo a todos los <b className="text-stannum">objetivos alcanzados</b> durante el entrenamiento.</p>
            </header>
            <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
                {
                    achievements.map((achievement:Achievement, i:number)=> (
                        <ProfileAchievementsCard {...achievement} key={`achievement_profile_${i}`}/>
                    ))
                }
            </div>
        </section>
    )
}