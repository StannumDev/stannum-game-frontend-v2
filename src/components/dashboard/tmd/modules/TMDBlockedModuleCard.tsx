import styles from '@/components/styles/TMDModuleCard.module.css';
import { LockIcon } from '@/icons';

interface Props{
    index: number;
    title: string;
}

export const TMDBlockedModuleCard = ({index, title}:Props) => {
    return (
        <div className='w-full h-16 lg:h-20 pr-4 bg-card/25 flex items-center rounded-lg relative overflow-hidden'>
            <div className={`h-full aspect-square lg:bg-card-light ${styles.index__clip__diagonal} flex justify-center items-center shrink-0`}>
                <span className='text-2xl lg:text-4xl text-white/25 font-semibold lg:relative lg:-left-1'>{ index < 10 ? `0${index}` : index }</span>
            </div>
            <div className='lg:ml-4 grow min-w-0 overflow-x-hidden flex flex-col relative z-10 pr-28 lg:pr-4'>
                <span className='subtitle-1 lg:text-sm text-white/25'>Módulo { index < 10 ? `0${index}` : index }</span>
                <h2 className='w-full title-2 text-base lg:text-xl truncate text-white/25'>{title}</h2>
            </div>
            <div className='hidden lg:flex w-fit mr-[7.5rem] items-center gap-4 shrink-0 relative z-10'>
                <div className='subtitle-1 text-white/25'>Completa el módulo anterior</div>
                <div className='px-8 h-12 bg-card border-2 border-card-light rounded-full text-lg text-white/50 tracking-widest font-semibold uppercase flex justify-center items-center gap-2 transition-200'>
                    Bloqueado
                </div>
            </div>
            <div className='h-full absolute top-0 right-2 translate-x- flex justify-center items-center overflow-hidden'>
                <LockIcon className='size-12 text-white/50'/>
            </div>
            <div className={`w-32 h-full absolute top-0 right-0 ${styles.blocked__end__pattern}`}></div>
        </div>
    )
}
