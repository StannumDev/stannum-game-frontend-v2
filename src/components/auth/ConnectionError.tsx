'use client';

import { useUserStore } from '@/stores/userStore';
import { TbWifiOff } from 'react-icons/tb';
import { SpinnerIcon } from '@/icons';

export const ConnectionError = () => {
    const connectionError = useUserStore(s => s.connectionError);
    const isLoading = useUserStore(s => s.isLoading);
    const retryInit = useUserStore(s => s.retryInit);

    if (!connectionError) return null;

    return (
        <main className="main-container size-full justify-center items-center min-h-dvh">
            <div className="flex flex-col items-center gap-4 text-center px-4">
                <TbWifiOff className="size-16 text-zinc-400" />
                <h2 className="text-xl font-semibold text-white">Sin conexión al servidor</h2>
                <p className="text-zinc-400 text-sm max-w-sm">
                    No se pudo conectar al servidor. Estamos reintentando automáticamente...
                </p>
                {isLoading ? (
                    <SpinnerIcon className="size-6 text-stannum animate-spin" />
                ) : (
                    <button
                        onClick={() => retryInit()}
                        className="mt-2 px-4 py-2 text-sm font-medium rounded-lg bg-stannum/10 text-stannum hover:bg-stannum/20 transition-colors"
                    >
                        Reintentar ahora
                    </button>
                )}
            </div>
        </main>
    );
};
