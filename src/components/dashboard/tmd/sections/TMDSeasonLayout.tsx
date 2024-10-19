'use client'

import { useState } from 'react';
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
]

export const TMDSeasonLayout = () => {
    
    const [, setSelectedModule] = useState<number|null>(null)
    
    return (
        <section className="w-full flex flex-col gap-4">
            {
                modules.map( ({index, title}:Module) => (
                    <TMDModuleCard index={index} title={title} setSelectedModule={setSelectedModule} key={index}/>
                ))
            }
        </section>
    )
}