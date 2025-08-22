import type { Achievement, FullUserDetails } from "@/interfaces";
import { ProfileAchievementsCard } from "@/components";
import { achievements } from "@/config/achievements";

interface Props {
    owner: boolean;
    user: FullUserDetails
}

export const AchievementsLayout = ({user, owner}:Props) => {
    return (
        <section className="w-full flex flex-col items-start gap-8">
            <header>
                <div className="w-full lg:w-fit flex flex-row justify-between lg:justify-start items-center gap-4 lg:gap-4">
                    <h2 className="w-fit title-2">Logros y trofeos</h2>
                    <div className="w-fit text-stannum text-sm py-1 px-3 rounded-xl bg-stannum/40">{user.achievements.length}/{achievements.length}<span className="hidden lg:inline"> conseguidos</span></div>
                </div>
                <p className="mt-2">Da un vistazo a todos los <b className="text-stannum">objetivos alcanzados</b> durante el entrenamiento.</p>
            </header>
            <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
                {
                    achievements.map((achievement:Achievement, i:number)=> (
                        <ProfileAchievementsCard owner={owner} achievement={achievement} user={user} key={`achievement_profile_${i}`}/>
                    ))
                }
            </div>
        </section>
    )
}