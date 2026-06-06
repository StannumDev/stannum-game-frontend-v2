import api from "@/lib/api";

const TRAINER_URL = process.env.NEXT_PUBLIC_API_TRAINER_URL || "/trainer";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL;

export interface TrainerCitation {
    lessonId: string;
    title: string;
    startSec: number;
    snippet?: string; // extracto de lo que se dice en ese minuto (para explicar la cita)
    muxPlaybackId?: string | null; // para la miniatura (frame del minuto citado)
}

export interface LessonChapter {
    title: string;   // el topic curado
    startSec: number; // minuto donde arranca en el video
}

export interface TrainerHistoryItem {
    role: "user" | "assistant";
    content: string;
}

export interface TrainerAnswer {
    answer: string;
    citations: TrainerCitation[];
}

export const askTrainer = async (
    question: string,
    programId: string,
    lessonId: string | null,
    history: TrainerHistoryItem[] = []
): Promise<TrainerAnswer> => {
    const response = await api.post(`${TRAINER_URL}/ask`, { question, programId, lessonId, history });
    if (!response?.data?.success) throw new Error("Unexpected response structure");
    const { answer, citations = [] } = response.data.data || {};
    return { answer, citations };
};

const refreshToken = async () => {
    await fetch(`${API_URL}${AUTH_URL}/refresh-token`, { method: "POST", credentials: "include" });
};

/**
 * Versión streaming (SSE sobre fetch POST). Llama onDelta por cada token y
 * resuelve con las citas al cerrar. Reintenta una vez tras refrescar el token si da 401.
 */
export const askTrainerStream = async (
    question: string,
    programId: string | null,
    lessonId: string | null,
    history: TrainerHistoryItem[],
    opts: { onDelta: (text: string) => void; signal?: AbortSignal }
): Promise<{ citations: TrainerCitation[]; interactionId: string | null }> => {
    // userName ya NO se manda: el backend lo deriva de req.userAuth (cierra inyección por body).
    const doFetch = () =>
        fetch(`${API_URL}${TRAINER_URL}/ask/stream`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, programId, lessonId, history }),
            signal: opts.signal,
        });

    let res = await doFetch();
    if (res.status === 401) {
        await refreshToken();
        res = await doFetch();
    }
    if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let citations: TrainerCitation[] = [];
    let interactionId: string | null = null;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";
        for (const evt of events) {
            const dataLine = evt.split("\n").find((l) => l.startsWith("data:"));
            if (!dataLine) continue;
            const payload = dataLine.slice(5).trim();
            if (!payload) continue;
            let parsed: { type: string; text?: string; citations?: TrainerCitation[]; interactionId?: string | null; message?: string };
            try {
                parsed = JSON.parse(payload);
            } catch {
                continue;
            }
            if (parsed.type === "delta" && parsed.text) opts.onDelta(parsed.text);
            else if (parsed.type === "done") { citations = parsed.citations || []; interactionId = parsed.interactionId ?? null; }
            else if (parsed.type === "error") throw new Error(parsed.message || "stream error");
        }
    }
    return { citations, interactionId };
};

export const sendTrainerFeedback = async (interactionId: string, value: 1 | -1 | 0): Promise<void> => {
    await api.post(`${TRAINER_URL}/feedback`, { interactionId, value });
};

// Línea de tiempo por topics de la lección (capítulos clickeables que saltan al minuto).
export const getLessonChapters = async (programId: string, lessonId: string): Promise<LessonChapter[]> => {
    const response = await api.get(`${TRAINER_URL}/chapters`, {
        params: { programId: programId.toLowerCase(), lessonId },
    });
    return response?.data?.data?.chapters ?? [];
};
