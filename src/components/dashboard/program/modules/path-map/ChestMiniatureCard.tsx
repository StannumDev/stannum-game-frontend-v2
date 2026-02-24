import Link from 'next/link';
import { ChestIcon, LockIcon } from '@/icons';

interface Props {
    state: 'active' | 'completed' | 'blocked';
    moduleHref: string;
}

export const ChestMiniatureCard = ({ state, moduleHref }: Props) => {
    if (state === 'blocked') {
        return (
            <div className="w-full my-1 p-2.5 rounded-lg border border-dashed border-card-light/50 opacity-40 flex items-center gap-3">
                <div className="size-8 rounded-full bg-card-light/50 flex justify-center items-center shrink-0">
                    <LockIcon className="size-3.5 text-white/40" />
                </div>
                <div className="flex flex-col min-w-0 gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-card-lightest">Cofre</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-card-lightest">Bloqueado</span>
                </div>
            </div>
        );
    }

    if (state === 'completed') {
        return (
            <div className="w-full my-1 p-2.5 rounded-lg border border-stannum/50 bg-stannum/[0.08] flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                    <div className="size-6 rounded-full bg-stannum/20 flex justify-center items-center">
                        <ChestIcon className="size-3 text-stannum" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-stannum">Cofre</span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-stannum">Reclamado</span>
            </div>
        );
    }

    return (
        <Link
            href={moduleHref}
            className="w-full my-1 p-2.5 rounded-lg border border-amber-400/50 hover:border-amber-400 bg-amber-400/[0.06] hover:bg-amber-400/[0.10] transition-200 group cursor-pointer flex flex-col gap-1"
        >
            <div className="flex items-center gap-1.5">
                <div className="size-6 rounded-full bg-amber-400/15 flex justify-center items-center">
                    <ChestIcon className="size-3 text-amber-400" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-amber-400">Cofre</span>
            </div>
            <h2 className="w-full title-3 truncate">Reclamá tu recompensa</h2>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400">Disponible</span>
        </Link>
    );
};
