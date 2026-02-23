'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { ArrowRightIcon } from '@/icons';
import { PathMapSVG } from './PathMapSVG';
import { PathMapNode } from './PathMapNode';
import { calculateNodePositions, calculateTotalHeight, getLayoutConstants } from './pathMapUtils';
import type { PathMapItem } from './pathMapUtils';
import styles from '@/components/styles/PathMap.module.css';

interface Props {
    items: PathMapItem[];
    nextModuleName?: string;
    nextModuleHref?: string;
    isNextModuleAvailable?: boolean;
}

export const PathMap = ({ items, nextModuleName, nextModuleHref, isNextModuleAvailable }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const updateLayout = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.clientWidth);
            }
            setIsMobile(window.innerWidth < 1024);
        };

        updateLayout();

        const observer = new ResizeObserver(updateLayout);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!containerWidth) return;
        const firstActive = items.find(i => i.state === 'active');
        if (firstActive) {
            const el = document.getElementById(`path-node-${firstActive.id}`);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 400);
            }
        }
    }, [containerWidth, items]);

    if (!containerWidth) {
        return <div ref={containerRef} className="w-full min-h-[200px]" />;
    }

    const totalNodes = nextModuleHref ? items.length + 1 : items.length;
    const positions = calculateNodePositions(totalNodes, containerWidth, isMobile);
    const totalHeight = calculateTotalHeight(totalNodes, isMobile);
    const { nodeSize } = getLayoutConstants(isMobile);

    let lastProgressIndex = -1;
    for (let i = items.length - 1; i >= 0; i--) {
        if (items[i].state === 'completed' || items[i].state === 'active') {
            lastProgressIndex = i;
            break;
        }
    }

    const firstActiveId = items.find(i => i.state === 'active')?.id;

    return (
        <div ref={containerRef} className="relative w-full mx-auto" style={{ height: totalHeight }}>
            <PathMapSVG
                positions={positions}
                lastCompletedIndex={lastProgressIndex}
                totalHeight={totalHeight}
                containerWidth={containerWidth}
            />
            {items.map((item, i) => (
                <PathMapNode
                    key={item.id}
                    item={item}
                    position={positions[i]}
                    nodeIndex={i}
                    nodeSize={nodeSize}
                    isFirstActive={item.id === firstActiveId}
                    isMobile={isMobile}
                />
            ))}
            {nextModuleHref && positions[items.length] && (
                <div
                    className="absolute z-10"
                    style={{
                        left: positions[items.length].x - nodeSize / 2,
                        top: positions[items.length].y - nodeSize / 2,
                    }}
                >
                    <div className="relative">
                        {isNextModuleAvailable ? (
                            <Link href={nextModuleHref}>
                                <m.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
                                    whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                                    transition={{ type: 'spring', bounce: 0, delay: items.length * 0.05 }}
                                    className={`rounded-full flex justify-center items-center ${styles.node3d} ${styles.nodeCompleted}`}
                                    style={{ width: nodeSize, height: nodeSize }}
                                >
                                    <ArrowRightIcon className="size-5 lg:size-6" />
                                </m.div>
                            </Link>
                        ) : (
                            <m.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', bounce: 0, delay: items.length * 0.05 }}
                                className={`rounded-full flex justify-center items-center ${styles.node3d} ${styles.nodeBlocked}`}
                                style={{ width: nodeSize, height: nodeSize }}
                            >
                                <ArrowRightIcon className="size-5 lg:size-6" />
                            </m.div>
                        )}
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ type: 'spring', bounce: 0, delay: items.length * 0.05 + 0.1 }}
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 text-center"
                        >
                            <span className="text-[11px] lg:text-xs font-semibold uppercase tracking-widest text-card-lightest whitespace-nowrap">
                                Siguiente módulo
                            </span>
                            {nextModuleName && (
                                <p className="text-xs lg:text-sm font-semibold text-card-lightest/70">
                                    {nextModuleName}
                                </p>
                            )}
                        </m.div>
                    </div>
                </div>
            )}
        </div>
    );
};
