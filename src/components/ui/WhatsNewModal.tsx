'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { m } from 'framer-motion';
import { Modal } from '@/components';
import { useModalQueueStore } from '@/stores/modalQueueStore';
import {
    MedalIcon,
    FireIcon,
    RocketIcon,
    StoreIcon,
    ChestIcon,
    RouteIcon,
} from '@/icons';

const COOKIE_KEY = 'WHATS_NEW_V2';
const MODAL_ID = 'whats_new';
const MODAL_PRIORITY = 15;

interface UpdateItem {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}

const updates: UpdateItem[] = [
    {
        icon: <MedalIcon className="text-xl" />,
        title: 'Rangos por nivel',
        description: 'Hierro, Bronce, Plata, Oro, Diamante y STANNUM. Los niveles se rebalancearon para el nuevo sistema de rachas.',
        color: 'text-amber-400',
    },
    {
        icon: <FireIcon className="text-xl" />,
        title: 'Rachas mejoradas',
        description: 'Protege tu racha con escudos y recuperala si la perdes. Bonus de XP y Tins crecientes por dia consecutivo.',
        color: 'text-orange-400',
    },
    {
        icon: <StoreIcon className="text-xl" />,
        title: 'Tienda con Tins',
        description: 'Gasta tus Tins en portadas de perfil, escudos de racha, cajas misteriosas y reintentos de instrucciones.',
        color: 'text-emerald-400',
    },
    {
        icon: <ChestIcon className="text-xl" />,
        title: 'Cofres de recompensa',
        description: 'Desbloquealos al completar lecciones e instrucciones. Contienen XP, Tins y portadas exclusivas.',
        color: 'text-purple-400',
    },
    {
        icon: <RouteIcon className="text-xl" />,
        title: 'Instrucciones con IA',
        description: 'Actividades practicas calificadas por inteligencia artificial con feedback constructivo y puntaje.',
        color: 'text-cyan-400',
    },
    {
        icon: <RocketIcon className="text-xl" />,
        title: 'Programas y suscripciones',
        description: 'Nuevos programas disponibles en la tienda. Compra unica o suscripcion mensual con Mercado Pago.',
        color: 'text-pink-400',
    },
];

export const WhatsNewModal = () => {
    const isMyTurn = useModalQueueStore(s => s.queue[0]?.id === MODAL_ID);
    const request = useModalQueueStore(s => s.request);
    const release = useModalQueueStore(s => s.release);
    const [showModal, setShowModal] = useState(false);
    const [wantsToShow, setWantsToShow] = useState(false);

    useEffect(() => {
        if (Cookies.get(COOKIE_KEY)) return;
        const tutorialFinished = Cookies.get('tutorial_initial_tutorial') === 'true';
        if (!tutorialFinished) return;

        const timer = setTimeout(() => {
            setWantsToShow(true);
            request(MODAL_ID, MODAL_PRIORITY);
        }, 800);
        return () => clearTimeout(timer);
    }, [request]);

    useEffect(() => {
        if (wantsToShow && isMyTurn) {
            setShowModal(true);
        }
    }, [wantsToShow, isMyTurn]);

    const handleClose = () => {
        Cookies.set(COOKIE_KEY, '1', { expires: 365 });
        setShowModal(false);
        release(MODAL_ID);
    };

    return (
        <Modal
            showModal={showModal}
            setShowModal={(v) => { setShowModal(v); if (!v) handleClose(); }}
            className="max-w-2xl p-0"
        >
            <div className="p-5 sm:p-6 flex-1 overflow-y-auto">
                <m.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-center"
                >
                    <p className="text-xs font-semibold uppercase tracking-widest text-stannum">Actualizacion</p>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
                        Que hay de nuevo
                    </h2>
                    <p className="mt-1 text-sm text-white/50">
                        Mejoras en gamificacion, economía y contenido
                    </p>
                </m.div>

                <div className="mt-6 space-y-3">
                    {updates.map((item, i) => (
                        <m.div
                            key={item.title}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 + i * 0.06 }}
                            className="flex items-start gap-3 rounded-lg bg-white/[0.03] border border-white/[0.06] px-4 py-3"
                        >
                            <div className={`mt-0.5 shrink-0 ${item.color}`}>
                                {item.icon}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-white leading-tight">{item.title}</p>
                                <p className="mt-0.5 text-xs text-white/50 leading-relaxed">{item.description}</p>
                            </div>
                        </m.div>
                    ))}
                </div>

                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65 }}
                    className="mt-6 flex flex-col gap-2"
                >
                    <button
                        type="button"
                        onClick={handleClose}
                        className="w-full py-3 bg-stannum text-card rounded-xl font-bold text-sm hover:bg-stannum-light transition-200"
                    >
                        Entendido
                    </button>
                </m.div>
            </div>
        </Modal>
    );
};
