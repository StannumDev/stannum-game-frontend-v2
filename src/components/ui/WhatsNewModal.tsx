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
    RankingStarIcon,
    CommunityIcon,
} from '@/icons';

const WHATS_NEW_VERSION = '2026-04-27-c';
const COOKIE_KEY = `WHATS_NEW_${WHATS_NEW_VERSION}`;
const MODAL_ID = 'whats_new';
const MODAL_PRIORITY = 15;

interface PatchBullet {
    label?: string;
    text: React.ReactNode;
}

interface PatchNote {
    icon: React.ReactNode;
    tag: string;
    title: string;
    summary: React.ReactNode;
    bullets: PatchBullet[];
    accent: string;
}

const notes: PatchNote[] = [
    {
        icon: <RocketIcon className="text-base" />,
        tag: 'Niveles',
        title: 'Cambiamos cómo se sube de nivel',
        summary: <>Ajustamos cuánta experiencia hace falta para pasar al siguiente nivel. Ahora el progreso es <strong className="text-white/90">más parejo y predecible</strong>.</>,
        bullets: [
            { label: 'Arranque más rápido', text: 'los primeros niveles cuestan menos, para que entres en confianza desde el día 1.' },
            { label: 'Curva gradual', text: 'cada nivel pide un poco más, pero siempre de forma proporcional.' },
            { label: 'Nuevo techo', text: <>el nivel máximo ahora es <strong className="text-white">30</strong>. Antes era prácticamente imposible llegar tan alto.</> },
            { label: 'Nada perdido', text: 'tu experiencia acumulada se conservó. Solo recalculamos tu nivel con la fórmula nueva.' },
        ],
        accent: 'text-stannum',
    },
    {
        icon: <MedalIcon className="text-base" />,
        tag: 'Categorías',
        title: 'Nuevas categorías por nivel',
        summary: <>Cada alumno ahora pertenece a una <strong className="text-white/90">categoría según su nivel</strong>, parecido a las divisiones de un torneo. Aparece en tu perfil y en los rankings.</>,
        bullets: [
            { label: 'Hierro', text: 'del nivel 1 al 4' },
            { label: 'Bronce', text: 'del nivel 5 al 9' },
            { label: 'Plata', text: 'del nivel 10 al 14' },
            { label: 'Oro', text: 'del nivel 15 al 19' },
            { label: 'Diamante', text: 'del nivel 20 al 24' },
            { label: 'STANNUM', text: <>del nivel 25 al 30 — <strong className="text-white">la categoría más alta</strong></> },
        ],
        accent: 'text-amber-300',
    },
    {
        icon: <RankingStarIcon className="text-base" />,
        tag: 'Rankings',
        title: 'Un ranking por cada programa',
        summary: <>Antes había una sola tabla general que mezclaba a todos los alumnos. Ahora <strong className="text-white/90">cada programa tiene su propia tabla</strong>.</>,
        bullets: [
            { label: 'Tabla por programa', text: 'entrá a cualquier curso y vas a ver el ranking de los alumnos de ese programa.' },
            { label: 'Tabla general', text: 'sigue existiendo y combina toda tu actividad en la plataforma.' },
            { label: 'Comparación más justa', text: 'compararte con personas que están haciendo lo mismo que vos motiva más.' },
        ],
        accent: 'text-cyan-300',
    },
    {
        icon: <FireIcon className="text-base" />,
        tag: 'Constancia',
        title: 'Cómo funciona la racha diaria',
        summary: <>Por cada día consecutivo que entrás a aprender, ganás una <strong className="text-white/90">recompensa de experiencia</strong> que crece día a día.</>,
        bullets: [
            { label: 'Recompensa creciente', text: <>arrancás con <strong className="text-white">25 puntos</strong> el día 1 y llegás a <strong className="text-white">291</strong> a partir del séptimo día seguido.</> },
            { label: 'Escudo de racha', text: 'si comprás uno, te cubre un día que no puedas entrar. Tu racha sigue intacta.' },
            { label: 'Recuperación de 24 hs', text: 'si perdés la racha, tenés un día entero para reactivarla antes de que vuelva a cero.' },
        ],
        accent: 'text-orange-300',
    },
    {
        icon: <StoreIcon className="text-base" />,
        tag: 'Tins',
        title: 'Tins, la moneda interna',
        summary: <>Los <strong className="text-white/90">Tins</strong> son la moneda virtual de la plataforma. <strong className="text-white/90">No se compran con dinero real</strong>: se ganan estudiando, y los gastás en la Tienda.</>,
        bullets: [
            { label: 'Por cada lección', text: <><strong className="text-white">5 Tins</strong></> },
            { label: 'Por cada módulo completo', text: <><strong className="text-white">30 Tins</strong></> },
            { label: 'Por terminar un programa', text: <><strong className="text-white">100 Tins</strong></> },
            { label: 'Por instrucción corregida', text: <>entre <strong className="text-white">10 y 25 Tins</strong> según la nota</> },
            { label: 'Por desbloquear logros', text: 'medallas que obtenés al cumplir hitos en la plataforma' },
            { label: 'Backfill aplicado', text: <>si ya estabas en la plataforma, <strong className="text-white">ya te depositamos los Tins</strong> que te correspondían por toda tu actividad pasada.</> },
        ],
        accent: 'text-emerald-300',
    },
    {
        icon: <ChestIcon className="text-base" />,
        tag: 'Tienda',
        title: 'Qué podés comprar con Tins',
        summary: <>La Tienda es donde gastás los Tins. Hay cosas para <strong className="text-white/90">personalizar tu perfil</strong> y otras para <strong className="text-white/90">cuidar tu progreso</strong>.</>,
        bullets: [
            { label: 'Caja sorpresa — 400 Tins', text: 'contiene una recompensa al azar: más Tins, experiencia o portadas exclusivas.' },
            { label: 'Volver a hacer una instrucción — 200 Tins', text: 'si una nota no te gustó, podés rehacerla.' },
            { label: 'Escudo de racha — 25 Tins', text: 'cubre un día que no puedas entrar.' },
            { label: 'Recuperar racha — 30 Tins', text: 'reactivás una racha perdida dentro de las 24 horas.' },
            { label: 'Portadas de perfil', text: 'imágenes para decorar tu perfil en la comunidad.' },
        ],
        accent: 'text-purple-300',
    },
    {
        icon: <CommunityIcon className="text-base" />,
        tag: 'Comunidad',
        title: 'Compartí tus prompts y asistentes',
        summary: <>Sumamos un <strong className="text-white/90">espacio compartido</strong> donde los alumnos pueden subir los prompts y asistentes de IA que crean. Inspirate con lo que hacen otros y mostrá lo que vos armás.</>,
        bullets: [
            { label: 'Ganás Tins por likes', text: <><strong className="text-white">2 Tins</strong> por cada favorito que recibe una publicación tuya.</> },
            { label: 'Logros exclusivos', text: 'medallas especiales por publicar tu primer prompt y por recibir favoritos.' },
            { label: 'Filtros útiles', text: 'buscá por categoría, herramienta de IA, dificultad o popularidad.' },
        ],
        accent: 'text-pink-300',
    },
    {
        icon: <RouteIcon className="text-base" />,
        tag: 'Aprendizaje',
        title: 'Las instrucciones las corrige la IA',
        summary: <>Las actividades prácticas las revisa una <strong className="text-white/90">inteligencia artificial</strong> entrenada para evaluar tu trabajo. En segundos te devuelve nota y comentarios.</>,
        bullets: [
            { label: 'Puntaje del 0 al 100', text: 'con sugerencias concretas sobre qué mejorar.' },
            { label: 'Más nota, más recompensa', text: 'cuanto mejor te va, más experiencia y más Tins ganás.' },
            { label: 'Reintento disponible', text: 'si no estás conforme con la corrección, podés comprar un reintento en la Tienda.' },
        ],
        accent: 'text-blue-300',
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
            <div className="relative flex flex-col max-h-[85vh]">

                {/* Top accent line */}
                <m.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[2px] bg-gradient-to-r from-transparent via-stannum to-transparent origin-center shrink-0"
                />

                {/* Header (sticky) */}
                <div className="px-5 pt-6 pb-4 sm:px-7 sm:pt-7 border-b border-white/[0.06] shrink-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-stannum/30 bg-stannum/10">
                            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-stannum">
                                Novedades · Versión 2.0
                            </span>
                        </span>
                        <span className="text-[10px] text-white/40 tracking-wide">
                            27 abr 2026
                        </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-white">
                        Renovamos la plataforma
                    </h2>
                    <p className="mt-1.5 text-[13px] text-white/55 leading-relaxed">
                        Mejoramos cómo se sube de nivel, sumamos categorías, rankings por programa, una moneda interna y una sección de comunidad. Te contamos punto por punto qué cambia.
                    </p>
                </div>

                {/* Patch notes (scrollable) */}
                <div className="overflow-y-auto px-5 sm:px-7 py-5 space-y-5">
                    {notes.map((note, i) => (
                        <m.section
                            key={note.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.15 + i * 0.04,
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="border-l-2 border-white/[0.08] hover:border-white/20 pl-4 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className={`inline-flex items-center justify-center size-6 rounded-md bg-white/[0.04] border border-white/[0.08] ${note.accent}`}>
                                    {note.icon}
                                </span>
                                <span className={`text-[10px] font-bold tracking-[0.15em] uppercase ${note.accent}`}>
                                    {note.tag}
                                </span>
                            </div>
                            <h3 className="text-[16px] sm:text-[17px] font-black text-white leading-tight tracking-tight">
                                {note.title}
                            </h3>
                            <p className="mt-2 text-[13px] text-white/65 leading-relaxed">
                                {note.summary}
                            </p>
                            <ul className="mt-3 space-y-2">
                                {note.bullets.map((bullet, j) => (
                                    <li key={j} className="flex gap-2.5 text-[12.5px] leading-relaxed">
                                        <span className={`shrink-0 select-none mt-[6px] size-1 rounded-full ${note.accent.replace('text-', 'bg-')}`} />
                                        <span className="text-white/55">
                                            {bullet.label && (
                                                <strong className="text-white/95 font-bold">{bullet.label}:</strong>
                                            )}{' '}
                                            {bullet.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </m.section>
                    ))}

                    <p className="text-[11px] text-white/30 italic text-center pt-2">
                        Vas a encontrar todas estas novedades en el menú principal. Si algo no se entiende, escribinos.
                    </p>
                </div>

                {/* CTA (sticky bottom) */}
                <div className="px-5 sm:px-7 pt-4 pb-5 border-t border-white/[0.06] shrink-0">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="group relative w-full py-3 rounded-xl font-bold text-sm overflow-hidden transition-all duration-300"
                    >
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-stannum to-stannum-light" />
                        <div className="absolute inset-px rounded-[11px] bg-[#1a1a1a] group-hover:bg-transparent transition-colors duration-400" />
                        <span className="relative z-10 text-stannum group-hover:text-[#0a0a0a] transition-colors duration-400 flex items-center justify-center gap-2">
                            Entendido, quiero verlo
                            <m.span
                                initial={{ x: 0 }}
                                animate={{ x: [0, 3, 0] }}
                                transition={{ delay: 1.2, duration: 0.8, repeat: Infinity, repeatDelay: 3 }}
                            >
                                →
                            </m.span>
                        </span>
                    </button>
                </div>
            </div>
        </Modal>
    );
};
