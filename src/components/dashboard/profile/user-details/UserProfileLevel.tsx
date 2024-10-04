import styles from '@/components/styles/userProfileLevel.module.css';

const progress:number = 3500/5000*100;

export const UserProfileLevel = () => {
    return (
        <div className="flex items-stretch absolute bottom-6 left-6 bg-card rounded-xl overflow-hidden h-16">
            <div className={`bg-card-light pl-6 pr-8 flex flex-col justify-center items-center ${styles.clip__diagonal}`}>
                <span className="font-thin leading-none">Nivel</span>
                <p className="text-stannum text-3xl font-semibold leading-none">25</p>
            </div>
            <div className='w-64 px-4 bg-card flex flex-col justify-center items-start gap-1'>
                <p className='text-sm leading-none'><b className='text-stannum'>3500 XP</b> / 5000 XP</p>
                <div className="w-full h-4 bg-card-light rounded-full flex overflow-hidden transition-all duration-200 ease-in-out" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                    <div
                        className={`bg-stannum ${styles.pattern__stripes}`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}
