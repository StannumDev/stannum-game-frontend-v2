'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const DISMISSED_LIMIT_PER_TYPE = 200;
const ERROR_THROTTLE_WINDOW_MS = 5 * 60 * 1000;

export interface PendingFeedback {
    id: string;
    programId?: string | null;
}

interface FeedbackCooldownState {
    dismissedLessonFeedbacks: string[];
    dismissedInstructionFeedbacks: string[];
    pendingLessonFeedbacks: PendingFeedback[];
    pendingInstructionFeedbacks: PendingFeedback[];
    pendingOnboardingFeedback: boolean;
    lastNpsPromptedAt: number | null;
    lastNpsPostponedAt: number | null;
    lastOnboardingFeedbackAt: number | null;
    lastErrorReportedAt: number | null;

    markLessonDismissed: (lessonId: string) => void;
    markInstructionDismissed: (instructionId: string) => void;
    isLessonDismissed: (lessonId: string) => boolean;
    isInstructionDismissed: (instructionId: string) => boolean;

    enqueueLessonFeedback: (lessonId: string, programId?: string | null) => void;
    enqueueInstructionFeedback: (instructionId: string, programId?: string | null) => void;
    dequeueLessonFeedback: (lessonId: string) => void;
    dequeueInstructionFeedback: (instructionId: string) => void;

    markNpsPrompted: () => void;
    postponeNps: () => void;
    triggerOnboardingFeedback: () => void;
    clearOnboardingFeedback: () => void;
    markOnboardingPrompted: () => void;

    canReportError: () => boolean;
    markErrorReported: () => void;

    reset: () => void;
}

const trimList = (list: string[], limit: number): string[] => {
    if (list.length <= limit) return list;
    return list.slice(list.length - limit);
};

export const useFeedbackCooldownStore = create<FeedbackCooldownState>()(
    persist(
        (set, get) => ({
            dismissedLessonFeedbacks: [],
            dismissedInstructionFeedbacks: [],
            pendingLessonFeedbacks: [],
            pendingInstructionFeedbacks: [],
            pendingOnboardingFeedback: false,
            lastNpsPromptedAt: null,
            lastNpsPostponedAt: null,
            lastOnboardingFeedbackAt: null,
            lastErrorReportedAt: null,

            markLessonDismissed: (lessonId) => set((state) => {
                if (!lessonId || state.dismissedLessonFeedbacks.includes(lessonId)) return state;
                return {
                    dismissedLessonFeedbacks: trimList([...state.dismissedLessonFeedbacks, lessonId], DISMISSED_LIMIT_PER_TYPE),
                };
            }),

            markInstructionDismissed: (instructionId) => set((state) => {
                if (!instructionId || state.dismissedInstructionFeedbacks.includes(instructionId)) return state;
                return {
                    dismissedInstructionFeedbacks: trimList([...state.dismissedInstructionFeedbacks, instructionId], DISMISSED_LIMIT_PER_TYPE),
                };
            }),

            isLessonDismissed: (lessonId) => {
                if (!lessonId) return false;
                return get().dismissedLessonFeedbacks.includes(lessonId);
            },

            isInstructionDismissed: (instructionId) => {
                if (!instructionId) return false;
                return get().dismissedInstructionFeedbacks.includes(instructionId);
            },

            enqueueLessonFeedback: (lessonId, programId) => set((state) => {
                if (!lessonId || state.dismissedLessonFeedbacks.includes(lessonId)) return state;
                if (state.pendingLessonFeedbacks.some(p => p.id === lessonId)) return state;
                return {
                    pendingLessonFeedbacks: [...state.pendingLessonFeedbacks, { id: lessonId, programId: programId || null }].slice(-20),
                };
            }),

            enqueueInstructionFeedback: (instructionId, programId) => set((state) => {
                if (!instructionId || state.dismissedInstructionFeedbacks.includes(instructionId)) return state;
                if (state.pendingInstructionFeedbacks.some(p => p.id === instructionId)) return state;
                return {
                    pendingInstructionFeedbacks: [...state.pendingInstructionFeedbacks, { id: instructionId, programId: programId || null }].slice(-20),
                };
            }),

            dequeueLessonFeedback: (lessonId) => set((state) => ({
                pendingLessonFeedbacks: state.pendingLessonFeedbacks.filter(p => p.id !== lessonId),
            })),

            dequeueInstructionFeedback: (instructionId) => set((state) => ({
                pendingInstructionFeedbacks: state.pendingInstructionFeedbacks.filter(p => p.id !== instructionId),
            })),

            markNpsPrompted: () => set({ lastNpsPromptedAt: Date.now(), lastNpsPostponedAt: null }),
            postponeNps: () => set({ lastNpsPostponedAt: Date.now() }),
            triggerOnboardingFeedback: () => set((state) => {
                if (state.lastOnboardingFeedbackAt) return state;
                return { pendingOnboardingFeedback: true };
            }),
            clearOnboardingFeedback: () => set({ pendingOnboardingFeedback: false }),
            markOnboardingPrompted: () => set({ lastOnboardingFeedbackAt: Date.now(), pendingOnboardingFeedback: false }),

            canReportError: () => {
                const last = get().lastErrorReportedAt;
                if (!last) return true;
                return Date.now() - last >= ERROR_THROTTLE_WINDOW_MS;
            },
            markErrorReported: () => set({ lastErrorReportedAt: Date.now() }),

            reset: () => set({
                dismissedLessonFeedbacks: [],
                dismissedInstructionFeedbacks: [],
                pendingLessonFeedbacks: [],
                pendingInstructionFeedbacks: [],
                pendingOnboardingFeedback: false,
                lastNpsPromptedAt: null,
                lastNpsPostponedAt: null,
                lastOnboardingFeedbackAt: null,
                lastErrorReportedAt: null,
            }),
        }),
        {
            name: 'stannum-feedback-cooldown',
            storage: createJSONStorage(() => {
                if (typeof window !== 'undefined') return localStorage;
                const noop: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> = {
                    getItem: () => null,
                    setItem: () => {},
                    removeItem: () => {},
                };
                return noop as Storage;
            }),
            partialize: (state) => ({
                dismissedLessonFeedbacks: state.dismissedLessonFeedbacks,
                dismissedInstructionFeedbacks: state.dismissedInstructionFeedbacks,
                pendingLessonFeedbacks: state.pendingLessonFeedbacks,
                pendingInstructionFeedbacks: state.pendingInstructionFeedbacks,
                pendingOnboardingFeedback: state.pendingOnboardingFeedback,
                lastNpsPromptedAt: state.lastNpsPromptedAt,
                lastNpsPostponedAt: state.lastNpsPostponedAt,
                lastOnboardingFeedbackAt: state.lastOnboardingFeedbackAt,
            }),
        }
    )
);
