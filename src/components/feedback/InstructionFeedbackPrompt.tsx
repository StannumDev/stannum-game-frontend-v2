'use client';

import { useEffect, useState } from 'react';
import { FeedbackModal, type FeedbackSubmissionPayload } from './FeedbackModal';
import { useFeedbackCooldownStore } from '@/stores/feedbackCooldownStore';
import { useModalQueueStore } from '@/stores/modalQueueStore';
import { submitFeedback, generateRequestId } from '@/services/feedback';

const MODAL_ID = 'feedback_instruction';
const MODAL_PRIORITY = 30;
const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || 'unknown';

export const InstructionFeedbackPrompt = () => {
    const pending = useFeedbackCooldownStore(s => s.pendingInstructionFeedbacks[0] || null);
    const dequeue = useFeedbackCooldownStore(s => s.dequeueInstructionFeedback);
    const markDismissed = useFeedbackCooldownStore(s => s.markInstructionDismissed);
    const isMyTurn = useModalQueueStore(s => s.queue[0]?.id === MODAL_ID);
    const request = useModalQueueStore(s => s.request);
    const release = useModalQueueStore(s => s.release);

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!pending) return;
        const t = setTimeout(() => request(MODAL_ID, MODAL_PRIORITY), 600);
        return () => {
            clearTimeout(t);
            release(MODAL_ID);
        };
    }, [pending, request, release]);

    useEffect(() => {
        if (pending && isMyTurn) setShow(true);
    }, [pending, isMyTurn]);

    if (!pending) return null;

    const handleClose = () => {
        setShow(false);
        markDismissed(pending.id);
        dequeue(pending.id);
        release(MODAL_ID);
    };

    const handleSubmit = async (payload: FeedbackSubmissionPayload) => {
        try {
            await submitFeedback({
                type: 'instruction',
                secondaryReactions: payload.secondaryReactions,
                message: payload.message ?? null,
                requestId: generateRequestId(),
                context: {
                    instructionId: pending.id,
                    programId: pending.programId,
                    route: typeof window !== 'undefined' ? window.location.pathname : null,
                    appVersion: APP_VERSION,
                    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
                },
            });
        } catch (e) {
            if (process.env.NEXT_PUBLIC_ENV === 'development') console.error('[InstructionFeedbackPrompt] submit error:', e);
        } finally {
            markDismissed(pending.id);
            dequeue(pending.id);
        }
    };

    return (
        <FeedbackModal
            show={show}
            onClose={handleClose}
            onSubmit={handleSubmit}
            type="instruction"
            variant="dual-reaction"
            title="Instrucción"
            question="Sobre la corrección de esta instrucción..."
            questionA="¿La evaluación de la IA fue justa?"
            questionB="¿Las instrucciones quedaron claras?"
            followUpPlaceholder="¿Qué le falta o le sobra? (opcional)"
        />
    );
};
