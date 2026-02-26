import { Skeleton } from '@/components';

export const CommunityCardSkeleton = () => (
    <article className="card break-inside-avoid mb-4" aria-hidden="true">
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
                <Skeleton className="size-6 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
            </div>
            <Skeleton className="size-8 rounded-lg" />
        </div>
        <Skeleton className="h-5 w-3/4 rounded mb-2" />
        <div className="mt-2 mb-4 space-y-2">
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-5/6 rounded" />
        </div>
        <div className="flex items-center gap-1.5 mb-3">
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-18 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-card-light">
            <Skeleton className="h-6 w-20 rounded" />
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20 rounded" />
                <Skeleton className="h-4 w-8 rounded" />
                <Skeleton className="h-4 w-8 rounded" />
            </div>
            <div className="flex items-center gap-2">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="h-3 w-16 rounded" />
            </div>
        </div>
    </article>
);
