'use client';

import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import { askTrainerStream, sendTrainerFeedback, type TrainerCitation, type TrainerHistoryItem } from '@/services/trainer';
import { useTrainerFloatStore } from './trainerFloatStore';

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    citations?: TrainerCitation[];
    interactionId?: string | null;
    feedback?: 1 | -1 | 0;
    error?: boolean;
}

interface TrainerChatStore {
    messagesByLesson: Record<string, ChatMessage[]>;
    loadingByLesson: Record<string, boolean>;
    // threadKey: clave usada para el hilo en el store (puede ser programId para el float).
    // lessonId: contexto real que se manda al backend (lección actual).
    send: (args: { programId: string | null; lessonId: string | null; question: string; threadKey?: string }) => Promise<void>;
    setFeedback: (args: { threadKey: string; messageId: string; value: 1 | -1 }) => Promise<void>;
    cancel: (threadKey: string) => void;
    clear: (threadKey: string) => void;
}

const HISTORY_TURNS = 8;
const HISTORY_CONTENT_MAX = 2000; // el validator de ruta rechaza content > 2000 chars (400)
// Tope de mensajes persistidos por hilo (higiene de sessionStorage; el hilo en memoria no se recorta).
const MAX_PERSISTED_PER_THREAD = 60;

const STAN_ERRORS = [
    "Algo se me cortó del lado técnico. Mandame la pregunta de nuevo.",
    "No me llegó nada esta vez. Volvé a intentarlo.",
    "Tuve un tropiezo técnico. Dale de nuevo.",
    "Se cayó la conexión justo ahí. Intentá de nuevo.",
];
const randomStanError = () => STAN_ERRORS[Math.floor(Date.now() / 1000) % STAN_ERRORS.length];
// AbortControllers fuera del state (no deben disparar re-render ni persistirse).
const abortControllers = new Map<string, AbortController>();
const newId = () =>
    typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.round(Math.random() * 1e6)}`;

// ---- Persist en sessionStorage con escritura debounceada --------------------
// Sin esto, persist haría un setItem síncrono por CADA token del stream. Acá se
// agenda un único flush ~600ms después del primer write pendiente (throttle), y se
// fuerza el flush al ocultar/cerrar la pestaña para no perder el último estado.
const PERSIST_DELAY_MS = 600;
let persistTimer: ReturnType<typeof setTimeout> | null = null;
const pendingWrites = new Map<string, string>();

function flushPersist() {
    if (persistTimer) { clearTimeout(persistTimer); persistTimer = null; }
    if (typeof window === 'undefined' || pendingWrites.size === 0) return;
    for (const [k, v] of pendingWrites) {
        try { sessionStorage.setItem(k, v); } catch { /* quota / modo privado: se ignora */ }
    }
    pendingWrites.clear();
}

const throttledSessionStorage: StateStorage = {
    getItem: (name) => (typeof window !== 'undefined' ? sessionStorage.getItem(name) : null),
    setItem: (name, value) => {
        if (typeof window === 'undefined') return;
        pendingWrites.set(name, value); // misma clave: conserva solo el último valor
        if (!persistTimer) persistTimer = setTimeout(flushPersist, PERSIST_DELAY_MS);
    },
    removeItem: (name) => {
        pendingWrites.delete(name);
        if (typeof window !== 'undefined') { try { sessionStorage.removeItem(name); } catch { /* noop */ } }
    },
};

// Flush al ocultar/cerrar la pestaña. Listeners una sola vez (guard anti-HMR en dev).
type FlushFlag = Window & { __stanChatFlushBound?: boolean };
if (typeof window !== 'undefined' && !(window as FlushFlag).__stanChatFlushBound) {
    (window as FlushFlag).__stanChatFlushBound = true;
    window.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flushPersist(); });
    window.addEventListener('pagehide', flushPersist);
}

export const useTrainerChatStore = create<TrainerChatStore>()(
    persist(
        (set, get) => ({
            messagesByLesson: {},
            loadingByLesson: {},

            send: async ({ programId, lessonId, question, threadKey }) => {
                // threadKey: clave del hilo en el store (el float usa "stan"; fallback lessonId).
                const key = threadKey ?? lessonId;
                const q = question.trim();
                if (!key || !q || get().loadingByLesson[key]) return;

                const prev = get().messagesByLesson[key] || [];
                const userMsg: ChatMessage = { id: newId(), role: 'user', content: q };

                set((s) => ({
                    messagesByLesson: { ...s.messagesByLesson, [key]: [...prev, userMsg] },
                    loadingByLesson: { ...s.loadingByLesson, [key]: true },
                }));

                // El backend valida content <= 2000 chars por ítem: truncar antes de mandar.
                const history: TrainerHistoryItem[] = prev
                    .slice(-HISTORY_TURNS)
                    .map((m) => ({ role: m.role, content: m.content.slice(0, HISTORY_CONTENT_MAX) }));

                const controller = new AbortController();
                abortControllers.set(key, controller);

                let botId: string | null = null;
                const upsertBot = (patch: (m: ChatMessage) => ChatMessage) =>
                    set((s) => {
                        const list = s.messagesByLesson[key] || [];
                        if (!botId) {
                            botId = newId();
                            return { messagesByLesson: { ...s.messagesByLesson, [key]: [...list, patch({ id: botId, role: 'assistant', content: '' })] } };
                        }
                        return { messagesByLesson: { ...s.messagesByLesson, [key]: list.map((m) => (m.id === botId ? patch(m) : m)) } };
                    });

                try {
                    const { citations, interactionId } = await askTrainerStream(q, programId, lessonId, history, {
                        onDelta: (t) => upsertBot((m) => ({ ...m, content: m.content + t })),
                        signal: controller.signal,
                    });
                    upsertBot((m) => ({ ...m, citations, interactionId }));
                    // Si el panel está cerrado, avisá con un badge en el FAB que llegó la respuesta.
                    useTrainerFloatStore.getState().markUnread();
                } catch {
                    if (controller.signal.aborted) {
                        // cancelado (navegación / stop): no mostrar error
                    } else if (botId) {
                        upsertBot((m) => ({ ...m, content: m.content || randomStanError(), error: true }));
                    } else {
                        set((s) => ({
                            messagesByLesson: {
                                ...s.messagesByLesson,
                                [key]: [...(s.messagesByLesson[key] || []), { id: newId(), role: 'assistant', content: randomStanError(), error: true }],
                            },
                        }));
                    }
                } finally {
                    abortControllers.delete(key);
                    set((s) => ({ loadingByLesson: { ...s.loadingByLesson, [key]: false } }));
                }
            },

            cancel: (key) => {
                const c = abortControllers.get(key);
                if (c) {
                    c.abort();
                    abortControllers.delete(key);
                }
                set((s) => (s.loadingByLesson[key] ? { loadingByLesson: { ...s.loadingByLesson, [key]: false } } : {}));
            },

            setFeedback: async ({ threadKey, messageId, value }) => {
                const list = get().messagesByLesson[threadKey] || [];
                const msg = list.find((m) => m.id === messageId);
                if (!msg?.interactionId) return;
                const newValue: 1 | -1 | 0 = msg.feedback === value ? 0 : value;
                set((s) => ({
                    messagesByLesson: {
                        ...s.messagesByLesson,
                        [threadKey]: (s.messagesByLesson[threadKey] || []).map((m) => (m.id === messageId ? { ...m, feedback: newValue } : m)),
                    },
                }));
                try {
                    await sendTrainerFeedback(msg.interactionId, newValue);
                } catch {
                    set((s) => ({
                        messagesByLesson: {
                            ...s.messagesByLesson,
                            [threadKey]: (s.messagesByLesson[threadKey] || []).map((m) => (m.id === messageId ? { ...m, feedback: msg.feedback } : m)),
                        },
                    }));
                }
            },

            clear: (key) =>
                // Reseteo también loadingByLesson: clear es público y podría llamarse con un stream activo
                // sin cancel previo, dejando un "Pensando" colgado sin lista.
                set((s) => ({
                    messagesByLesson: { ...s.messagesByLesson, [key]: [] },
                    loadingByLesson: { ...s.loadingByLesson, [key]: false },
                })),
        }),
        {
            name: 'stan-chat-threads',
            version: 1,
            storage: createJSONStorage(() => throttledSessionStorage),
            // Persistimos SOLO el hilo (recortado). loadingByLesson es transitorio: si recargás
            // a mitad de un stream no debe quedar "Pensando" colgado sin request activa.
            partialize: (s) => ({
                messagesByLesson: Object.fromEntries(
                    Object.entries(s.messagesByLesson).map(([k, msgs]) => [k, msgs.slice(-MAX_PERSISTED_PER_THREAD)]),
                ),
            }),
            onRehydrateStorage: () => (state) => {
                if (!state) return;
                // Ningún stream sobrevive a un reload → resetear loading.
                state.loadingByLesson = {};
                // Descartar un assistant final vacío (quedó de un stream cortado por el reload).
                for (const key of Object.keys(state.messagesByLesson)) {
                    const list = state.messagesByLesson[key];
                    const last = list[list.length - 1];
                    if (last && last.role === 'assistant' && !last.content) {
                        state.messagesByLesson[key] = list.slice(0, -1);
                    }
                }
            },
        },
    ),
);
