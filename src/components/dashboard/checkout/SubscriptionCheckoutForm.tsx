'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Program } from '@/interfaces';
import { useUserStore } from '@/stores/userStore';
import { STANNUMLogo } from '@/components';
import { LockIcon, SpinnerIcon, RotateRightIcon, ShieldCompletedIcon } from '@/icons';
import { createSubscription } from '@/services/subscription';
import { formatARS } from '@/utilities';
import { hasAccess } from '@/utilities';

interface Props {
    program: Program;
}

export const SubscriptionCheckoutForm = ({ program }: Props) => {
    const user = useUserStore(s => s.user);
    const alreadyHasAccess = hasAccess(user?.programs?.[program.id]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const monthlyPrice = program.subscriptionPriceARS ?? 0;

    const handleSubscribe = useCallback(async () => {
        if (isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const result = await createSubscription({ programId: program.id });

            if (result.initPoint) {
                window.location.href = result.initPoint;
            } else {
                setError('No se pudo obtener el enlace de pago. Intentá de nuevo.');
                setIsLoading(false);
            }
        } catch (err: any) {
            const msg = err?.response?.data?.friendlyMessage || 'Ocurrió un error al crear la suscripción. Intentá de nuevo.';
            setError(msg);
            setIsLoading(false);
        }
    }, [isLoading, program.id]);

    if (alreadyHasAccess) {
        return (
            <div className="w-full min-h-svh flex flex-col">
                <header className="w-full flex justify-between items-center p-4 lg:px-8 border-b border-card">
                    <Link href="/dashboard"><STANNUMLogo className="w-36" gameColor="fill-stannum" stannumColor="fill-white" /></Link>
                    <Link href={`/dashboard/store/${program.id}`} className="text-sm text-white/60 hover:text-white transition-200">Volver</Link>
                </header>
                <div className="grow flex flex-col items-center justify-center p-6 text-center gap-4">
                    <h1 className="text-2xl font-bold">Ya tenés acceso a este programa</h1>
                    <p className="text-white/60">Tu suscripción a {program.name} está activa.</p>
                    <Link href={`/dashboard/library/${program.id}`} className="py-3 px-6 rounded-lg bg-stannum text-black font-bold hover:bg-stannum-light transition-200">
                        Ir al programa
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-svh flex flex-col">
            <header className="w-full flex justify-between items-center p-4 lg:px-8 border-b border-card">
                <Link href="/dashboard"><STANNUMLogo className="w-36" gameColor="fill-stannum" stannumColor="fill-white" /></Link>
                <Link href={`/dashboard/store/${program.id}`} className="text-sm text-white/60 hover:text-white transition-200 min-h-[44px] min-w-[44px] flex items-center justify-end">Volver a la tienda</Link>
            </header>

            <div className="grow w-full max-w-4xl mx-auto p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-3/5 flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                        <h1 className="text-3xl font-black">Suscribite a {program.name}</h1>
                        <p className="text-sm text-white/70">
                            Suscripción mensual con acceso completo al programa.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="subtitle-1">¿Qué incluye tu suscripción?</span>

                        <div className="card p-4 flex items-center gap-3 border-stannum/30">
                            <div className="size-10 shrink-0 rounded-lg bg-stannum/10 flex items-center justify-center">
                                <RotateRightIcon className="size-5 text-stannum" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold">Contenido que se actualiza</span>
                                <span className="text-xs text-white/60 leading-relaxed">
                                    Cada mes se agrega contenido nuevo al programa. Mientras estés suscripto, accedés a todo lo que se sume.
                                </span>
                            </div>
                        </div>

                        <div className="card p-4 flex items-center gap-3 border-stannum/30">
                            <div className="size-10 shrink-0 rounded-lg bg-stannum/10 flex items-center justify-center">
                                <ShieldCompletedIcon className="size-5 text-stannum" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold">Tu precio queda congelado</span>
                                <span className="text-xs text-white/60 leading-relaxed">
                                    Pagás siempre {formatARS(monthlyPrice)}/mes, sin importar futuras subas de precio. Si cancelás y volvés, se aplica el precio vigente en ese momento.
                                </span>
                            </div>
                        </div>

                        <div className="card p-4 flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <div className="size-10 shrink-0 rounded-lg bg-stannum/10 flex items-center justify-center">
                                    <LockIcon className="size-4 text-stannum" />
                                </div>
                                <div>
                                    <span className="text-sm font-semibold block">Renovación mensual automática</span>
                                    <span className="text-xs text-white/50">Se cobra {formatARS(monthlyPrice)} por mes</span>
                                </div>
                            </div>
                            <ul className="flex flex-col gap-1.5 text-xs text-white/50 mt-1 ml-[52px]">
                                <li className="flex items-start gap-2">
                                    <span className="text-stannum/70 mt-0.5">•</span>
                                    Acceso completo a todo el contenido
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-stannum/70 mt-0.5">•</span>
                                    Cancelá cuando quieras desde &quot;Mis Suscripciones&quot;
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-stannum/70 mt-0.5">•</span>
                                    Tu acceso se mantiene hasta el fin del período facturado
                                </li>
                            </ul>
                        </div>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer min-h-[44px]">
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={e => setAcceptedTerms(e.target.checked)}
                            className="mt-1 size-4 rounded border-card accent-stannum"
                        />
                        <span className="text-xs text-white/50 leading-relaxed">
                            Confirmo que soy mayor de 18 años y acepto los{' '}
                            <a href="/terminos" target="_blank" className="text-stannum hover:underline">Términos y Condiciones</a>{' '}
                            y la{' '}
                            <a href="/privacidad" target="_blank" className="text-stannum hover:underline">Política de Privacidad</a>.
                        </span>
                    </label>

                    <p className="text-xs text-white/30 leading-relaxed">
                        Serás redirigido a Mercado Pago para elegir tu método de pago preferido (tarjeta, saldo, transferencia, etc.).
                        Al autorizar, se activará tu suscripción automáticamente.
                    </p>
                </div>

                <div className="w-full lg:w-2/5">
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
                                <span>Suscripción mensual</span>
                                <span className="flex items-center gap-1 text-stannum/70">
                                    <LockIcon className="size-3" />
                                    Pago seguro
                                </span>
                            </div>

                            <div className="w-full h-px bg-card-light" />

                            <div className="flex flex-col gap-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-white/50">Precio mensual</span>
                                    <span>{formatARS(monthlyPrice)}</span>
                                </div>
                                <div className="w-full h-px bg-card-light" />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total hoy</span>
                                    <span>{formatARS(monthlyPrice)}</span>
                                </div>
                                <p className="text-[11px] text-white/30 mt-1">
                                    Se renueva automáticamente cada mes. Cancelá cuando quieras.
                                </p>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleSubscribe}
                        disabled={isLoading || !acceptedTerms}
                        className="mt-4 w-full py-3 rounded-lg bg-stannum text-black font-bold text-center hover:bg-stannum-light transition-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <SpinnerIcon className="size-4 animate-spin" />
                                Redirigiendo...
                            </span>
                        ) : (
                            'Continuar al pago'
                        )}
                    </button>

                    <div className="mt-4 flex flex-col items-center gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-white/40">
                            <LockIcon className="size-3" />
                            <span>Pago seguro con Mercado Pago</span>
                        </div>
                        <p className="text-[11px] text-white/25 text-center">
                            Serás redirigido a Mercado Pago para completar el pago
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
