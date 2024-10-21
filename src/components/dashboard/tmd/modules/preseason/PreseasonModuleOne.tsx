'use client'

import { ArrowBackIcon } from '@/icons';
import { TMDInstructionCard, TMDInstructionDetails, TMDLessonCard } from '@/components';
import { Fragment, useState } from 'react';

interface Props{
    restartNavigation: () => void
}

interface Lesson{
    index: number;
    title: string;
    completed: boolean
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
        completed: false
    },
    {
        index: 2,
        title: 'Áreas funcionales',
        completed: true
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

export const PreseasonModuleOne = ({restartNavigation}:Props) => {

    const [selectedInstruction, setSelectedInstruction] = useState<number|null>(null)

    const goBack = () => {
        selectedInstruction ? setSelectedInstruction(null) : restartNavigation()
    }

    return (
        <div className="w-full">
            <button type="button" onClick={goBack} className='px-2 py-1 rounded-lg text-card-lightest hover:text-white flex justify-center items-center gap-1 lg:hover:bg-card-light transition-200'>
                <ArrowBackIcon/>
                <span className='font-semibold'>Atras</span>
            </button>
            <div className='mt-4 w-full'>
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
                                        <TMDInstructionCard {...instruction} setSelectedInstruction={setSelectedInstruction} key={i}/>
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
