'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Program } from '@/interfaces';
import { useUserStore } from '@/stores/userStore';
import { STANNUMLogo } from '@/components';
import { LockIcon, UserIcon, GiftIcon } from '@/icons';
import { CouponInput } from './CouponInput';
import { GiftOptions } from './GiftOptions';
import { CheckoutSummary } from './CheckoutSummary';
import { createPreference } from '@/services/payment';
import type { CouponResult } from '@/services/payment';
import { hasAccess } from '@/utilities';

interface Props {
    program: Program;
}

export const CheckoutForm = ({ program }: Props) => {
    const user = useUserStore(s => s.user);
    const isPurchased = hasAccess(user?.programs?.[program.id]);

    const [type, setType] = useState<'self' | 'gift'>(isPurchased ? 'gift' : 'self');
    const [giftDelivery, setGiftDelivery] = useState<'email' | 'manual'>('email');
    const [giftEmail, setGiftEmail] = useState('');
    const [couponData, setCouponData] = useState<CouponResult | null>(null);
    const [couponCode, setCouponCode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const originalAmount = program.priceARS ?? 0;
    const discountApplied = couponData?.discountApplied ?? 0;
    const finalAmount = couponData ? couponData.finalAmount : originalAmount;

    const isValidEmail = (email: string) => /^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isGiftEmailInvalid = type === 'gift' && giftDelivery === 'email' && (!giftEmail || !isValidEmail(giftEmail));

    const handleCreatePreference = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data: Parameters<typeof createPreference>[0] = {
                programId: program.id,
                type,
                couponCode: couponCode ?? undefined,
            };

            if (type === 'gift') {
                data.giftDelivery = giftDelivery;
                if (giftDelivery === 'email') data.giftEmail = giftEmail;
            }

            const result = await createPreference(data);

            if (result.directActivation) {
                window.location.href = `/dashboard/checkout/result?orderId=${result.orderId}&status=approved`;
                return;
            }

            if (result.initPoint) {
                window.location.href = result.initPoint;
                return;
            }
        } catch (err: any) {
            const msg = err?.response?.data?.friendlyMessage || 'Ocurrió un error al procesar tu solicitud.';
            setError(msg);
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-svh flex flex-col">
            <header className="w-full flex justify-between items-center p-4 lg:px-8 border-b border-card">
                <Link href="/dashboard"><STANNUMLogo className="w-36" gameColor="fill-stannum" stannumColor="fill-white" /></Link>
                <Link href={`/dashboard/store/${program.id}`} className="text-sm text-white/60 hover:text-white transition-200 min-h-[44px] min-w-[44px] flex items-center justify-end">Volver a la tienda</Link>
            </header>

            <div className="grow w-full max-w-4xl mx-auto p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-3/5 flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                        <h1 className="text-3xl font-black">Es hora de entrenar</h1>
                        <p className="text-sm text-white/70">
                            Estás por desbloquear <span className="text-white font-medium">{program.name}</span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="subtitle-1">Tipo de compra</span>
                        <div className="card p-5">
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => { setType('self'); setGiftEmail(''); setGiftDelivery('email'); }}
                                    disabled={isPurchased}
                                    className={`grow py-3 rounded-lg text-sm font-medium border transition-200 flex items-center justify-center gap-2 ${isPurchased ? 'opacity-40 cursor-not-allowed border-card' : type === 'self' ? 'border-stannum bg-stannum/10 text-stannum' : 'border-card hover:border-card-light'}`}
                                >
                                    <UserIcon className="size-4" />
                                    Para mí
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setType('gift')}
                                    className={`grow py-3 rounded-lg text-sm font-medium border transition-200 flex items-center justify-center gap-2 ${type === 'gift' ? 'border-stannum bg-stannum/10 text-stannum' : 'border-card hover:border-card-light'}`}
                                >
                                    <GiftIcon className="size-4" />
                                    Para regalar
                                </button>
                            </div>
                            {isPurchased && <span className="text-[10px] text-white/30">Ya tenés este programa</span>}
                            {type === 'gift' && (
                                <GiftOptions
                                    giftDelivery={giftDelivery}
                                    setGiftDelivery={setGiftDelivery}
                                    giftEmail={giftEmail}
                                    setGiftEmail={setGiftEmail}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="subtitle-1">Cupón</span>
                        <CouponInput
                            programId={program.id}
                            onCouponApplied={(data, code) => { setCouponData(data); setCouponCode(code); }}
                            onCouponCleared={() => { setCouponData(null); setCouponCode(null); }}
                        />
                    </div>

                    <p className="text-xs text-white/30 leading-relaxed">
                        {type === 'self'
                            ? `Al completar la compra, se activará ${program.name} en tu cuenta con acceso inmediato a todos los módulos desde tu biblioteca.`
                            : `Recibirás una clave de producto para regalar ${program.name}. El destinatario podrá activarla en su cuenta y acceder a todos los módulos del programa.`
                        }
                    </p>
                </div>

                <div className="w-full lg:w-2/5">
                    <CheckoutSummary
                        program={program}
                        originalAmount={originalAmount}
                        discountApplied={discountApplied}
                        finalAmount={finalAmount}
                        type={type}
                    />

                    {error && (
                        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleCreatePreference}
                        disabled={isLoading || isGiftEmailInvalid}
                        className="mt-4 w-full py-3 rounded-lg bg-stannum text-black font-bold text-center hover:bg-stannum-light transition-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Procesando...' : finalAmount === 0 ? 'Obtener programa' : 'Continuar al pago'}
                    </button>

                    {finalAmount > 0 && (
                        <div className="mt-4 flex flex-col items-center gap-2">
                            <div className="flex items-center gap-1.5 text-xs text-white/40">
                                <LockIcon className="size-3" />
                                <span>Pago seguro con Mercado Pago</span>
                            </div>
                            <p className="text-[11px] text-white/25 text-center">
                                Serás redirigido a Mercado Pago para completar el pago
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
