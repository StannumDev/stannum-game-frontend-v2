import { ProfileAchievementsCard } from "@/components"
import type { Achievement } from "@/interfaces";
import { achievements } from "@/achievements";

export const AchievementsLayout = () => {
    return (
        <section className="w-full flex flex-col justify-start items-start gap-8">
            <header>
                <div className="w-fit flex justify-start items-center gap-4">
                    <h2 className="w-fit title-2">Logros y trofeos</h2>
                    <div className="w-fit text-stannum text-sm py-1 px-3 rounded-xl bg-stannum bg-opacity-40">3/25 conseguidos</div>
                </div>
                <p className="mt-2">Da un vistazo a todos los <b className="text-stannum">objetivos alcanzados</b> durante el entrenamiento.</p>
            </header>
            <div className="w-full grid grid-cols-4 gap-4">
                {
                    achievements.map((achievement:Achievement, i:number)=> (
                        <ProfileAchievementsCard {...achievement} key={i}/>
                    ))
                }
            </div>
        </section>
    )
}