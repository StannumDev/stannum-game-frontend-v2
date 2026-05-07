'use client';

import { useEffect, useState } from 'react';
import { FeedbackModal, type FeedbackSubmissionPayload } from './FeedbackModal';
import { useFeedbackCooldownStore } from '@/stores/feedbackCooldownStore';
import { useModalQueueStore } from '@/stores/modalQueueStore';
import { useUserStore } from '@/stores/userStore';
import { submitFeedback, generateRequestId } from '@/services/feedback';

const MODAL_ID = 'feedback_onboarding';
const MODAL_PRIORITY = 25;
const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || 'unknown';

export const OnboardingFeedbackPrompt = () => {
    const pending = useFeedbackCooldownStore(s => s.pendingOnboardingFeedback);
    const localLastAt = useFeedbackCooldownStore(s => s.lastOnboardingFeedbackAt);
    const markPrompted = useFeedbackCooldownStore(s => s.markOnboardingPrompted);
    const clearPending = useFeedbackCooldownStore(s => s.clearOnboardingFeedback);
    const serverLastAt = useUserStore(s => s.user?.feedbackState?.lastOnboardingFeedbackAt);

    const isMyTurn = useModalQueueStore(s => s.queue[0]?.id === MODAL_ID);
    const request = useModalQueueStore(s => s.request);
    const release = useModalQueueStore(s => s.release);

    const [show, setShow] = useState(false);

    const alreadyAnswered = !!localLastAt || !!serverLastAt;
    const shouldShow = pending && !alreadyAnswered;

    useEffect(() => {
        if (pending && alreadyAnswered) clearPending();
    }, [pending, alreadyAnswered, clearPending]);

    useEffect(() => {
        if (!shouldShow) return;
        request(MODAL_ID, MODAL_PRIORITY);
        return () => release(MODAL_ID);
    }, [shouldShow, request, release]);

    useEffect(() => {
        if (shouldShow && isMyTurn) setShow(true);
    }, [shouldShow, isMyTurn]);

    if (!shouldShow) return null;

    const handleClose = () => {
        setShow(false);
        markPrompted();
        release(MODAL_ID);
    };

    const handleSubmit = async (payload: FeedbackSubmissionPayload) => {
        try {
            await submitFeedback({
                type: 'onboarding',
                rating: payload.rating ?? null,
                message: payload.message ?? null,
                requestId: generateRequestId(),
                context: {
                    route: typeof window !== 'undefined' ? window.location.pathname : null,
                    appVersion: APP_VERSION,
                    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
                },
            });
        } catch (e) {
            if (process.env.NEXT_PUBLIC_ENV === 'development') console.error('[OnboardingFeedbackPrompt] submit error:', e);
        }
    };

    return (
        <FeedbackModal
            show={show}
            onClose={handleClose}
            onSubmit={handleSubmit}
            type="onboarding"
            variant="rating-1-5"
            title="Bienvenida"
            question="¿Qué tan claro te quedó cómo usar Stannum?"
        />
    );
};
