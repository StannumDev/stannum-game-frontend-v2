'use client'

import { motion } from 'framer-motion';
import { SpinnerIcon } from '@/icons';

interface Props{
    isLoading: boolean;
    text: string;
    className?: string;
    form?: string;
}

export const SubmitButtonLoading = ({isLoading, text, form, className}:Props) => {
    return (
        <motion.button
            whileTap={{scale: !isLoading ? 1.05 : 1 }}
            whileHover={{ backgroundColor: '#66eae5'}}
            type="submit"
            form={form}
            disabled={isLoading}
            className={`${className} bg-stannum disabled:bg-stannum-light rounded tracking-tighter flex justify-center items-center`}
        >
            {
                isLoading ?
                    <SpinnerIcon className="animate-spin size-6"/>
                :
                    text
            }
        </motion.button>
    )
}
