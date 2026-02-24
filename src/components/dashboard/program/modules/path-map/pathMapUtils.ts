export type NodeState = 'completed' | 'active' | 'blocked';

export interface PathMapItem {
    id: string;
    type: 'lesson' | 'instruction' | 'chest';
    index: number;
    title: string;
    href: string;
    state: NodeState;
    rewardXP?: number;
    chestRarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface NodePosition {
    x: number;
    y: number;
}

const MOBILE_NODE_SIZE = 52;
const MOBILE_VERTICAL_GAP = 90;
const MOBILE_AMPLITUDE = 0.35;

const DESKTOP_NODE_SIZE = 72;
const DESKTOP_VERTICAL_GAP = 110;
const DESKTOP_AMPLITUDE = 0.35;

export function getLayoutConstants(isMobile: boolean, containerWidth?: number) {
    const mobileAmplitude = containerWidth ? containerWidth * MOBILE_AMPLITUDE : 80;
    const desktopAmplitude = containerWidth ? containerWidth * DESKTOP_AMPLITUDE : 200;
    return {
        nodeSize: isMobile ? MOBILE_NODE_SIZE : DESKTOP_NODE_SIZE,
        verticalGap: isMobile ? MOBILE_VERTICAL_GAP : DESKTOP_VERTICAL_GAP,
        amplitude: isMobile ? mobileAmplitude : desktopAmplitude,
    };
}

export function calculateNodePositions(
    itemCount: number,
    containerWidth: number,
    isMobile: boolean
): NodePosition[] {
    const { verticalGap, amplitude, nodeSize } = getLayoutConstants(isMobile, containerWidth);
    const centerX = containerWidth / 2;
    const startY = nodeSize / 2 + 20;

    const offsets = [-1, -0.33, 0.33, 1, 0.33, -0.33];

    return Array.from({ length: itemCount }, (_, i) => {
        const offset = offsets[i % offsets.length];
        const x = centerX + offset * amplitude;
        const y = startY + i * verticalGap;
        return { x, y };
    });
}

export function calculateTotalHeight(itemCount: number, isMobile: boolean): number {
    const { verticalGap, nodeSize } = getLayoutConstants(isMobile);
    const startY = nodeSize / 2 + 20;
    return startY + (itemCount - 1) * verticalGap + nodeSize / 2 + 80;
}

export function generateSVGPath(positions: NodePosition[]): string {
    if (positions.length < 2) return '';

    let d = `M ${positions[0].x} ${positions[0].y}`;

    for (let i = 0; i < positions.length - 1; i++) {
        const current = positions[i];
        const next = positions[i + 1];
        const midY = (current.y + next.y) / 2;

        d += ` C ${current.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
    }

    return d;
}

const LESSON_BASE_BY_MODULE_INDEX = [100, 140, 180, 230, 280];
const LESSON_DURATION_FACTOR_PER_10MIN = 1.0;
const LESSON_MIN_XP = 50;
const LESSON_MAX_XP = 1500;

export function computeLessonXP(moduleIndex: number, durationSec: number): number {
    const base = LESSON_BASE_BY_MODULE_INDEX[moduleIndex] ?? LESSON_BASE_BY_MODULE_INDEX[LESSON_BASE_BY_MODULE_INDEX.length - 1];
    const factor = 1 + (durationSec / 600) * LESSON_DURATION_FACTOR_PER_10MIN;
    return Math.max(LESSON_MIN_XP, Math.min(LESSON_MAX_XP, Math.round(base * factor)));
}

export function getLabelSide(index: number): 'left' | 'right' {
    const offsets = [-1, -0.33, 0.33, 1, 0.33, -0.33];
    const offset = offsets[index % offsets.length];
    if (Math.abs(offset) < 0.01) return 'right';
    return offset > 0 ? 'left' : 'right';
}
