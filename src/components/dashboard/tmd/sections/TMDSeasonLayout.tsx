'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TMDModuleCard } from "@/components";

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

export const TMDSeasonLayout = () => {
    
    const [, setSelectedModule] = useState<number|null>(null)
    
    return (
        <motion.section
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
        </motion.section>
    )
}