import { ArrowRightIcon, CompassIcon, PaperIcon, VideosIcon } from "@/icons";
import styles from '@/components/styles/ProgramModuleCard.module.css';

interface Props {
    index: number;
    title: string;
    lessonsProgress: number;
    instructionsProgress: number;
}

export const ProgramPendingModuleCard = ({ index, title, lessonsProgress, instructionsProgress }:Props) => {

    const getOffset = (progress: number) => 50 + (100 - 50) * (1 - progress / 100);
    const lessonsOffset = getOffset(lessonsProgress);
    const instructionsOffset = getOffset(instructionsProgress);

    return (
        <div className='w-full h-16 lg:h-20 bg-card lg:bg-card/25 hover:bg-card-light/40 flex items-center rounded-lg relative overflow-hidden group cursor-pointer transition-200'>
            <div className={`h-full aspect-square lg:bg-card-light ${styles.index__clip__diagonal} flex justify-center items-center shrink-0`}>
                <span className='text-2xl lg:text-4xl lg:relative lg:-left-1 font-semibold'>{ index < 10 ? `0${index}` : index }</span>
            </div>
            <div className='lg:ml-4 grow min-w-0 overflow-x-hidden flex flex-col pr-4'>
                <span className='subtitle-1 lg:text-sm'>Módulo { index < 10 ? `0${index}` : index }</span>
                <h2 className='w-full title-2 text-base lg:text-xl truncate'>{title}</h2>
            </div>
            <div className="w-fit flex items-center lg:gap-4 shrink-0">
                <div className='sr-only lg:not-sr-only subtitle-1 text-white/25'>En proceso</div>
                <div className='lg:p-2 flex gap-1 lg:gap-2 lg:bg-card lg:border-2 lg:border-card-light lg:rounded-full relative z-10'>
                    <div className='size-9 lg:bg-card-light rounded-full flex justify-center items-center relative'>
                        <span className="sr-only">Lecciones</span>
                        <VideosIcon className="size-4 text-white/50"/>
                        <svg className="size-full absolute top-0 left-0 -rotate-90" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9" cy="9" r="8" fill="none" strokeWidth="1" strokeLinejoin={'round'} strokeLinecap={'round'} className="stroke-current text-transparent"/>
                            <circle cx="9" cy="9" r="8" fill="none" strokeWidth="1" strokeDasharray="100" strokeLinejoin={'round'} strokeLinecap={'round'} className="stroke-current text-stannum" style={{ strokeDashoffset: lessonsOffset }}/>
                        </svg>
                    </div>
                    <div className='size-9 bg-stannum/40 rounded-full flex justify-center items-center relative'>
                        <span className="sr-only">Misiones</span>
                        <PaperIcon className="size-4 text-stannum"/>
                    </div>
                    <div className='size-9 lg:bg-card-light rounded-full flex justify-center items-center relative'>
                        <span className="sr-only">Instrucciones</span>
                        <CompassIcon className="size-4 text-white/50"/>
                        <svg className="size-full absolute top-0 left-0 -rotate-90" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9" cy="9" r="8" fill="none" strokeWidth="1" strokeLinejoin={'round'} strokeLinecap={'round'} className="stroke-current text-transparent"/>
                            <circle cx="9" cy="9" r="8" fill="none" strokeWidth="1" strokeDasharray="100" strokeLinejoin={'round'} strokeLinecap={'round'} className="stroke-current text-stannum" style={{ strokeDashoffset: instructionsOffset }}/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className='w-4 group-hover:w-12 flex justify-center items-center relative z-10 transition-200 shrink-0'>
                <ArrowRightIcon className='size-4 opacity-0 group-hover:opacity-100 relative right-1 transition-200'/>
            </div>
            <div className={`hidden lg:block w-32 h-full absolute top-0 right-0 ${styles.end__pattern}`}></div>
        </div>
    )
}
