import { BsFillCollectionPlayFill, BsCompassFill } from "react-icons/bs";
import { RiFilePaper2Fill } from "react-icons/ri";
import { FaChevronRight } from "react-icons/fa6";
import styles from '@/components/styles/TMDModuleCard.module.css';
import { Dispatch, SetStateAction } from "react";


interface Props{
    index: number;
    title: string;
    setSelectedModule: Dispatch<SetStateAction<number|null>>
}

export const TMDModuleCard = ({index, title, setSelectedModule}:Props) => {
    return (
        <div onClick={() => { setSelectedModule(index) }} className="w-full h-20 flex items-center bg-card hover:bg-card-light/40 rounded-lg relative overflow-hidden group cursor-pointer transition-200">
            <div className={`w-20 h-full bg-stannum flex justify-center items-center shrink-0 ${styles.index__clip__diagonal}`}>
                <span className='text-4xl font-semibold relative -left-1'>{ index < 10 ? `0${index}` : index }</span>
            </div>
            <div className='ml-4 grow min-w-0 overflow-x-hidden flex flex-col pr-8'>
                <span className='subtitle-1'>Módulo { index < 10 ? `0${index}` : index }</span>
                <h2 className='w-full title-2 text-xl truncate'>{title}</h2>
            </div>
            <div className='flex w-fit h-14 relative z-10 shrink-0'>
                <div className='-mr-8 px-4 bg-card border-2 border-stannum rounded-full text-lg tracking-widest font-semibold uppercase flex justify-center items-center relative z-10'>
                    Estado
                </div>
                <div className='pl-12 pr-4 flex items-center gap-4 bg-card border-2 border-card-light rounded-e-full'>
                    <div className='size-9 bg-card-light rounded-full flex justify-center items-center'>
                        <BsFillCollectionPlayFill className="size-5 text-neutral-400"/>
                        <span className="sr-only">Lecciones</span>
                    </div>
                    <div className='size-9 bg-stannum rounded-full flex justify-center items-center'>
                        <RiFilePaper2Fill className="size-5 text-white"/>
                        <span className="sr-only">Misiones</span>
                    </div>
                    <div className='size-9 bg-card-light rounded-full flex justify-center items-center'>
                        <BsCompassFill className="size-5 text-neutral-400"/>
                        <span className="sr-only">Instrucciones</span>
                    </div>
                </div>
            </div>
            <div className='w-4 group-hover:w-14 flex justify-center items-center relative z-10 transition-200 shrink-0'>
                <FaChevronRight className="size-6 opacity-0 group-hover:opacity-100 relative right-1 transition-200"/>
            </div>
            <div className={`w-32 h-full absolute top-0 right-0 ${styles.end__pattern}`}></div>
        </div>
    )
}
