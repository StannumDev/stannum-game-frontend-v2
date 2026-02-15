import styles from '@/components/styles/userProfileLevel.module.css';
import { FullUserDetails } from '@/interfaces';
import { getRankByLevel } from '@/config/ranks';


interface Props {
    user: FullUserDetails
}

export const UserProfileLevel = ({ user }: Props) => {

    const rank = getRankByLevel(user.level?.currentLevel ?? 1);
    const nextLevelXP: number = Math.max(1, (user.level?.experienceNextLevel || 1) - (user.level?.experienceCurrentLevel || 0));
    const actualXP: number = Math.max(0, (user.level?.experienceTotal || 0) - (user.level?.experienceCurrentLevel || 0));
    const progress: number = Math.min(100, Math.max(0, (actualXP / nextLevelXP) * 100));

    return (
        <div className="mt-4 xl:mt-0 w-full md:w-auto relative xl:absolute xl:bottom-3 xl:left-3">
            <div
                className="absolute z-20 -top-2.5 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black"
                style={{ background: `linear-gradient(135deg, ${rank.color}, ${rank.colorSecondary})` }}
            >
                {rank.name}
            </div>
            <div className="relative p-0.5">
                <div
                    className="absolute inset-0 z-0 rounded-xl"
                    style={{ background: `linear-gradient(135deg, ${rank.color}, ${rank.colorSecondary})` }}
                />
                <div className="relative z-10 h-20 xl:h-16 card p-0 border-0 flex items-stretch rounded-[10px] overflow-hidden">
                    <div className={`bg-card xl:bg-card-light pl-4 pr-6 flex flex-col justify-center items-center ${styles.clip__diagonal}`}>
                        <div className="flex items-baseline gap-1">
                            <span className="text-[8px] font-thin uppercase leading-none text-white/50">Nv.</span>
                            <p
                                className="text-4xl xl:text-3xl font-semibold leading-none bg-clip-text text-transparent"
                                style={{ backgroundImage: `linear-gradient(135deg, ${rank.color}, ${rank.colorSecondary})` }}
                            >{user.level?.currentLevel}</p>
                        </div>
                    </div>
                    <div className='w-full xl:w-64 px-4 bg-transparent flex flex-col justify-center items-start gap-1'>
                        <p className='xl:text-sm leading-none'><b className='text-stannum'>{actualXP.toLocaleString('es-AR')} XP</b> / {nextLevelXP.toLocaleString('es-AR')} XP</p>
                        <div className="w-full h-4 border border-card-light rounded-full flex overflow-hidden transition-200" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                            <div
                                className={`bg-stannum ${styles.progressbar__pattern}`}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
