'use client'
 
import { useRouter } from 'next/navigation';
import { ArrowBackIcon } from '@/icons';

interface Props{
    className?: string;
}

export const GoBackButton = ({className}:Props) => {
    const router = useRouter()
    return (
        <button
            type='button'
            onClick={router.back}
            className={`px-2 py-1 rounded-lg hover:bg-white/10 flex items-center gap-1.5 transition-200 ${className}`}
        >
            <ArrowBackIcon/>
            <span className="font-light">Atras</span>
        </button>
    )
}
