'use client';

import Image from 'next/image';
import { Program } from '@/interfaces';
import { formatARS } from '@/utilities';
import { ShieldCompletedIcon } from '@/icons';

interface Props {
    program: Program;
    originalAmount: number;
    discountApplied: number;
    finalAmount: number;
    type: 'self' | 'gift';
}

export const CheckoutSummary = ({ program, originalAmount, discountApplied, finalAmount, type }: Props) => {
    return (
        <div className="card !p-0 overflow-hidden sticky top-6">
            <div className="w-full aspect-[3/1] relative">
                <Image src={program.background} alt={program.name} className="size-full object-cover absolute top-0 left-0 z-0" />
                <div className="size-full bg-gradient-to-t from-black via-black/60 to-black/20 absolute top-0 left-0 z-10" />
                <div className="size-full flex items-end p-4 relative z-20">
                    <Image src={program.logo} alt={program.name} className="w-28 lg:w-32" />
                </div>
            </div>

            <div className="p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{type === 'gift' ? 'Regalo' : 'Compra personal'}</span>
                    <span className="flex items-center gap-1 text-stannum/70">
                        <ShieldCompletedIcon className="size-3.5" />
                        Compra protegida
                    </span>
                </div>

                <div className="w-full h-px bg-card-light" />

                <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-white/50">Subtotal</span>
                        <span>{formatARS(originalAmount)}</span>
                    </div>
                    {discountApplied > 0 && (
                        <div className="flex justify-between text-stannum">
                            <span>Descuento</span>
                            <span>-{formatARS(discountApplied)}</span>
                        </div>
                    )}
                    <div className="w-full h-px bg-card-light" />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{formatARS(finalAmount)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
