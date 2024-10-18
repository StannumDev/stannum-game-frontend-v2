'use client'

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PreseasonModuleOne, PreseasonModulesGrid } from "@/components";

export const TMDPreseasonLayout = () => {

    const [selectedModule, setSelectedModule] = useState<number|null>(null)

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="w-full flex flex-col gap-4"
        >
            <AnimatePresence mode='wait' initial={false}>
                {
                    !selectedModule ?
                    <PreseasonModulesGrid setSelectedModule={setSelectedModule} key={'PreseasonModulesGrid'}/> :
                    selectedModule === 1 && <PreseasonModuleOne setSelectedModule={setSelectedModule} key={'PreseasonModuleOne'}/>
                }
            </AnimatePresence>
        </motion.section>
    )
}