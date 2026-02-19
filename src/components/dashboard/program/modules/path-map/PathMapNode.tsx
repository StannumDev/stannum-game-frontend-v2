import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckIcon, PlayIcon, CompassIcon, LockIcon, CrownIcon } from '@/icons';
import type { PathMapItem, NodePosition } from './pathMapUtils';
import { getLabelSide } from './pathMapUtils';
import styles from '@/components/styles/PathMap.module.css';

interface Props {
    item: PathMapItem;
    position: NodePosition;
    nodeIndex: number;
    nodeSize: number;
    isFirstActive: boolean;
    isMobile: boolean;
}

function NodeIcon({ state, type }: { state: PathMapItem['state']; type: PathMapItem['type'] }) {
    const size = 'size-6 lg:size-7';
    if (state === 'completed') return <CheckIcon className={size} />;
    if (state === 'blocked') return <LockIcon className={size} />;
    return type === 'lesson'
        ? <PlayIcon className={size} />
        : <CompassIcon className={size} />;
}

export const PathMapNode = ({ item, position, nodeIndex, nodeSize, isFirstActive, isMobile }: Props) => {
    const labelSide = getLabelSide(nodeIndex);
    const isClickable = item.state !== 'blocked';
    const isActive = item.state === 'active';

    const nodeContent = (
        <motion.div
            id={`path-node-${item.id}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={isClickable ? { scale: 1.1, transition: { duration: 0.15 } } : undefined}
            whileTap={isClickable ? { scale: 0.95, transition: { duration: 0.1 } } : undefined}
            transition={{ type: 'spring', bounce: 0, delay: nodeIndex * 0.05 }}
            className={`rounded-full flex justify-center items-center ${isFirstActive ? styles.activeGlow : ''} ${styles.node3d} ${
                item.state === 'completed'
                    ? styles.nodeCompleted
                    : item.state === 'active'
                        ? styles.nodeActive
                        : styles.nodeBlocked
            }`}
            style={{ width: nodeSize, height: nodeSize }}
        >
            <NodeIcon state={item.state} type={item.type} />
        </motion.div>
    );

    const labelContent = (
        <>
            <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] lg:text-xs font-semibold uppercase tracking-widest whitespace-nowrap text-stannum">
                    {item.type === 'lesson' ? `Lección ${item.index}` : `Instrucción ${item.index}`}
                </span>
                {item.rewardXP && (
                    <span className="flex items-center gap-0.5 text-[10px] lg:text-[11px] font-bold text-stannum whitespace-nowrap bg-stannum/10 rounded-full px-1.5">
                        <CrownIcon className="size-2.5 relative -top-px" />
                        +{item.rewardXP} XP
                    </span>
                )}
            </div>
            <p className="text-xs lg:text-sm font-semibold leading-tight text-white">
                {item.title}
            </p>
        </>
    );

    const labelPositionClass = `absolute top-1/2 -translate-y-1/2 ${labelSide === 'left' ? 'right-full mr-3' : 'left-full ml-3'}`;
    const labelStyleClass = 'w-max bg-card/90 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-card-light/15';

    const label = isActive ? (
        <motion.div
            initial={{ opacity: 0, x: labelSide === 'left' ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', bounce: 0, delay: nodeIndex * 0.05 + 0.1 }}
            className={`${labelPositionClass} ${labelStyleClass}`}
            style={{ maxWidth: isMobile ? 200 : 280 }}
        >
            {labelContent}
        </motion.div>
    ) : item.state === 'completed' ? (
        <div
            className={`${labelPositionClass} ${labelStyleClass} opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none`}
            style={{ maxWidth: isMobile ? 200 : 280 }}
        >
            {labelContent}
        </div>
    ) : null;

    return (
        <div
            className={`absolute ${isActive ? 'z-20' : 'z-10'}`}
            style={{
                left: position.x - nodeSize / 2,
                top: position.y - nodeSize / 2,
            }}
        >
            <div className="relative group">
                {isClickable ? (
                    <Link href={item.href} className="block cursor-pointer">
                        {nodeContent}
                    </Link>
                ) : (
                    <div className="cursor-not-allowed">{nodeContent}</div>
                )}
                {label}
            </div>
        </div>
    );
};
