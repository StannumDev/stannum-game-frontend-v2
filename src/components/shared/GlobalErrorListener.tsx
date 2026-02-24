'use client';

import { useEffect } from 'react';

export const GlobalErrorListener = () => {
    useEffect(() => {
        const handleRejection = (event: PromiseRejectionEvent) => {
            if (process.env.NEXT_PUBLIC_ENV === 'development') {
                console.error('[Unhandled Rejection]', event.reason);
            }
        };

        window.addEventListener('unhandledrejection', handleRejection);
        return () => window.removeEventListener('unhandledrejection', handleRejection);
    }, []);

    return null;
};
