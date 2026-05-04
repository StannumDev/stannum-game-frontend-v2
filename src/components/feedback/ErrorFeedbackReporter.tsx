'use client';

import { useEffect, useRef } from 'react';
import { submitErrorFeedback, generateRequestId } from '@/services/feedback';
import { useFeedbackCooldownStore } from '@/stores/feedbackCooldownStore';
import { useUserStore } from '@/stores/userStore';

interface Props {
    error: Error & { digest?: string };
    boundary: 'root' | 'dashboard';
}

const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || 'unknown';

export const ErrorFeedbackReporter = ({ error, boundary }: Props) => {
    const reported = useRef(false);
    const userId = useUserStore(s => s.user?.id);
    const canReportError = useFeedbackCooldownStore(s => s.canReportError);
    const markErrorReported = useFeedbackCooldownStore(s => s.markErrorReported);

    useEffect(() => {
        if (reported.current) return;
        reported.current = true;

        if (!canReportError()) return;

        if (error?.name === 'ChunkLoadError' || error?.message?.includes('Loading chunk')) {
            return;
        }

        const route = typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : null;
        const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : null;

        markErrorReported();

        submitErrorFeedback({
            requestId: generateRequestId(),
            userId: userId || null,
            context: {
                route,
                appVersion: APP_VERSION,
                userAgent,
            },
            errorPayload: {
                stack: error?.stack ? error.stack.slice(0, 4000) : null,
                message: error?.message ? error.message.slice(0, 500) : null,
                route,
                statusCode: null,
            },
        });

        if (process.env.NEXT_PUBLIC_ENV === 'development') {
            console.warn(`[ErrorFeedbackReporter] reported error from ${boundary} boundary`);
        }
    }, [error, boundary, userId, canReportError, markErrorReported]);

    return null;
};
