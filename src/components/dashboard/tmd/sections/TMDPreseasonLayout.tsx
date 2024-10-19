'use client'

import { useCallback, useState } from 'react';
import { PreseasonModuleOne, PreseasonModulesGrid } from "@/components";

export const TMDPreseasonLayout = () => {

    const [selectedModule, setSelectedModule] = useState<number|null>(null)

    const restartNavigation = useCallback(() => {
        setSelectedModule(null)
    },[setSelectedModule])
    

    return (
        <section className="w-full flex flex-col gap-4">
            {
                !selectedModule ?
                <PreseasonModulesGrid setSelectedModule={setSelectedModule} key={'PreseasonModulesGrid'}/> :
                selectedModule === 1 && <PreseasonModuleOne restartNavigation={restartNavigation} key={'PreseasonModuleOne'}/>
            }
        </section>
    )
}