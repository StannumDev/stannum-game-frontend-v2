import { Fragment } from 'react';
import { ArrowBackIcon } from '@/icons';
import { TMDInstructionCard, TMDInstructionDetails, TMDLessonCard } from '@/components';

interface Props{
    restartModule: () => void;
    selectedInstruction: number|null;
    handleInstructionChange: (instruction:number) => void;
    restartInstruction: () => void
}

interface Lesson{
    index: number;
    title: string;
    completed?: boolean
}

interface Instruction{
    index: number;
    title: string;
    inProcess?: boolean;
    completed?: boolean;
}

const lessons:Array<Lesson> = [
    {
        index: 1,
        title: 'Introducción a la organización digital en la nube',
        completed: true
    },
    {
        index: 2,
        title: 'Áreas funcionales'
    }
]

const instructions:Array<Instruction> = [
    {
        index: 1,
        title: 'Introducción a la organización digital en la nube',
        completed: true
    },
    {
        index: 2,
        title: 'Introducción a la organización digital en la nube',
        inProcess: true
    },
    {
        index: 3,
        title: 'Áreas funcionales',
    }
]

export const PreseasonModuleOne = ({restartModule, selectedInstruction, handleInstructionChange, restartInstruction}:Props) => {

    const goBack = () => selectedInstruction ? restartInstruction() : restartModule();

    return (
        <div className="w-full">
            <button type="button" onClick={goBack} className='px-2 py-1 rounded-lg text-card-lightest hover:text-white flex justify-center items-center gap-1 lg:hover:bg-card transition-200'>
                <ArrowBackIcon/>
                <span className='font-semibold'>Atras</span>
            </button>
            <div className='mt-4 w-full flex flex-col'>
                <span className='subtitle-1'>Módulo 01</span>
                <h2 className='title-2 text-pretty'>Introducción a la organización digital en la nube</h2>
            </div>
            <div className='mt-6 w-full'>
                {
                    !selectedInstruction ?
                    <Fragment>
                        <section className='mt-4 w-full'>
                            <h3 className='subtitle-1'>Lecciones</h3>
                            <div className='mt-4 w-full flex flex-col gap-4'>
                                {
                                    lessons.map((lesson, i) => (
                                        <TMDLessonCard {...lesson} key={i}/>
                                    ))
                                }
                            </div>
                        </section>
                        <section className='mt-6 w-full'>
                            <h3 className='subtitle-1'>Instrucciones</h3>
                            <div className='mt-4 w-full flex flex-col gap-4'>
                                {
                                    instructions.map((instruction, i) => (
                                        <TMDInstructionCard {...instruction} handleInstructionChange={handleInstructionChange} key={i}/>
                                    ))
                                }
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
