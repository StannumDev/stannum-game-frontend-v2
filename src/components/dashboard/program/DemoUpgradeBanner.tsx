'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@/icons';
import { formatARS } from '@/utilities';
import { programs } from '@/config/programs';

interface Props {
    fullProgramId: string;
}

export const DemoUpgradeBanner = ({ fullProgramId }: Props) => {
    const fullProgram = programs.find(p => p.id === fullProgramId);
    if (!fullProgram) return null;

    return (
        <div className="w-full rounded-lg border border-stannum/30 bg-stannum/5 p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="grow text-center sm:text-left">
                <p className="text-sm font-semibold text-white">
                    Estás usando la versión demo de {fullProgram.name}
                </p>
                <p className="text-xs text-white/50 mt-0.5">
                    Suscribite para acceder a todos los módulos, lecciones y actividades.
                </p>
            </div>
            <Link
                href={`/dashboard/subscription/checkout/${fullProgramId}`}
                className="shrink-0 py-2.5 px-5 rounded-lg bg-stannum text-black font-bold text-sm flex items-center gap-2 hover:bg-stannum-light transition-200"
            >
                Suscribirme {fullProgram.subscriptionPriceARS ? `— ${formatARS(fullProgram.subscriptionPriceARS)}/mes` : ''}
                <ArrowRightIcon className="size-3.5" />
            </Link>
        </div>
    );
};
