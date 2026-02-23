'use client'

import { useEffect } from 'react';
import { m, useMotionValue, useTransform, animate } from 'framer-motion';

interface Props {
    target: number;
    duration?: number;
    className?: string;
}

export const AnimatedCounter = ({ target, duration = 1.5, className }: Props) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => Math.round(v));

    useEffect(() => {
        const controls = animate(count, target, { duration, ease: 'easeOut' });
        return () => controls.stop();
    }, [target, duration, count]);

    return <m.span className={className}>{rounded}</m.span>;
};
