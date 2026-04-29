interface Props {
    name: string;
    className?: string;
    textClassName?: string;
}

const COLORS = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
    '#f97316', '#eab308', '#22c55e', '#14b8a6',
    '#06b6d4', '#3b82f6',
];

function hashName(name: string): number {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    if (name.length >= 2) return name.slice(0, 2).toUpperCase();
    return name.toUpperCase();
}

export const InitialsAvatar = ({ name, className = '', textClassName = 'text-xs' }: Props) => {
    const color = COLORS[hashName(name) % COLORS.length];
    const initials = getInitials(name);

    return (
        <div
            className={`flex items-center justify-center font-bold text-white select-none ${className} ${textClassName}`}
            style={{ backgroundColor: color }}
        >
            {initials}
        </div>
    );
};
