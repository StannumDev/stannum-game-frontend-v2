'use client';

import { useEffect, useState } from 'react';
import { useModalQueueStore } from '@/stores/modalQueueStore';

interface Options {
    modalId: string;
    priority: number;
    enabled: boolean;
    delayMs?: number;
}

export const useRequestFeedback = ({ modalId, priority, enabled, delayMs = 0 }: Options) => {
    const isMyTurn = useModalQueueStore(s => s.queue[0]?.id === modalId);
    const request = useModalQueueStore(s => s.request);
    const release = useModalQueueStore(s => s.release);

    const [wantsToShow, setWantsToShow] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!enabled) return;
        const timer = setTimeout(() => {
            setWantsToShow(true);
            request(modalId, priority);
        }, delayMs);
        return () => clearTimeout(timer);
    }, [enabled, modalId, priority, delayMs, request]);

    useEffect(() => {
        if (wantsToShow && isMyTurn) setShowModal(true);
    }, [wantsToShow, isMyTurn]);

    const close = () => {
        setShowModal(false);
        setWantsToShow(false);
        release(modalId);
    };

    return { showModal, close };
};
