'use client';

import { useState } from 'react';
import Image from 'next/image';
import { m, AnimatePresence } from 'framer-motion';
import { programs } from '@/config/programs';
import { resendGiftEmail } from '@/services/payment';
import type { OrderDetails } from '@/services/payment';
import { formatARS } from '@/utilities';
import { ProductKeyDisplay } from './ProductKeyDisplay';
import { KeyIcon, ArrowDownIcon, UserIcon, GiftIcon } from '@/icons';

interface Props {
    order: OrderDetails;
}

const statusConfig: Record<string, { text: string; className: string }> = {
    approved: { text: 'Aprobada', className: 'bg-stannum/15 text-stannum border-stannum/30' },
    pending: { text: 'Pendiente', className: 'bg-amber-400/15 text-amber-400 border-amber-400/30' },
    rejected: { text: 'Rechazada', className: 'bg-red-400/15 text-red-400 border-red-400/30' },
    expired: { text: 'Expirada', className: 'bg-white/5 text-white/40 border-white/10' },
    cancelled: { text: 'Cancelada', className: 'bg-white/5 text-white/40 border-white/10' },
    refunded: { text: 'Reembolsada', className: 'bg-blue-400/15 text-blue-400 border-blue-400/30' },
    chargedback: { text: 'Contracargo', className: 'bg-red-400/15 text-red-400 border-red-400/30' },
};

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const PurchaseCard = ({ order }: Props) => {
    const [resending, setResending] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [resendError, setResendError] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const program = programs.find(p => p.id === order.programId);
    const status = statusConfig[order.status] || { text: order.status, className: 'bg-white/5 text-white/40 border-white/10' };
    const isInactive = ['rejected', 'expired', 'cancelled'].includes(order.status);
    const hasGiftKeys = order.type === 'gift' && order.status === 'approved' && order.productKeys.length > 0;

    const handleResend = async () => {
        setResending(true);
        setResendError(false);
        try {
            await resendGiftEmail(order.id);
            setResendSuccess(true);
        } catch (err) {
            void err;
            setResendError(true);
        } finally {
            setResending(false);
        }
    };

    return (
        <div className={`card !p-0 flex overflow-hidden ${isInactive ? 'opacity-50' : ''}`}>
            <div className="w-28 lg:w-40 shrink-0 relative overflow-hidden">
                {program ? (
                    <>
                        <Image src={program.background} alt={program.name} className="size-full object-cover absolute top-0 left-0 z-0" />
                        <div className="size-full bg-gradient-to-r from-black/20 to-black/70 absolute top-0 left-0 z-10" />
                        <div className="size-full flex justify-center items-center relative z-20 p-3">
                            <Image src={program.logo} alt={program.name} className="w-20 lg:w-24" />
                        </div>
                    </>
                ) : (
                    <div className="size-full bg-card-light flex justify-center items-center">
                        <span className="text-xs text-white/30">N/A</span>
                    </div>
                )}
            </div>

            <div className="grow p-4 lg:p-5 flex flex-col gap-2.5 min-w-0">
                <div className="flex items-start justify-between gap-3">
                    <span className="font-bold text-sm lg:text-base truncate">{program?.name || order.programId}</span>
                    <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${status.className}`}>
                        {status.text}
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-white/50">
                    <span>{formatDate(order.createdAt)}</span>
                    <span className="text-white/20">·</span>
                    <span className="flex items-center gap-1">
                        {order.type === 'gift' ? <GiftIcon className="size-3" /> : <UserIcon className="size-3" />}
                        {order.type === 'gift' ? 'Regalo' : 'Compra personal'}
                    </span>
                    {order.fulfilledAt && (
                        <>
                            <span className="text-white/20">·</span>
                            <span>Entregado {formatDate(order.fulfilledAt)}</span>
                        </>
                    )}
                </div>

                <div className="flex items-baseline gap-2">
                    {order.discountApplied > 0 && (
                        <span className="text-xs text-white/40 line-through">{formatARS(order.originalAmount)}</span>
                    )}
                    <span className="font-bold text-base lg:text-lg leading-none">{formatARS(order.finalAmount)}</span>
                    {order.discountApplied > 0 && (
                        <span className="text-xs text-stannum font-medium">-{formatARS(order.discountApplied)}</span>
                    )}
                </div>

                {hasGiftKeys && (
                    <>
                        <div className="w-full h-px bg-card-light" />
                        <button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-1.5 text-xs text-stannum hover:text-stannum-light transition-200 w-fit"
                        >
                            <KeyIcon className="size-3.5" />
                            {isExpanded ? 'Ocultar claves' : `Ver ${order.productKeys.length} clave${order.productKeys.length > 1 ? 's' : ''}`}
                            <m.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ type: 'spring', bounce: 0 }}
                            >
                                <ArrowDownIcon className="size-2.5" />
                            </m.div>
                        </button>

                        <AnimatePresence initial={false}>
                            {isExpanded && (
                                <m.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex flex-col gap-3">
                                        <ProductKeyDisplay keys={order.productKeys} />
                                        {order.giftDelivery === 'email' && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-white/50">
                                                    {order.giftEmailSent ? `Enviado a ${order.giftEmail}` : 'Email no enviado'}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={handleResend}
                                                    disabled={resending || resendSuccess}
                                                    className="text-stannum hover:text-stannum-light text-xs font-medium transition-200 disabled:opacity-50"
                                                >
                                                    {resendError ? 'Error al reenviar' : resendSuccess ? 'Reenviado' : resending ? 'Enviando...' : 'Reenviar email'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </m.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </div>
        </div>
    );
};
