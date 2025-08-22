import Link from 'next/link';
import { ArrowRightIcon, CheckIcon, LockIcon, PlayIcon } from '@/icons';
import styles from '@/components/styles/ProgramLessonCard.module.css';

interface Props{
    id: string;
    programName: string; 
    index: number;
    title: string;
    isCompleted: boolean;
    isAvailable: boolean;
}

export const ProgramLessonCard = ({ id, programName, index, title, isCompleted, isAvailable }: Props) => {

    if(isAvailable){
        return (
            <Link href={`/dashboard/library/${programName}/lessons/${id}`} className="w-full h-16 lg:h-20 flex items-center bg-card lg:bg-card/25 hover:bg-card-light/40 rounded-lg relative overflow-hidden group cursor-pointer transition-200">
                <div className={`h-full w-12 lg:w-auto lg:aspect-square ${ isCompleted ? 'lg:bg-stannum lg:text-card' : 'lg:bg-card' } flex justify-center items-center shrink-0 ${styles.index__clip__diagonal}`}>
                    <span className='text-lg lg:text-4xl font-semibold lg:relative lg:-left-1'>{ index < 10 ? `0${index}` : index }</span>
                </div>
                <div className='lg:ml-4 grow min-w-0 overflow-x-hidden flex flex-col pr-4 lg:pr-8 relative z-10'>
                    <span className='subtitle-1'>Lección { index < 10 ? `0${index}` : index }</span>
                    <h2 className='w-full title-2 text-base lg:text-xl truncate'>{title}</h2>
                </div>
                { isCompleted ?
                    <div className='w-8 lg:w-auto lg:px-8 h-8 lg:h-12 bg-stannum text-card rounded-full flex justify-center items-center lg:gap-2 shrink-0 relative z-10'>
                        <span className='sr-only lg:not-sr-only text-lg tracking-widest font-semibold uppercase'>Completado</span>
                        <CheckIcon className='size-6 lg:size-5'/>
                    </div>
                    :
                    <div className='w-fit flex items-center lg:gap-4 shrink-0 relative z-10'>
                        <div className='sr-only lg:not-sr-only subtitle-1'>Pendiente</div>
                        <div className='w-8 lg:w-auto lg:px-8 h-8 lg:h-12 lg:bg-card lg:border-2 lg:border-card-light rounded-full flex justify-center items-center gap-2 transition-200'>
                            <span className='sr-only lg:not-sr-only text-lg tracking-widest font-semibold uppercase'>Reproducir</span>
                            <PlayIcon className='size-6 lg:size-5'/>
                        </div>
                    </div>
                }
                <div className='w-4 group-hover:lg:w-12 flex justify-center items-center relative z-10 transition-200 shrink-0'>
                    <ArrowRightIcon className="size-4 opacity-0 group-hover:lg:opacity-100 relative right-1 transition-200"/>
                </div>
                <div className={`hidden lg:block w-32 h-full absolute top-0 right-0 ${styles.end__pattern}`}></div>
            </Link>
        )
    } else {
        return (
            <div className="w-full h-16 lg:h-20 pr-4 opacity-50 flex items-center bg-card/25 rounded-lg relative overflow-hidden">
                <div className={`h-full w-12 lg:w-auto lg:aspect-square lg:bg-card/25 flex justify-center items-center shrink-0 ${styles.index__clip__diagonal}`}>
                    <span className='text-lg lg:text-4xl text-white/25 font-semibold lg:relative lg:-left-1'>{ index < 10 ? `0${index}` : index }</span>
                </div>
                <div className='lg:ml-4 grow min-w-0 overflow-x-hidden flex flex-col pr-4 lg:pr-8 relative z-10'>
                    <span className='subtitle-1'>Lección { index < 10 ? `0${index}` : index }</span>
                    <h2 className='w-full title-2 text-base lg:text-xl truncate'>{title}</h2>
                </div>
                <div className='hidden lg:flex w-fit mr-[7.5rem] items-center gap-4 shrink-0 relative z-10'>
                    <div className='subtitle-1 text-white/25'>Completa la lección anterior</div>
                    <div className='px-8 h-12 bg-card border-2 border-card-light rounded-full text-lg text-white/50 tracking-widest font-semibold uppercase flex justify-center items-center gap-2 transition-200'>
                        Bloqueado
                    </div>
                </div>
                <div className='shrink-0 w-8 lg:w-auto lg:h-full lg:absolute lg:top-0 lg:right-2 lg:translate-x- flex justify-center items-center overflow-hidden'>
                    <LockIcon className='size-5 lg:size-12 text-white/50'/>
                </div>
                <div className={`w-32 h-full hidden lg:block absolute top-0 right-0 ${styles.blocked__end__pattern}`}></div>
            </div>
        )
    }
}
