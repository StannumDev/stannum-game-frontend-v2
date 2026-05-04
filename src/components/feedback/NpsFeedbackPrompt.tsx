'use client';

import { useEffect, useMemo, useState } from 'react';
import { FeedbackModal, type FeedbackSubmissionPayload } from './FeedbackModal';
import { useFeedbackCooldownStore } from '@/stores/feedbackCooldownStore';
import { useModalQueueStore } from '@/stores/modalQueueStore';
import { useUserStore } from '@/stores/userStore';
import { submitFeedback, generateRequestId } from '@/services/feedback';

const MODAL_ID = 'feedback_nps';
const MODAL_PRIORITY = 50;
const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || 'unknown';

const NPS_INTERVAL_MS = 30 * 24 * 60 * 60 * 1000;
const POSTPONE_MS = 7 * 24 * 60 * 60 * 1000;
const MIN_LESSONS_COMPLETED = 10;
const SHOW_DELAY_MS = 8_000;

const isMobile = (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
        return window.matchMedia('(max-width: 768px)').matches;
    } catch {
        return false;
    }
};

export const NpsFeedbackPrompt = () => {
    const user = useUserStore(s => s.user);
    const lastNpsPromptedAt = useFeedbackCooldownStore(s => s.lastNpsPromptedAt);
    const lastNpsPostponedAt = useFeedbackCooldownStore(s => s.lastNpsPostponedAt);
    const markPrompted = useFeedbackCooldownStore(s => s.markNpsPrompted);
    const postpone = useFeedbackCooldownStore(s => s.postponeNps);

    const isMyTurn = useModalQueueStore(s => s.queue[0]?.id === MODAL_ID);
    const request = useModalQueueStore(s => s.request);
    const release = useModalQueueStore(s => s.release);

    const [show, setShow] = useState(false);
    const [requested, setRequested] = useState(false);

    const totalLessonsCompleted = useMemo(() => {
        if (!user?.programs) return 0;
        return Object.values(user.programs).reduce((acc, prog) => acc + (prog?.lessonsCompleted?.length || 0), 0);
    }, [user?.programs]);

    const eligible = useMemo(() => {
        if (!user) return false;
        if (totalLessonsCompleted < MIN_LESSONS_COMPLETED) return false;

        const serverLastAt = user.feedbackState?.lastNpsAt ? new Date(user.feedbackState.lastNpsAt).getTime() : null;
        const localLastAt = lastNpsPromptedAt;
        const lastAt = Math.max(serverLastAt || 0, localLastAt || 0);
        if (lastAt && Date.now() - lastAt < NPS_INTERVAL_MS) return false;

        if (lastNpsPostponedAt && Date.now() - lastNpsPostponedAt < POSTPONE_MS) return false;

        return true;
    }, [user, totalLessonsCompleted, lastNpsPromptedAt, lastNpsPostponedAt]);

    useEffect(() => {
        if (!eligible || requested) return;
        const timer = setTimeout(() => {
            if (!eligible) return;
            const neverPromptedNorPostponed = !lastNpsPromptedAt && !lastNpsPostponedAt;
            if (neverPromptedNorPostponed && isMobile()) {
                postpone();
                return;
            }
            request(MODAL_ID, MODAL_PRIORITY);
            setRequested(true);
        }, SHOW_DELAY_MS);
        return () => clearTimeout(timer);
    }, [eligible, requested, lastNpsPromptedAt, lastNpsPostponedAt, postpone, request]);

    useEffect(() => {
        if (requested && isMyTurn) setShow(true);
    }, [requested, isMyTurn]);

    useEffect(() => {
        return () => { if (requested) release(MODAL_ID); };
    }, [requested, release]);

    if (!eligible) return null;

    const handleClose = () => {
        setShow(false);
        markPrompted();
        release(MODAL_ID);
        setRequested(false);
    };

    const handleSubmit = async (payload: FeedbackSubmissionPayload) => {
        try {
            await submitFeedback({
                type: 'nps',
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
            if (process.env.NEXT_PUBLIC_ENV === 'development') console.error('[NpsFeedbackPrompt] submit error:', e);
        } finally {
            markPrompted();
        }
    };

    return (
        <FeedbackModal
            show={show}
            onClose={handleClose}
            onSubmit={handleSubmit}
            type="nps"
            variant="nps"
            title="¿Qué tal vamos?"
            question="¿Qué tan probable es que recomiendes Stannum a un amigo o colega?"
        />
    );
};
