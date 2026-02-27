'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'

export default function Error({error, reset}: {error: Error & { digest?: string }, reset: () => void}) {
    useEffect(() => {
        if (error.name === 'ChunkLoadError' || error.message?.includes('Loading chunk')) {
            window.location.reload()
        }
    }, [error])

    if(process.env.NEXT_PUBLIC_ENV === 'development') {
        console.log("Error occurred:", error);
        console.log("Reset:", reset);
    }
    redirect("/login");
}