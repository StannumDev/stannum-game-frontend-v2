import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import { TMDModuleCard } from '@/components';

interface Props{
    setSelectedModule: Dispatch<SetStateAction<number|null>>
}

interface Module{
    index: number;
    title: string;
}

const modules:Array<Module> = [
    {
        index: 1,
        title: 'Introducción a la organización digital en la nube'
    },
    {
        index: 2,
        title: 'Áreas funcionales'
    }
]

export const PreseasonModuleOne = ({setSelectedModule}:Props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="w-full flex flex-col gap-4 h-96"
        >
            <div className='w-full flex'>
                <button type="button" onClick={() => { setSelectedModule(null) }} className='px-2 py-1 rounded-lg text-card-lightest hover:text-white flex justify-center items-center gap-1 lg:hover:bg-card-light transition-200'>
                    <FaChevronLeft/>
                    <span className='font-semibold'>Volver</span>
                </button>
            </div>
            <div className='w-full flex flex-col gap-4'>
                {
                    modules.map( ({index, title}:Module) => (
                        <TMDModuleCard index={index} title={title} setSelectedModule={setSelectedModule} key={index}/>
                    ))
                }
            </div>
        </motion.div>
    )
}
