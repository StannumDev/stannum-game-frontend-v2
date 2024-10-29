import { ArrowRightIcon, CheckIcon } from "@/icons";

interface Props{
    index: number;
    title: string;
    handleModuleChange: (module:number) => void
}

export const TMDCompletedModuleCard = ({index, title, handleModuleChange}:Props) => {
    return (
        <div onClick={() => handleModuleChange(index)} className='w-full h-16 bg-stannum/40 hover:bg-stannum/50 text-stannum flex items-center rounded-lg relative overflow-hidden group cursor-pointer transition-200'>
            <div className='h-full aspect-square flex justify-center items-center shrink-0'>
                <span className='text-2xl font-semibold'>{ index < 10 ? `0${index}` : index }</span>
            </div>
            <div className='grow min-w-0 overflow-x-hidden flex flex-col pr-8'>
                <span className='subtitle-1 text-stannum'>Módulo { index < 10 ? `0${index}` : index }</span>
                <h2 className='w-full title-2 text-base truncate'>{title}</h2>
            </div>
                <div className='size-8 rounded-full flex justify-center items-center shrink-0 relative z-10'>
                    <span className="sr-only">Completado</span>
                    <CheckIcon className="size-6"/>
                </div>
            <div className='w-4 group-hover:w-12 flex justify-center items-center relative z-10 transition-200 shrink-0'>
                <ArrowRightIcon className='size-4 text-white opacity-0 group-hover:opacity-100 relative right-1 transition-200'/>
            </div>
            <div className='w-32 h-full absolute top-0 right-0'></div>
        </div>
    )
}
