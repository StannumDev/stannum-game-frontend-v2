import { Fragment } from 'react';
import { ArrowBackIcon } from '@/icons';
import { TMDInstructionCard, TMDInstructionDetails, TMDLessonCard } from '@/components';
import { TMD_PROGRAM } from "@/config/programs";

interface Props{
    restartModule: () => void;
    selectedInstruction: number|null;
    handleInstructionChange: (instruction:number) => void;
    restartInstruction: () => void
}

export const PreseasonModuleOne = ({restartModule, selectedInstruction, handleInstructionChange, restartInstruction}:Props) => {

    const goBack = () => selectedInstruction ? restartInstruction() : restartModule();
    const moduleSection = TMD_PROGRAM.modules.find((mod) => mod.id === "TMDM01");

    if (!moduleSection) {
      return <div className="text-red-500">Error: Módulo no encontrado</div>;
    }

    return (
        <div className="w-full">
            <button type="button" onClick={goBack} className='px-2 py-1 rounded-lg text-card-lightest hover:text-white flex justify-center items-center gap-1 lg:hover:bg-card transition-200'>
                <ArrowBackIcon/>
                <span className='font-semibold'>Atras</span>
            </button>
            <div className="mt-4 w-full flex flex-col">
                <span className="subtitle-1">{moduleSection.name}</span>
                <h2 className="title-2 text-lg lg:text-2xl">{moduleSection.description}</h2>
            </div>
            <div className='mt-6 w-full'>
                {
                    !selectedInstruction ?
                    <Fragment>
                        <section className="mt-4 w-full">
                            <h3 className="subtitle-1">Lecciones</h3>
                            <div className="mt-4 w-full flex flex-col gap-4">
                                { moduleSection.lessons.map((lesson, index) => (
                                <TMDLessonCard
                                    key={lesson.id}
                                    index={index + 1}
                                    programName={"tmd"}
                                    id={lesson.id}
                                    title={lesson.title}
                                    completed={false}
                                />
                                ))}
                            </div>
                        </section>
                        <section className="mt-6 w-full">
                            <h3 className="subtitle-1">Instrucciones</h3>
                            <div className="mt-4 w-full flex flex-col gap-4">
                                <TMDInstructionCard
                                index={1}
                                title="Ejemplo de instrucción"
                                handleInstructionChange={handleInstructionChange}
                                />
                            </div>
                        </section>
                    </Fragment>
                    :
                    selectedInstruction === 1 && <TMDInstructionDetails/>
                }
            </div>
        </div>
    )
}
