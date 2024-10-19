'use client'

import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@/icons";

interface Props{
    setIsCompleted: Dispatch<SetStateAction<boolean>>;
}

export const ChangeLessonsButtons = ({setIsCompleted}:Props) => {
    return (
        <div className="flex justify-between gap-4">
            <motion.button
                whileTap={{scale: 1.05 }}
                type="button"
                className='flex justify-center items-center gap-1 tracking-tighter text-neutral-400 hover:text-white transition-200'
            >
                <ArrowLeftIcon className='text-sm'/>
                <span>Anterior</span>
            </motion.button>
            <motion.button
                whileTap={{scale: 1.05 }}
                whileHover={{ backgroundColor: '#66eae5'}}
                type="button"
                onClick={() => setIsCompleted(true)}
                className='px-4 py-1.5 bg-stannum rounded-lg tracking-tighter flex justify-center items-center gap-1'
            >
                Siguiente
                <ArrowRightIcon className='text-sm'/>
            </motion.button>
        </div>
    )
}
