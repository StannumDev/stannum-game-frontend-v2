interface SkeletonProps {
    className?: string;
}

export const Skeleton = ({ className = '' }: SkeletonProps) => (
    <div className={`bg-card-light animate-pulse rounded ${className}`} aria-hidden="true" />
);
