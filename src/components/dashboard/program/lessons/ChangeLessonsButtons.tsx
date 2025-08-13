'use client'

import { Dispatch, SetStateAction } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/icons";

interface Props{
    setIsCompleted: Dispatch<SetStateAction<boolean>>;
}

export const ChangeLessonsButtons = ({setIsCompleted}:Props) => {
    return (
        <div className="flex justify-between gap-4">
            <button
                type="button"
                className='h-9 px-4 hover:bg-card-light rounded-lg tracking-tighter text-card-lightest  hover:text-white flex justify-center items-center gap-1 transition-200'
            >
                <ArrowLeftIcon className='text-sm'/>
                <span>Anterior</span>
            </button>
            <button
                type="button"
                onClick={() => setIsCompleted(true)}
                className='px-4 h-9 bg-stannum hover:bg-stannum-light rounded-lg tracking-tighter flex justify-center items-center gap-1 transition-200'
            >
                Siguiente
                <ArrowRightIcon className='text-sm'/>
            </button>
        </div>
    )
}
