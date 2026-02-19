'use client'
 
import { useRouter } from 'next/navigation';
import { ArrowBackIcon } from '@/icons';

interface Props{
    className?: string;
    href?: string;
}

export const GoBackButton = ({className, href}:Props) => {
    const router = useRouter()
    return (
        <button
            type='button'
            onClick={() => href ? router.push(href) : router.back()}
            className={`px-2 py-1 rounded-lg hover:bg-white/10 flex justify-center items-center gap-1 transition-200 ${className}`}
        >
            <ArrowBackIcon/>
            <span className="font-light">Atras</span>
        </button>
    )
}
