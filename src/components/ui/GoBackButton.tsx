'use client'
 
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowBackIcon } from '@/icons';

interface Props{
    className?: string;
}

export const GoBackButton = ({className}:Props) => {
    const router = useRouter()
    return (
        <motion.button
            whileHover={{ opacity: 0.75 }}
            type='button'
            onClick={router.back}
            className={`${className} flex items-center gap-1.5`}
        >
            <ArrowBackIcon className="stroke-[0.25] relative top-px"/>
            <span className="font-light text-lg">Atras</span>
        </motion.button>
    )
}
