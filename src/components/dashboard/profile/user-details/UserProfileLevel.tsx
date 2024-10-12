import styles from '@/components/styles/userProfileLevel.module.css';

const progress:number = 3500/5000*100;

export const UserProfileLevel = () => {
    return (
        <div className="mt-4 lg:mt-0 w-full md:w-auto h-20 lg:h-16 card p-0 flex items-stretch lg:rounded-xl overflow-hidden lg:absolute lg:bottom-6 lg:left-6">
            <div className={`bg-card lg:bg-card-light pl-6 pr-8 flex flex-col justify-center items-center ${styles.clip__diagonal}`}>
                <span className="font-thin leading-none">Nivel</span>
                <p className="text-stannum text-4xl lg:text-3xl font-semibold leading-none">25</p>
            </div>
            <div className='w-full lg:w-64 px-4 bg-transparent flex flex-col justify-center items-start gap-1'>
                <p className='lg:text-sm leading-none'><b className='text-stannum'>3500 XP</b> / 5000 XP</p>
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
