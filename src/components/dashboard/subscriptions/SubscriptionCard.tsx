'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import { Program } from '@/interfaces';
import { formatARS } from '@/utilities';
import { cancelSubscription, getPaymentHistory, downloadSubscriptionReceipt } from '@/services/subscription';
import type { SubscriptionStatusResult, SubscriptionPayment } from '@/services/subscription';
import { ArrowRightIcon, ArrowDownIcon, SpinnerIcon, DownloadIcon } from '@/icons';

interface Props {
    program: Program;
    status: SubscriptionStatusResult;
    onCancelled: () => void;
}

const statusLabels: Record<string, { label: string; color: string }> = {
    active: { label: 'Activa', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
    paused: { label: 'Pausada', color: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
    cancelled: { label: 'Cancelada', color: 'bg-red-500/15 text-red-400 border-red-500/20' },
    expired: { label: 'Expirada', color: 'bg-white/10 text-white/50 border-white/10' },
    pending: { label: 'Pendiente', color: 'bg-blue-500/15 text-blue-400 border-blue-500/20' },
};

const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
};

const paymentStatusConfig: Record<string, { text: string; className: string }> = {
    approved: { text: 'Aprobado', className: 'text-emerald-400' },
    rejected: { text: 'Rechazado', className: 'text-red-400' },
    pending: { text: 'Pendiente', className: 'text-amber-400' },
    refunded: { text: 'Reembolsado', className: 'text-blue-400' },
};

export const SubscriptionCard = ({ program, status, onCancelled }: Props) => {
    const [showCancel, setShowCancel] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const [cancelError, setCancelError] = useState<string | null>(null);
    const [showPayments, setShowPayments] = useState(false);
    const [payments, setPayments] = useState<SubscriptionPayment[]>([]);
    const [loadingPayments, setLoadingPayments] = useState(false);
    const [paymentsError, setPaymentsError] = useState(false);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const [downloadErrorId, setDownloadErrorId] = useState<string | null>(null);

    const statusInfo = statusLabels[status.status || ''] || statusLabels.expired;
    const canCancel = status.status === 'active';

    const handleCancel = async () => {
        setIsCancelling(true);
        setCancelError(null);
        try {
            await cancelSubscription(program.id);
            setShowCancel(false);
            onCancelled();
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { friendlyMessage?: string } } })?.response?.data?.friendlyMessage || 'No pudimos cancelar tu suscripción. Intentá de nuevo.';
            setCancelError(msg);
        } finally {
            setIsCancelling(false);
        }
    };

    const handleTogglePayments = async () => {
        if (showPayments) {
            setShowPayments(false);
            return;
        }
        setShowPayments(true);
        setPaymentsError(false);
        if (payments.length === 0) {
            setLoadingPayments(true);
            try {
                const result = await getPaymentHistory(program.id);
                setPayments(result.payments);
            } catch {
                setPaymentsError(true);
            } finally {
                setLoadingPayments(false);
            }
        }
    };

    const handleDownloadReceipt = async (paymentId: string) => {
        setDownloadingId(paymentId);
        setDownloadErrorId(null);
        try {
            await downloadSubscriptionReceipt(paymentId);
        } catch {
            setDownloadErrorId(paymentId);
        } finally {
            setDownloadingId(null);
        }
    };

    return (
        <div className="card p-0 overflow-hidden">
            <div className="relative h-24">
                <Image src={program.background} alt={program.name} className="size-full object-cover absolute top-0 left-0 z-0" />
                <div className="size-full bg-gradient-to-t from-card to-transparent absolute top-0 left-0 z-10" />
                <div className="absolute bottom-3 left-4 z-20 flex items-end gap-3">
                    <Image src={program.logo} alt={program.name} className="w-24" />
                    <span className={`text-xs font-semibold py-1 px-2.5 rounded-md border ${statusInfo.color}`}>
                        {statusInfo.label}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col gap-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] text-white/40">Precio mensual</span>
                        <span className="font-semibold">
                            {status.priceARS ? formatARS(status.priceARS) : '—'}
                        </span>
                        {status.isPriceGrandfathered && status.currentMonthlyPriceARS && status.priceARS && status.priceARS < status.currentMonthlyPriceARS && (
                            <span className="text-[10px] text-stannum">Precio bloqueado</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] text-white/40">Suscripción desde</span>
                        <span className="font-semibold">{formatDate(status.subscribedAt)}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] text-white/40">
                            {status.status === 'cancelled' ? 'Acceso hasta' : 'Próxima facturación'}
                        </span>
                        <span className="font-semibold">{formatDate(status.currentPeriodEnd)}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] text-white/40">Último pago</span>
                        <span className="font-semibold">{formatDate(status.lastPaymentAt)}</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                    {status.hasAccess && (
                        <Link
                            href={`/dashboard/library/${program.id}`}
                            className="grow py-2.5 rounded-lg bg-stannum text-black text-sm font-bold text-center hover:bg-stannum-light transition-200 flex items-center justify-center gap-2"
                        >
                            Ir al programa
                            <ArrowRightIcon className="size-3" />
                        </Link>
                    )}
                    {canCancel && !showCancel && (
                        <button
                            type="button"
                            onClick={() => setShowCancel(true)}
                            className="py-2.5 px-4 rounded-lg border border-card-light text-sm text-white/60 hover:text-white hover:border-red-500/30 transition-200"
                        >
                            Cancelar suscripción
                        </button>
                    )}
                </div>

                {showCancel && (
                    <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 flex flex-col gap-3">
                        <p className="text-sm text-white/70">
                            ¿Estás seguro de que querés cancelar tu suscripción a <strong className="text-white">{program.name}</strong>?
                        </p>
                        <p className="text-xs text-white/50">
                            Tu acceso se mantendrá hasta el {formatDate(status.currentPeriodEnd)}. Después de esa fecha no se realizarán más cobros.
                        </p>
                        {cancelError && (
                            <p className="text-xs text-red-400">{cancelError}</p>
                        )}
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isCancelling}
                                className="py-2 px-4 rounded-lg bg-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/30 transition-200 disabled:opacity-50 flex items-center gap-2"
                            >
                                {isCancelling && <SpinnerIcon className="size-3.5 animate-spin" />}
                                Confirmar cancelación
                            </button>
                            <button
                                type="button"
                                onClick={() => { setShowCancel(false); setCancelError(null); }}
                                disabled={isCancelling}
                                className="py-2 px-4 rounded-lg border border-card text-sm text-white/60 hover:text-white transition-200 disabled:opacity-50"
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                )}

                <div className="w-full h-px bg-card-light" />

                <button
                    type="button"
                    onClick={handleTogglePayments}
                    className="flex items-center gap-1.5 text-xs text-stannum hover:text-stannum-light transition-200 w-fit"
                >
                    Historial de pagos
                    <m.div
                        animate={{ rotate: showPayments ? 180 : 0 }}
                        transition={{ type: 'spring', bounce: 0 }}
                    >
                        <ArrowDownIcon className="size-2.5" />
                    </m.div>
                </button>

                <AnimatePresence initial={false}>
                    {showPayments && (
                        <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            {loadingPayments ? (
                                <div className="flex justify-center py-3">
                                    <SpinnerIcon className="size-4 animate-spin text-white/30" />
                                </div>
                            ) : paymentsError ? (
                                <p className="text-xs text-red-400 py-2">No pudimos cargar el historial. Intentá de nuevo.</p>
                            ) : payments.length === 0 ? (
                                <p className="text-xs text-white/40 py-2">No hay pagos registrados.</p>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {payments.map(payment => {
                                        const pStatus = paymentStatusConfig[payment.status] || { text: payment.status, className: 'text-white/40' };
                                        return (
                                            <div key={payment.id} className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg bg-card-light/50 text-xs">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <span className="text-white/50 shrink-0">
                                                        {new Date(payment.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </span>
                                                    <span className="font-semibold">{formatARS(payment.amount)}</span>
                                                    <span className={`shrink-0 ${pStatus.className}`}>{pStatus.text}</span>
                                                </div>
                                                {payment.status === 'approved' && payment.receiptNumber && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDownloadReceipt(payment.id)}
                                                        disabled={downloadingId === payment.id}
                                                        className="flex items-center gap-1 text-stannum hover:text-stannum-light transition-200 shrink-0 disabled:opacity-50"
                                                    >
                                                        <DownloadIcon className="size-3" />
                                                        {downloadingId === payment.id ? 'Descargando...' : downloadErrorId === payment.id ? 'Error' : 'Comprobante'}
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </m.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
