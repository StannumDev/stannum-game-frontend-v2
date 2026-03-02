import { Skeleton } from '@/components';

export const ProfileSkeleton = () => (
    <div className="w-full flex flex-col gap-4" aria-hidden="true">
        <section className="w-full flex flex-col">
            <Skeleton className="w-full aspect-video lg:aspect-auto lg:h-96 rounded-t-lg" />
            <div className="w-full card pt-0 rounded-t-none">
                <div className="w-full flex flex-col justify-center items-center -mt-16 lg:-mt-20">
                    <Skeleton className="size-24 lg:size-48 rounded-lg lg:rounded-2xl border-4 border-card" />
                    <Skeleton className="mt-4 h-6 w-40 rounded" />
                    <Skeleton className="mt-2 h-4 w-24 rounded" />
                </div>
            </div>
        </section>
    </div>
);
