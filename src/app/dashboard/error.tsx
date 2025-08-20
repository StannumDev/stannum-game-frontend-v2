'use client'
 
import { errorHandler } from '@/helpers'
import { WarningOctagonIcon } from '@/icons'
import Link from 'next/link'
import { useEffect } from 'react'
 
interface Props {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({error, reset}: Props) {
    useEffect(() => {
        errorHandler(error);
    }, [error, reset])
 
    return (
        <main className='main-container size-full justify-center items-center gap-0'>
            <WarningOctagonIcon className='size-32 text-invalid' />
            <h2 className='title-2'>¡Algo salió mal!</h2>
            <p className='mt-2 subtitle-1'>{error.message}</p>
            <div className='mt-8 flex flex-col lg:flex-row justify-center items-center gap-4'>
                <Link
                    href={'/'}
                    className="w-40 h-9 bg-card lg:bg-card-light rounded text-sm font-semibold flex justify-center items-center hover:bg-card-light lg:hover:bg-card-lighter transition-200"
                >
                    Volver al inicio
                </Link>
                <button
                    onClick={reset}
                    className='w-40 h-9 text-sm font-semibold bg-stannum hover:bg-stannum-light disabled:bg-stannum-light text-card rounded tracking-tighter flex justify-center items-center transition-200'
                >
                    Intentar de nuevo
                </button>
            </div>
        </main>
    )
}