'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
import { STANNUMLogo } from '@/components';
import { verifyPayment } from '@/services/payment';
import type { OrderDetails } from '@/services/payment';
import { programs } from '@/config/programs';
import { useUserStore } from '@/stores/userStore';
import { formatARS } from '@/utilities';
import { CheckIcon, CrossIcon, GiftIcon } from '@/icons';
import { ProductKeyDisplay } from '@/components/dashboard/purchases/ProductKeyDisplay';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0 } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

export const PurchaseResult = () => {
    const searchParams = useSearchParams();
    const refreshUser = useUserStore(s => s.refreshUser);
    const [order, setOrder] = useState<OrderDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const paymentId = searchParams.get('payment_id');
                const orderId = searchParams.get('orderId') || searchParams.get('external_reference');

                if (paymentId || orderId) {
                    const result = await verifyPayment(paymentId || undefined, orderId || undefined);
                    if (!result.order) throw new Error('No order data');
                    setOrder(result.order);
                    if (result.order.status === 'approved' && result.order.type === 'self') {
                        refreshUser();
                    }
                } else {
                    setError('No se encontró información del pago.');
                }
            } catch (err: any) {
                const msg = err?.response?.data?.friendlyMessage || 'No pudimos verificar tu pago.';
                setError(msg);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResult();
    }, [searchParams]);

    const program = order ? programs.find(p => p.id === order.programId) : null;

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
                        <p className="text-white/60">Verificando tu pago...</p>
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
                ) : order?.status === 'approved' ? (
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
                            <h1 className="text-2xl font-bold">
                                {order.type === 'self' ? '¡Compra exitosa!' : '¡Compra de regalo exitosa!'}
                            </h1>
                            {order.type === 'self' && (
                                <p className="text-white/60 text-sm">Tu programa fue activado correctamente.</p>
                            )}
                            {order.type === 'gift' && order.giftDelivery === 'email' && (
                                <p className="text-white/60 text-sm">Enviamos la clave a <strong className="text-white">{order.giftEmail}</strong></p>
                            )}
                        </m.div>

                        {order.type === 'gift' && order.productKeys.length > 0 && (
                            <m.div variants={fadeUp} className="w-full">
                                <ProductKeyDisplay keys={order.productKeys} />
                            </m.div>
                        )}

                        <m.div variants={fadeUp} className="w-full card p-5 text-sm text-left flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-white/50">Programa</span>
                                <span className="font-medium">{program?.name || order.programId}</span>
                            </div>
                            <div className="h-px bg-card-light" />
                            <div className="flex justify-between items-center">
                                <span className="text-white/50">Tipo</span>
                                <span className="flex items-center gap-1.5 font-medium">
                                    {order.type === 'gift' ? <><GiftIcon className="size-3.5 text-stannum" /> Regalo</> : 'Compra personal'}
                                </span>
                            </div>
                            <div className="h-px bg-card-light" />
                            {order.discountApplied > 0 && (
                                <>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/50">Subtotal</span>
                                        <span className="text-white/50 line-through">{formatARS(order.originalAmount)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/50">Descuento</span>
                                        <span className="text-stannum font-medium">-{formatARS(order.discountApplied)}</span>
                                    </div>
                                    <div className="h-px bg-card-light" />
                                </>
                            )}
                            <div className="flex justify-between items-center">
                                <span className="text-white/50">Total</span>
                                <span className="font-bold text-base">{formatARS(order.finalAmount)}</span>
                            </div>
                        </m.div>

                        <m.div variants={fadeUp} className="w-full flex flex-col items-center gap-4">
                            {order.type === 'self' ? (
                                <>
                                    <p className="text-sm text-white/60 leading-relaxed">
                                        Tu entrenamiento esta listo. Es hora de entrar al campo y demostrar de que estas hecho.
                                    </p>
                                    <Link href={`/dashboard/library/${order.programId}`} className="w-full py-3.5 rounded-lg bg-stannum text-black font-bold text-center hover:bg-stannum-light transition-200">
                                        Comenzar entrenamiento
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <p className="text-sm text-white/60 leading-relaxed">
                                        El regalo esta listo para ser entregado. Que empiece el entrenamiento.
                                    </p>
                                    <Link href="/dashboard/billing" className="w-full py-3.5 rounded-lg bg-stannum text-black font-bold text-center hover:bg-stannum-light transition-200">
                                        Ver mis compras
                                    </Link>
                                </>
                            )}
                            <p className="text-xs text-white/30">Podés ver tus compras en cualquier momento desde el menú</p>
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
                        <m.h1 variants={fadeUp} className="text-2xl font-bold">No pudimos procesar tu pago</m.h1>
                        <m.p variants={fadeUp} className="text-white/60">El pago fue rechazado. Podés intentar nuevamente.</m.p>
                        <m.div variants={fadeUp} className="flex flex-col items-center gap-3 mt-2">
                            {order && (
                                <Link href={`/dashboard/checkout/${order.programId}`} className="py-3 px-6 rounded-lg bg-stannum text-black font-bold hover:bg-stannum-light transition-200">
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
