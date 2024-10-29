import { TMDCompletedModuleCard, TMDPendingModuleCard } from "@/components";

interface Props{
    selectedModule: number|null;
    handleModuleChange: (module:number) => void;
    restartModule: () => void;
    selectedInstruction: number|null;
    handleInstructionChange: (instruction:number) => void;
    restartInstruction: () => void;
}

interface Module{
    index: number;
    title: string;
    completed?: boolean
}

const modules:Array<Module> = [
    {
        index: 1,
        title: 'Introducción a la organización digital en la nube',
        completed: true,
    },
    {
        index: 2,
        title: 'Áreas funcionales',
    }
]

export const TMDSeasonLayout = ({ handleModuleChange }:Props) => {
    
    return (
        <section className="w-full flex flex-col gap-4">
            {
                modules.map( (module:Module, i:number) => (
                    module.completed ?
                    <TMDCompletedModuleCard {...module} handleModuleChange={handleModuleChange} key={i}/>
                    :
                    <TMDPendingModuleCard {...module} handleModuleChange={handleModuleChange} key={i}/>
                ))
            }
        </section>
    )
}