'use client'

import { type ReactNode, useRef, useState, useCallback, useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';

interface Props {
    children: ReactNode;
    text: string;
    className?: string;
    delay?: number;
}

export const Tooltip = ({ children, text, className, delay = 400 }: Props) => {
    const triggerRef = useRef<HTMLSpanElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

    const show = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            if (!triggerRef.current) return;
            const rect = triggerRef.current.getBoundingClientRect();
            setPos({
                top: rect.top - 4,
                left: rect.left + rect.width / 2,
            });
        }, delay);
    }, [delay]);

    const hide = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setPos(null);
    }, []);

    useEffect(() => {
        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    }, []);

    return (
        <span
            ref={triggerRef}
            className={`w-fit inline-flex ${className ?? ''}`}
            onMouseEnter={show}
            onMouseLeave={hide}
        >
            {children}
            <AnimatePresence>
                {pos && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed z-[9999] -translate-x-1/2 -translate-y-full px-3 py-1.5 bg-card-light/90 border border-card-lighter rounded-lg text-xs text-white whitespace-nowrap pointer-events-none"
                        style={{ top: pos.top, left: pos.left }}
                    >
                        {text}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-card-lighter" />
                    </m.div>
                )}
            </AnimatePresence>
        </span>
    );
};
