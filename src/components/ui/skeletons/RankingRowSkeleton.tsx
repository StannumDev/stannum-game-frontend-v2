import { Skeleton } from '@/components';

export const RankingRowSkeleton = () => (
    <div className="w-full bg-card px-1 lg:px-4 py-2 rounded-lg grid grid-cols-12 lg:grid-cols-8 items-center gap-1 lg:gap-2">
        <div className="col-span-2 lg:col-span-1 flex justify-center">
            <Skeleton className="size-6 rounded" />
        </div>
        <div className="col-span-6 lg:col-span-3 lg:pl-2 flex items-center gap-2 lg:gap-3">
            <Skeleton className="size-7 lg:size-9 rounded-full shrink-0" />
            <Skeleton className="h-4 w-24 lg:w-32 rounded" />
        </div>
        <div className="hidden lg:block lg:col-span-2 lg:pl-2">
            <Skeleton className="h-4 w-20 rounded" />
        </div>
        <div className="col-span-2 lg:col-span-1 flex justify-center">
            <Skeleton className="h-4 w-8 rounded" />
        </div>
        <div className="col-span-2 lg:col-span-1 flex justify-center">
            <Skeleton className="h-4 w-14 rounded" />
        </div>
    </div>
);
