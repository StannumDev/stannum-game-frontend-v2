'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Error({error, reset}: {error: Error & { digest?: string }, reset: () => void}) {
    const router = useRouter();

    useEffect(() => {
        if(process.env.NEXT_PUBLIC_ENV === 'development') {
            console.error("Error occurred:", error);
        }
    }, [error]);

    return (
        <div className="size-full flex flex-col justify-center items-center gap-4 p-8 text-center">
            <h2 className="title-2">Ocurrió un error inesperado</h2>
            <p className="subtitle-1">Algo salió mal. Intenta nuevamente o volvé al inicio.</p>
            <div className="flex gap-4">
                <button
                    onClick={reset}
                    className="h-9 px-4 text-sm font-semibold bg-card-light hover:bg-card-lighter rounded transition-200"
                >
                    Reintentar
                </button>
                <button
                    onClick={() => router.replace('/login')}
                    className="h-9 px-4 text-sm font-semibold bg-stannum hover:bg-stannum-light text-card rounded transition-200"
                >
                    Ir al inicio
                </button>
            </div>
        </div>
    );
}