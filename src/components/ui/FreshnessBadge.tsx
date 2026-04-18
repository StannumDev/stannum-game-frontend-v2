import type { FreshnessStatus } from '@/utilities';

interface Props {
    status: FreshnessStatus;
    size?: 'sm' | 'md';
    className?: string;
}

export const FreshnessBadge = ({ status, size = 'md', className = '' }: Props) => {
    if (!status) return null;

    const isSm = size === 'sm';
    const baseSize = isSm ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5';

    if (status === 'new') {
        return (
            <span className={`${baseSize} font-bold uppercase tracking-widest rounded-full bg-stannum text-card shadow-sm ${className}`}>
                Nuevo
            </span>
        );
    }

    return (
        <span className={`${baseSize} font-bold uppercase tracking-widest rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 ${className}`}>
            Actualizado
        </span>
    );
};
