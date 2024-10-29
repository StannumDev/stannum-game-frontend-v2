import { TMDCompletedModuleCard, TMDPendingModuleCard, TMDBlockedModuleCard } from "@/components";

interface Props{
    handleModuleChange: (module:number) => void;
}

interface Module{
    index: number;
    title: string;
    completed?: boolean;
    blocked?: boolean
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
        completed: true,
    },
    {
        index: 3,
        title: 'Organización digital del área de dirección'
    },
    {
        index: 4,
        title: 'Organización digital del área de ventas',
        blocked: true
    },
]

export const PreseasonModulesGrid = ({handleModuleChange}:Props) => {
    return (
        <div className="w-full flex flex-col gap-4">
            {
                modules.map( (module:Module, i:number) => (
                    module.completed ? <TMDCompletedModuleCard {...module} handleModuleChange={handleModuleChange} key={i}/> :
                    module.blocked ? <TMDBlockedModuleCard {...module} key={i}/> :
                    <TMDPendingModuleCard {...module} handleModuleChange={handleModuleChange} key={i}/>
                ))
            }
        </div>
    )
}
