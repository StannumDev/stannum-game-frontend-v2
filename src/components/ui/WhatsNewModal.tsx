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

const WHATS_NEW_VERSION = '2025-04-15';
const COOKIE_KEY = `WHATS_NEW_${WHATS_NEW_VERSION}`;
const MODAL_ID = 'whats_new';
const MODAL_PRIORITY = 15;

interface UpdateItem {
    icon: React.ReactNode;
    title: string;
    description: string;
    accent: string;
    glow: string;
}

const updates: UpdateItem[] = [
    {
        icon: <MedalIcon className="text-lg" />,
        title: 'Rangos por nivel',
        description: 'Hierro, Bronce, Plata, Oro, Diamante y STANNUM. Los niveles se rebalancearon para el nuevo sistema de rachas.',
        accent: 'text-amber-400',
        glow: 'bg-amber-400',
    },
    {
        icon: <FireIcon className="text-lg" />,
        title: 'Rachas mejoradas',
        description: 'Protege tu racha con escudos y recuperala si la perdes. Bonus de XP y Tins crecientes por dia consecutivo.',
        accent: 'text-orange-400',
        glow: 'bg-orange-400',
    },
    {
        icon: <StoreIcon className="text-lg" />,
        title: 'Tienda con Tins',
        description: 'Gasta tus Tins en portadas de perfil, escudos de racha, cajas misteriosas y reintentos de instrucciones.',
        accent: 'text-emerald-400',
        glow: 'bg-emerald-400',
    },
    {
        icon: <ChestIcon className="text-lg" />,
        title: 'Cofres de recompensa',
        description: 'Desbloquealos al completar lecciones e instrucciones. Contienen XP, Tins y portadas exclusivas.',
        accent: 'text-purple-400',
        glow: 'bg-purple-400',
    },
    {
        icon: <RouteIcon className="text-lg" />,
        title: 'Instrucciones con IA',
        description: 'Actividades practicas calificadas por inteligencia artificial con feedback constructivo y puntaje.',
        accent: 'text-cyan-400',
        glow: 'bg-cyan-400',
    },
    {
        icon: <RocketIcon className="text-lg" />,
        title: 'Programas y suscripciones',
        description: 'Nuevos programas disponibles en la tienda. Compra unica o suscripcion mensual con Mercado Pago.',
        accent: 'text-pink-400',
        glow: 'bg-pink-400',
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
        const tutorialFinished = Cookies.get('tutorial_initial_tutorial_v2') === 'true';
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
            <div className="relative overflow-hidden">

                {/* Decorative glow orbs */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-stannum/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-stannum/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top accent line */}
                <m.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[2px] bg-gradient-to-r from-transparent via-stannum to-transparent origin-center"
                />

                <div className="relative z-10 px-5 pt-6 pb-5 sm:px-7 sm:pt-8 sm:pb-6">

                    {/* Header */}
                    <m.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-center"
                    >
                        <m.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-stannum/25 bg-stannum/[0.07] mb-4"
                        >
                            <span className="relative flex size-1.5">
                                <span className="animate-ping absolute inline-flex size-full rounded-full bg-stannum opacity-75" />
                                <span className="relative inline-flex size-1.5 rounded-full bg-stannum" />
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stannum">
                                Gran actualización
                            </span>
                        </m.div>

                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                            <span className="text-white">Qué hay de </span>
                            <span className="bg-gradient-to-r from-stannum to-stannum-light bg-clip-text text-transparent">nuevo</span>
                        </h2>
                        <p className="mt-1.5 text-sm text-white/40">
                            6 mejoras que cambian el juego por completo
                        </p>
                    </m.div>

                    {/* Feature grid */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {updates.map((item, i) => (
                            <m.div
                                key={item.title}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.25 + i * 0.07,
                                    duration: 0.45,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 p-3.5 overflow-hidden"
                            >
                                {/* Subtle corner glow on hover */}
                                <div className={`absolute -top-6 -right-6 size-12 ${item.glow} opacity-0 group-hover:opacity-[0.08] rounded-full blur-xl transition-opacity duration-500 pointer-events-none`} />

                                <div className="relative z-10 flex items-start gap-3">
                                    <div className={`shrink-0 size-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center ${item.accent} group-hover:border-current/20 transition-colors duration-300`}>
                                        {item.icon}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[13px] font-bold text-white leading-tight tracking-tight">{item.title}</p>
                                        <p className="mt-0.5 text-[11px] text-white/40 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </m.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <m.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.4 }}
                        className="mt-6"
                    >
                        <button
                            type="button"
                            onClick={handleClose}
                            className="group relative w-full py-3 rounded-xl font-bold text-sm overflow-hidden transition-all duration-300"
                        >
                            {/* Gradient border + fill effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-stannum to-stannum-light" />
                            <div className="absolute inset-px rounded-[11px] bg-[#1a1a1a] group-hover:bg-transparent transition-colors duration-400" />
                            <span className="relative z-10 text-stannum group-hover:text-[#0a0a0a] transition-colors duration-400 flex items-center justify-center gap-2">
                                Entendido
                                <m.span
                                    initial={{ x: 0 }}
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ delay: 1.2, duration: 0.8, repeat: Infinity, repeatDelay: 3 }}
                                >
                                    →
                                </m.span>
                            </span>
                        </button>
                    </m.div>
                </div>
            </div>
        </Modal>
    );
};
