import styles from '@/components/styles/userProfileLevel.module.css';
import { FullUserDetails } from '@/interfaces';


interface Props {
    user: FullUserDetails
}

export const UserProfileLevel = ({ user }: Props) => {

    const nextLevelXP: number = Math.max(1, (user.level?.experienceNextLevel || 1) - (user.level?.experienceCurrentLevel || 0));
    const actualXP: number = Math.max(0, (user.level?.experienceTotal || 0) - (user.level?.experienceCurrentLevel || 0));
    const progress: number = Math.min(100, Math.max(0, (actualXP / nextLevelXP) * 100));

    return (
        <div className="mt-4 xl:mt-0 w-full md:w-auto h-20 xl:h-16 card p-0 flex items-stretch xl:rounded-xl overflow-hidden xl:absolute xl:bottom-3 xl:left-3">
            <div className={`bg-card xl:bg-card-light pl-6 pr-8 flex flex-col justify-center items-center ${styles.clip__diagonal}`}>
                <span className="font-thin leading-none">Nivel</span>
                <p className="text-stannum text-4xl xl:text-3xl font-semibold leading-none">{user.level?.currentLevel}</p>
            </div>
            <div className='w-full xl:w-64 px-4 bg-transparent flex flex-col justify-center items-start gap-1'>
                <p className='xl:text-sm leading-none'><b className='text-stannum'>{actualXP} XP</b> / {nextLevelXP} XP</p>
                <div className="w-full h-4 border border-card-light rounded-full flex overflow-hidden transition-200" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                    <div
                        className={`bg-stannum ${styles.progressbar__pattern}`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}
