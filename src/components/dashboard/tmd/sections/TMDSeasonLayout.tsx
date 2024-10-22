import { TMDModuleCard } from "@/components";

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
}

const modules:Array<Module> = [
    {
        index: 1,
        title: 'Introducción a la organización digital en la nube'
    },
]

export const TMDSeasonLayout = ({ handleModuleChange }:Props) => {
    
    return (
        <section className="w-full flex flex-col gap-4">
            {
                modules.map( ({index, title}:Module) => (
                    <TMDModuleCard index={index} title={title} handleModuleChange={handleModuleChange} key={index}/>
                ))
            }
        </section>
    )
}