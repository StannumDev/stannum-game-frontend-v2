import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, CheckIcon, CrossIcon, CrownIcon } from '@/icons';
import styles from '@/components/styles/TMDCard.module.css';
import instruction_logo from '@/assets/products/tmd/tmd_instructions.webp';
import { Fragment } from 'react';

interface Props{
    index: number;
    title: string;
    completed: boolean
}

export const TMDInstructionCard = ({index, title, completed}:Props) => {
    return (
        <Link href={'/dashboard/library/tmd?section=preseason'} className={`w-full h-52 flex items-center bg-card hover:bg-card-light/40 rounded-lg relative overflow-hidden group cursor-pointer transition-200 ${ completed && 'border-2 border-stannum' }`}>
            <div className='h-full aspect-square relative shrink-0'>
                <Image src={instruction_logo} alt='Instrucción TRENNO Mark Digital' className={`size-full absolute top-0 left-0 object-cover ${ !completed && 'grayscale' }`} />
            </div>
            <div className='pl-6 grow min-w-0 h-full flex flex-col justify-center pr-8'>
                <span className='subtitle-1'>Instrucción {index < 10 ? `0${index}` : index}</span>
                <h2 className='w-full title-2 text-xl truncate'>{title}</h2>
                <p className='mt-2 w-full max-w-xl text-base line-clamp-3'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi facilis sit saepe vero vel at hic veritatis minima aspernatur animi? Corporis officiis placeat porro eum veniam perferendis cupiditate, nostrum reiciendis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi facilis sit saepe vero vel at hic veritatis minima aspernatur animi? Corporis officiis placeat porro eum veniam perferendis cupiditate, nostrum reiciendis.
                </p>
            </div>
            <div className={`w-fit h-full flex items-center ${ completed && 'bg-gradient-to-r from-transparent from-25% via-stannum via-25% to-stannum-light/75 to-100%' }`}>
                <div className='w-[21.5rem] h-full'>
                    <div className={`w-full h-full flex flex-col justify-center items-center shrink-0 relative overflow-y-visible transition-200 ${styles.diagonal__lines} ${ completed ? `bg-card group-hover:bg-card-light ${styles.completed__diagonal__lines}` : 'bg-transparent' }`}>
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center gap-2 relative left-8'>
                                <div className={`size-10 rounded-full ${completed ? 'bg-stannum/40' : 'bg-invalid/25'}  flex justify-center items-center`}>
                                    <span className={`text-xl ${ completed ? 'text-stannum' : 'text-invalid' }`}>D</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span>Baja</span>
                                    <span className='subtitle-1'>Dificultad</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className={`size-10 rounded-full ${completed ? 'bg-stannum/40' : 'bg-invalid/25'}  flex justify-center items-center`}>
                                    <span className={`text-xl ${ completed ? 'text-stannum' : 'text-invalid' }`}>
                                        <CrownIcon />
                                    </span>
                                </div>
                                <div className='flex flex-col'>
                                    <span>200 XP</span>
                                    <span className='subtitle-1'>Recompensa</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 relative right-8'>
                                <div className={`size-10 rounded-full ${completed ? 'bg-stannum/40' : 'bg-invalid/25'}  flex justify-center items-center`}>
                                    <span className={`${completed ? 'text-stannum' : 'text-invalid'}`}>
                                        {completed ? <CheckIcon className='size-5' /> : <CrossIcon className='size-4' />}
                                    </span>
                                </div>
                                <div className='flex flex-col'>
                                    <span>{completed ? 'Completado' : 'Pendiente'}</span>
                                    <span className='subtitle-1'>Estado</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-full w-48 flex flex-col justify-center items-center gap-4 shrink-0'>
                    {
                        completed ?
                        <Fragment>
                            <div className='size-16 bg-stannum-light rounded-full text-4xl flex justify-center items-center shadow-sm'>
                                <CheckIcon/>
                            </div>
                            <div className='flex flex-col items-center gap-1'>
                                <p className='title-3 text-base whitespace-nowrap'>Instrucción completada</p>
                                <p className='text-sm'><b className='title-3 text-sm'>Tu tiempo</b> | 00:05</p>
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            <div className='w-full h-12 bg-card border-2 border-card-light rounded-full text-lg tracking-widest font-semibold uppercase flex justify-center items-center'>
                                Ver más
                            </div>
                            <div className='w-full h-12 bg-card-light rounded-full text-lg tracking-widest font-semibold uppercase flex justify-center items-center relative z-10'>
                                Comenzar
                            </div>
                        </Fragment>
                    }
                </div>
                <div className='w-4 group-hover:w-14 flex justify-center items-center relative z-10 transition-200 shrink-0'>
                    <ArrowRightIcon className="size-6 opacity-0 group-hover:opacity-100 relative right-1 transition-200" />
                </div>
            </div>
        </Link>
    )
}
