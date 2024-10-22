import { TMDModuleCard } from "@/components";

interface Props{
    handleModuleChange: (module:number) => void;
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

export const PreseasonModulesGrid = ({handleModuleChange}:Props) => {
    return (
        <div className="w-full flex flex-col gap-4">
            {
                modules.map( ({index, title}:Module) => (
                    <TMDModuleCard index={index} title={title} handleModuleChange={handleModuleChange} key={index}/>
                ))
            }
        </div>
    )
}
