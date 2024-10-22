import { PreseasonModuleOne, PreseasonModulesGrid } from "@/components";

interface Props{
    selectedModule: number|null;
    handleModuleChange: (module:number) => void;
    restartModule: () => void;
    selectedInstruction: number|null;
    handleInstructionChange: (instruction:number) => void;
    restartInstruction: () => void;
}

export const TMDPreseasonLayout = ({ selectedModule, handleModuleChange, restartModule, selectedInstruction, handleInstructionChange, restartInstruction }:Props) => {

    const props = {
        restartModule,
        selectedInstruction,
        handleInstructionChange,
        restartInstruction
    }

    return (
        <section className="w-full flex flex-col gap-4">
            {
                !selectedModule ?
                <PreseasonModulesGrid handleModuleChange={handleModuleChange}/> :
                selectedModule === 1 && <PreseasonModuleOne {...props}/>
            }
        </section>
    )
}