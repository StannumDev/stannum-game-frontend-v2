'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { getMyOrders } from '@/services/payment';
import type { OrderDetails } from '@/services/payment';
import { StoreIcon } from '@/icons';
import { PurchaseCard } from './PurchaseCard';

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0 } },
};

export const PurchaseList = () => {
    const [orders, setOrders] = useState<OrderDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await getMyOrders();
                setOrders(result.orders);
            } catch (err) {
                void err;
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="card !p-0 flex overflow-hidden animate-pulse">
                        <div className="w-28 lg:w-40 shrink-0 bg-card-light" />
                        <div className="grow p-4 lg:p-5 flex flex-col gap-3">
                            <div className="h-4 w-1/3 bg-card-light rounded" />
                            <div className="h-3 w-1/2 bg-card-light rounded" />
                            <div className="h-4 w-1/4 bg-card-light rounded" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="size-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">!</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Error al cargar</h3>
                <p className="text-white/50 text-sm">Ocurrió un error al cargar tus compras. Intentá de nuevo más tarde.</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <m.div
                className="flex flex-col items-center justify-center text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', bounce: 0 }}
            >
                <StoreIcon className="text-5xl text-card-lightest mb-4" />
                <h3 className="text-lg font-bold mb-2">No tenés compras todavía</h3>
                <p className="text-white/50 text-sm max-w-sm mb-6">
                    Cuando compres un programa, va a aparecer acá con todos los detalles.
                </p>
                <Link href="/dashboard/store" className="px-6 py-3 rounded-lg bg-stannum text-black font-bold hover:bg-stannum-light transition-200">
                    Ir a la tienda
                </Link>
            </m.div>
        );
    }

    return (
        <m.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-4"
        >
            {orders.map(order => (
                <m.div key={order.id} variants={fadeUp}>
                    <PurchaseCard order={order} />
                </m.div>
            ))}
        </m.div>
    );
};
