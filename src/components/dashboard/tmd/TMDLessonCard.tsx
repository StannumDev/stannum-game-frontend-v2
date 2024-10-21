import Link from 'next/link';
import { ArrowRightIcon, CheckIcon, PlayIcon } from '@/icons';
import styles from '@/components/styles/TMDCard.module.css';

interface Props{
    index: number;
    title: string;
    completed: boolean
}

export const TMDLessonCard = ({index, title, completed}:Props) => {
    return (
        <Link href={'/dashboard/library/tmd/lessons'} className="w-full h-20 flex items-center bg-card hover:bg-card-light/40 rounded-lg relative overflow-hidden group cursor-pointer transition-200">
            <div className={`w-20 h-full bg-stannum flex justify-center items-center shrink-0 ${styles.index__clip__diagonal}`}>
                <span className='text-4xl font-semibold relative -left-1'>{ index < 10 ? `0${index}` : index }</span>
            </div>
            <div className='ml-4 grow min-w-0 overflow-x-hidden flex flex-col pr-8'>
                <span className='subtitle-1'>Lección { index < 10 ? `0${index}` : index }</span>
                <h2 className='w-full title-2 text-xl truncate'>{title}</h2>
            </div>
            {
                completed ?
                <div className='w-fit flex items-center gap-4 shrink-0 relative z-10'>
                    <div className='subtitle-1'>Incompleto</div>
                    <div className='px-8 h-12 bg-card border-2 border-card-light rounded-full text-lg tracking-widest font-semibold uppercase flex justify-center items-center gap-2 transition-200'>
                        Reproducir
                        <PlayIcon/>
                    </div>
                </div>
                :
                <div className='px-8 h-12 bg-stannum rounded-full text-lg tracking-widest font-semibold uppercase flex justify-center items-center gap-2 shrink-0 relative z-10'>
                    Completado
                    <CheckIcon/>
                </div>
            }
            <div className='w-4 group-hover:w-14 flex justify-center items-center relative z-10 transition-200 shrink-0'>
                <ArrowRightIcon className="size-6 opacity-0 group-hover:opacity-100 relative right-1 transition-200"/>
            </div>
            <div className={`w-32 h-full absolute top-0 right-0 ${styles.end__pattern}`}></div>
        </Link>
    )
}
