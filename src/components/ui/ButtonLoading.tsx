'use client'

import { motion } from 'framer-motion';
import { LiaSpinnerSolid } from "react-icons/lia";

interface Props{
    isLoading: boolean;
    text: string;
    className?: string;
}

export const ButtonLoading = ({isLoading, text, className}:Props) => {
    return (
        <motion.button
            whileTap={{scale: 1.05}}
            whileHover={{ backgroundColor: '#8cdccd'}}
            disabled={isLoading}
            type="submit"
            className={`${className} bg-stannum disabled:bg-stannum-hover rounded tracking-tighter text-white flex justify-center items-center`}
        >
            {
                isLoading ?
                    <LiaSpinnerSolid className="animate-spin size-6"/>
                :
                    text
            }
        </motion.button>
    )
}
