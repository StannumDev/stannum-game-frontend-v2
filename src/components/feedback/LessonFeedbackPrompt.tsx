'use client';

import { useEffect, useState } from 'react';
import { FeedbackModal, type FeedbackSubmissionPayload } from './FeedbackModal';
import { useFeedbackCooldownStore } from '@/stores/feedbackCooldownStore';
import { useModalQueueStore } from '@/stores/modalQueueStore';
import { submitFeedback, generateRequestId } from '@/services/feedback';

const MODAL_ID = 'feedback_lesson';
const MODAL_PRIORITY = 30;
const POST_CELEBRATION_DELAY_MS = 2500;
const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || 'unknown';

export const LessonFeedbackPrompt = () => {
    const pending = useFeedbackCooldownStore(s => s.pendingLessonFeedbacks[0] || null);
    const celebrationActive = useFeedbackCooldownStore(s => s.lessonCelebrationActive);
    const dequeue = useFeedbackCooldownStore(s => s.dequeueLessonFeedback);
    const markDismissed = useFeedbackCooldownStore(s => s.markLessonDismissed);
    const markShown = useFeedbackCooldownStore(s => s.markLessonFeedbackShown);
    const isMyTurn = useModalQueueStore(s => s.queue[0]?.id === MODAL_ID);
    const request = useModalQueueStore(s => s.request);
    const release = useModalQueueStore(s => s.release);

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!pending) return;
        if (celebrationActive) return;
        const t = setTimeout(() => request(MODAL_ID, MODAL_PRIORITY), POST_CELEBRATION_DELAY_MS);
        return () => {
            clearTimeout(t);
            release(MODAL_ID);
        };
    }, [pending, celebrationActive, request, release]);

    useEffect(() => {
        if (pending && isMyTurn && !show) {
            setShow(true);
            markShown();
        }
    }, [pending, isMyTurn, show, markShown]);

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
                type: 'lesson',
                reaction: payload.reaction ?? null,
                message: payload.message ?? null,
                requestId: generateRequestId(),
                context: {
                    lessonId: pending.id,
                    programId: pending.programId,
                    route: typeof window !== 'undefined' ? window.location.pathname : null,
                    appVersion: APP_VERSION,
                    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
                },
            });
        } catch (e) {
            if (process.env.NEXT_PUBLIC_ENV === 'development') console.error('[LessonFeedbackPrompt] submit error:', e);
        }
    };

    return (
        <FeedbackModal
            show={show}
            onClose={handleClose}
            onSubmit={handleSubmit}
            type="lesson"
            variant="quick-reaction"
            title="Lección"
            question="¿Esta lección te ayudó a entender el tema?"
        />
    );
};
