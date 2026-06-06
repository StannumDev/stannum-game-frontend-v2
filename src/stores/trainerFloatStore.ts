'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Estado de apertura del chat flotante de STAN. El CONTEXTO (lección vs general) ya NO vive
// acá: lo deriva TrainerChatFloat del pathname. Este store solo controla abrir/cerrar +
// el flag de "respuesta sin leer" (cuando un stream completa con el panel cerrado).
interface TrainerFloatStore {
    isOpen: boolean;
    hasUnread: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    markUnread: () => void; // no-op si el panel ya está abierto
}

// Storage SSR-safe: sessionStorage (se borra al cerrar la pestaña), noop en el server.
const ssrSafeStorage = createJSONStorage<Pick<TrainerFloatStore, 'isOpen'>>(() => {
    if (typeof window !== 'undefined') return sessionStorage;
    const noop: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> = {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
    };
    return noop as Storage;
});

export const useTrainerFloatStore = create<TrainerFloatStore>()(
    persist(
        (set) => ({
            isOpen: false,
            hasUnread: false,
            open: () => set({ isOpen: true, hasUnread: false }),
            close: () => set({ isOpen: false }),
            toggle: () => set((s) => (s.isOpen ? { isOpen: false } : { isOpen: true, hasUnread: false })),
            markUnread: () => set((s) => (s.isOpen ? {} : { hasUnread: true })),
        }),
        {
            name: 'stan-chat-open',
            partialize: (s) => ({ isOpen: s.isOpen }),
            storage: ssrSafeStorage,
        },
    ),
);
