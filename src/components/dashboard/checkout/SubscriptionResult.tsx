'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
import { STANNUMLogo } from '@/components';
import { programs } from '@/config/programs';
import { formatARS } from '@/utilities';
import { CheckIcon, CrossIcon } from '@/icons';
import { getSubscriptionStatus } from '@/services/subscription';
import type { SubscriptionStatusResult } from '@/services/subscription';
import { useUserStore } from '@/stores/userStore';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0 } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

export const SubscriptionResult = () => {
    const searchParams = useSearchParams();
    const refreshUser = useUserStore(s => s.refreshUser);
    const [subStatus, setSubStatus] = useState<SubscriptionStatusResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const programId = searchParams.get('programId');
    const status = searchParams.get('status');
    const program = programId ? programs.find(p => p.id === programId) : null;

    useEffect(() => {
        const fetchStatus = async () => {
            if (!programId) {
                setError('No se encontró información de la suscripción.');
                setIsLoading(false);
                return;
            }

            try {
                const result = await getSubscriptionStatus(programId);
                setSubStatus(result);
                if (result.status === 'active') {
                    refreshUser();
                }
            } catch {
                setError('Estamos verificando tu suscripción. Si ya autorizaste el pago, puede tardar unos minutos.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStatus();
    }, [programId, status]);

    const isSuccess = subStatus?.status === 'active';

    return (
        <div className="w-full min-h-svh flex flex-col">
            <header className="w-full flex justify-between items-center p-4 lg:px-8 border-b border-card">
                <Link href="/dashboard"><STANNUMLogo className="w-36" gameColor="fill-stannum" stannumColor="fill-white" /></Link>
                <Link href="/dashboard/store" className="text-sm text-white/60 hover:text-white transition-200">Volver a la tienda</Link>
            </header>

            <div className="grow flex flex-col items-center justify-center p-6">
                {isLoading ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="size-12 rounded-full border-2 border-stannum border-t-transparent animate-spin" />
                        <p className="text-white/60">Verificando tu suscripción...</p>
                    </div>
                ) : error ? (
                    <m.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="flex flex-col items-center text-center max-w-md gap-4"
                    >
                        <m.div variants={fadeUp} className="size-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                            <CrossIcon className="size-6 text-red-400" />
                        </m.div>
                        <m.h1 variants={fadeUp} className="text-2xl font-bold">Error</m.h1>
                        <m.p variants={fadeUp} className="text-white/60">{error}</m.p>
                        <m.div variants={fadeUp}>
                            <Link href="/dashboard/store" className="mt-2 py-3 px-6 rounded-lg bg-card-light text-sm font-medium hover:bg-white/10 transition-200 inline-block">
                                Volver a la tienda
                            </Link>
                        </m.div>
                    </m.div>
                ) : isSuccess ? (
                    <m.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="w-full max-w-md flex flex-col items-center text-center gap-6"
                    >
                        <m.div variants={fadeUp} className="flex flex-col items-center gap-4">
                            <div className="size-14 rounded-full bg-stannum/15 border border-stannum/30 flex items-center justify-center">
                                <CheckIcon className="size-6 text-stannum" />
                            </div>
                            {program && (
                                <Image src={program.logo} alt={program.name} className="mt-4 w-44 lg:w-52" />
                            )}
                            <h1 className="text-2xl font-bold">¡Suscripción activa!</h1>
                            <p className="text-white/60 text-sm">
                                Tu suscripción a {program?.name || 'el programa'} fue creada correctamente.
                            </p>
                        </m.div>

                        <m.div variants={fadeUp} className="w-full card p-5 text-sm text-left flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-white/50">Programa</span>
                                <span className="font-medium">{program?.name || programId}</span>
                            </div>
                            <div className="h-px bg-card-light" />
                            <div className="flex justify-between items-center">
                                <span className="text-white/50">Tipo</span>
                                <span className="font-medium">Suscripción mensual</span>
                            </div>
                            <div className="h-px bg-card-light" />
                            <div className="flex justify-between items-center">
                                <span className="text-white/50">Precio mensual</span>
                                <span className="font-bold">
                                    {subStatus?.priceARS ? formatARS(subStatus.priceARS) : program?.subscriptionPriceARS ? formatARS(program.subscriptionPriceARS) : '—'}
                                </span>
                            </div>
                            {subStatus?.currentPeriodEnd && (
                                <>
                                    <div className="h-px bg-card-light" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/50">Próxima facturación</span>
                                        <span className="font-medium">
                                            {new Date(subStatus.currentPeriodEnd).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                </>
                            )}
                        </m.div>

                        <m.div variants={fadeUp} className="w-full flex flex-col items-center gap-4">
                            <p className="text-sm text-white/60 leading-relaxed">
                                Tu entrenamiento está listo. Accedé al programa y empezá a aprender.
                            </p>
                            <Link href={`/dashboard/library/${programId}`} className="w-full py-3.5 rounded-lg bg-stannum text-black font-bold text-center hover:bg-stannum-light transition-200">
                                Comenzar entrenamiento
                            </Link>
                            <Link href="/dashboard/billing?tab=subscriptions" className="text-sm text-white/50 hover:text-white transition-200">
                                Ver mis suscripciones
                            </Link>
                        </m.div>
                    </m.div>
                ) : (
                    <m.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="flex flex-col items-center text-center max-w-md gap-4"
                    >
                        <m.div variants={fadeUp} className="size-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                            <CrossIcon className="size-6 text-red-400" />
                        </m.div>
                        <m.h1 variants={fadeUp} className="text-2xl font-bold">No pudimos crear tu suscripción</m.h1>
                        <m.p variants={fadeUp} className="text-white/60">Hubo un problema al procesar tu pago. Podés intentar nuevamente.</m.p>
                        <m.div variants={fadeUp} className="flex flex-col items-center gap-3 mt-2">
                            {programId && (
                                <Link href={`/dashboard/subscription/checkout/${programId}`} className="py-3 px-6 rounded-lg bg-stannum text-black font-bold hover:bg-stannum-light transition-200">
                                    Reintentar
                                </Link>
                            )}
                            <Link href="/dashboard/store" className="text-sm text-white/60 hover:text-white transition-200">
                                Volver a la tienda
                            </Link>
                        </m.div>
                    </m.div>
                )}
            </div>
        </div>
    );
};
