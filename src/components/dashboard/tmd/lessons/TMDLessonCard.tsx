import Link from 'next/link';
import { ArrowRightIcon, CheckIcon, PlayIcon } from '@/icons';
import styles from '@/components/styles/TMDLessonCard.module.css';

interface Props{
    index: number;
    title: string;
    completed?: boolean
}

export const TMDLessonCard = ({index, title, completed}:Props) => {
    return (
        <Link href={'/dashboard/library/tmd/lessons'} className="w-full h-16 lg:h-20 flex items-center bg-card lg:bg-card/25 lg:hover:bg-card-light/40 rounded-lg relative overflow-hidden group cursor-pointer transition-200">
            <div className={`h-full aspect-square ${ completed ? 'lg:bg-stannum' : 'lg:bg-card' } flex justify-center items-center shrink-0 ${styles.index__clip__diagonal}`}>
                <span className='text-2xl lg:text-4xl font-semibold lg:relative lg:-left-1'>{ index < 10 ? `0${index}` : index }</span>
            </div>
            <div className='lg:ml-4 grow min-w-0 overflow-x-hidden flex flex-col pr-4 lg:pr-8 relative z-10'>
                <span className='subtitle-1'>Lección { index < 10 ? `0${index}` : index }</span>
                <h2 className='w-full title-2 text-base lg:text-xl truncate'>{title}</h2>
            </div>
            { completed ?
                <div className='w-8 lg:w-auto lg:px-8 h-8 lg:h-12 bg-stannum rounded-full flex justify-center items-center lg:gap-2 shrink-0 relative z-10'>
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
            <div className='w-4 group-hover:w-12 flex justify-center items-center relative z-10 transition-200 shrink-0'>
                <ArrowRightIcon className="size-4 opacity-0 group-hover:opacity-100 relative right-1 transition-200"/>
            </div>
            <div className={`hidden lg:block w-32 h-full absolute top-0 right-0 ${styles.end__pattern}`}></div>
        </Link>
    )
}
