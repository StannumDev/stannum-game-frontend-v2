import { TMDModuleCard } from "@/components";
import { Dispatch, SetStateAction } from "react";
import { motion } from 'framer-motion';

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
    },
    {
        index: 3,
        title: 'Organización digital del área de dirección'
    },
    {
        index: 4,
        title: 'Organización digital del área de ventas'
    },
]

export const PreseasonModulesGrid = ({setSelectedModule}:Props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="w-full flex flex-col gap-4"
        >
            {
                modules.map( ({index, title}:Module) => (
                    <TMDModuleCard index={index} title={title} setSelectedModule={setSelectedModule} key={index}/>
                ))
            }
        </motion.div>
    )
}
