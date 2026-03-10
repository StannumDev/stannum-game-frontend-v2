import { create } from 'zustand';

/**
 * Store para coordinar modales y tutoriales.
 * Los componentes se registran con un `priority` (menor = se muestra primero).
 * Solo el de mayor prioridad (menor número) tiene permiso para mostrarse.
 * Cuando termina, se libera y el siguiente toma su turno.
 *
 * Uso en componentes:
 *   const isMyTurn = useModalQueueStore(s => s.queue[0]?.id === MODAL_ID);
 *   const { request, release } = useModalQueueStore();
 */

interface ModalEntry {
    id: string;
    priority: number;
}

interface ModalQueueStore {
    queue: ModalEntry[];
    request: (id: string, priority: number) => void;
    release: (id: string) => void;
}

export const useModalQueueStore = create<ModalQueueStore>((set) => ({
    queue: [],

    request: (id, priority) => {
        set(state => {
            if (state.queue.some(e => e.id === id)) return state;
            return { queue: [...state.queue, { id, priority }].sort((a, b) => a.priority - b.priority) };
        });
    },

    release: (id) => {
        set(state => {
            if (!state.queue.some(e => e.id === id)) return state;
            return { queue: state.queue.filter(e => e.id !== id) };
        });
    },
}));
