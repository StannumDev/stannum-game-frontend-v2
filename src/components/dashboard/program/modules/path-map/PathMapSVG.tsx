'use client';

import { useRef, useEffect, useState } from 'react';
import { generateSVGPath } from './pathMapUtils';
import type { NodePosition } from './pathMapUtils';

interface Props {
    positions: NodePosition[];
    lastCompletedIndex: number;
    totalHeight: number;
    containerWidth: number;
}

export const PathMapSVG = ({ positions, lastCompletedIndex, totalHeight, containerWidth }: Props) => {
    const bgRef = useRef<SVGPathElement>(null);
    const progressRef = useRef<SVGPathElement>(null);
    const [totalLength, setTotalLength] = useState(0);
    const [progressLength, setProgressLength] = useState(0);

    const pathData = generateSVGPath(positions);

    useEffect(() => {
        const bgEl = bgRef.current;
        if (!bgEl) return;
        const len = bgEl.getTotalLength();
        setTotalLength(len);
    }, [pathData]);

    useEffect(() => {
        if (!totalLength || lastCompletedIndex < 0) {
            setProgressLength(0);
            return;
        }
        const segmentCount = positions.length - 1;
        if (segmentCount <= 0) {
            setProgressLength(totalLength);
            return;
        }
        setProgressLength((lastCompletedIndex / segmentCount) * totalLength);
    }, [positions, lastCompletedIndex, totalLength]);

    if (!pathData) return null;

    const dashPattern = '10 8';

    return (
        <svg
            className="absolute top-0 left-0 pointer-events-none"
            width={containerWidth}
            height={totalHeight}
            fill="none"
        >
            <path
                ref={bgRef}
                d={pathData}
                stroke="#333333"
                strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray={dashPattern}
                fill="none"
            />
            {progressLength > 0 && totalLength > 0 && (
                <g>
                    <defs>
                        <mask id="progress-mask">
                            <path
                                ref={progressRef}
                                d={pathData}
                                stroke="white"
                                strokeWidth={6}
                                fill="none"
                                strokeDasharray={totalLength}
                                strokeDashoffset={totalLength - progressLength}
                                style={{ transition: 'stroke-dashoffset 1.2s ease-in-out 0.3s' }}
                            />
                        </mask>
                    </defs>
                    <path
                        d={pathData}
                        stroke="#00FFCC"
                        strokeWidth={4}
                        strokeLinecap="round"
                        strokeDasharray={dashPattern}
                        fill="none"
                        mask="url(#progress-mask)"
                    />
                </g>
            )}
        </svg>
    );
};
