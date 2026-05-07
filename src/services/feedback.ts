import api from "@/lib/api";

export type FeedbackType = "lesson" | "instruction" | "nps" | "onboarding";
export type FeedbackReaction = "up" | "down";

export interface FeedbackContext {
    lessonId?: string | null;
    instructionId?: string | null;
    programId?: string | null;
    route?: string | null;
    appVersion?: string | null;
    userAgent?: string | null;
}

export interface FeedbackPayload {
    type: FeedbackType;
    rating?: number | null;
    reaction?: FeedbackReaction | null;
    secondaryReactions?: {
        evaluationFair?: FeedbackReaction | null;
        instructionsClear?: FeedbackReaction | null;
    };
    message?: string | null;
    requestId?: string | null;
    context?: FeedbackContext;
}

export interface ErrorFeedbackPayload {
    requestId?: string | null;
    userId?: string | null;
    context?: FeedbackContext;
    errorPayload: {
        stack?: string | null;
        message?: string | null;
        route?: string | null;
        statusCode?: number | null;
    };
}

const FEEDBACK_BASE = "/feedback";

export const submitFeedback = async (payload: FeedbackPayload): Promise<{ success: boolean; idempotent?: boolean; data?: { id: string; type: string; createdAt: string } | null }> => {
    const response = await api.post(FEEDBACK_BASE, payload, { timeout: 8_000 });
    return response.data;
};

export const submitErrorFeedback = async (payload: ErrorFeedbackPayload): Promise<void> => {
    try {
        await fetch("/api/feedback/error", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            keepalive: true,
        });
    } catch {
        // silent: error capture must not throw on its own failure
    }
};

export const generateRequestId = (): string => {
    if (typeof globalThis !== "undefined" && globalThis.crypto?.randomUUID) {
        return globalThis.crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
};
