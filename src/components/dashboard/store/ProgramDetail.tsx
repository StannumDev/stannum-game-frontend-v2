'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import MuxPlayer from '@mux/mux-player-react/lazy';
import { Program } from '@/interfaces';
import { useUserStore } from '@/stores/userStore';
import {
    ChestIcon, CrownIcon, MedalIcon,
    StarIcon, VideosIcon,
    CompassIcon, CheckIcon, KeyIcon,
} from '@/icons';
import stannum_coin from '@/assets/tins_coin.svg';
import { achievements } from '@/config/achievements';
import { GoBackButton } from '@/components/ui/GoBackButton';
import { ProgramModulePreview } from './ProgramModulePreview';
import { ProgramPurchasePanel } from './ProgramPurchasePanel';
import { hasAccess, formatARS } from '@/utilities';
import '@/components/styles/lessonVideoPlayer.css';

const programCategoryMap: Record<string, string> = {
    tia: 'tia',
    tia_summer: 'summer',
    tia_pool: 'pool',
    tmd: 'tmd',
    trenno_ia: 'tia',
    demo_trenno: 'tia',
};

interface Props {
    program: Program;
}

function computeStats(program: Program) {
    let totalLessons = 0;
    let totalModules = 0;
    let totalInstructions = 0;
    let totalDurationSec = 0;
    let totalXP = 0;

    for (const section of program.sections) {
        if (!section.modules) continue;
        for (const mod of section.modules) {
            totalModules++;
            totalLessons += mod.lessons.length;
            totalInstructions += mod.instructions.length;
            for (const lesson of mod.lessons) totalDurationSec += lesson.duration;
            for (const instruction of mod.instructions) {
                totalXP += instruction.rewardXP;
                totalDurationSec += instruction.estimatedTimeSec;
            }
        }
    }

    return { totalLessons, totalModules, totalInstructions, totalDurationSec, totalXP, totalHours: Math.ceil(totalDurationSec / 3600) };
}

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0 } },
};

export const ProgramDetail = ({ program }: Props) => {
    const user = useUserStore(s => s.user);
    const isPurchased = hasAccess(user?.programs?.[program.id]);
    const stats = useMemo(() => computeStats(program), [program]);

    const trailerLesson = useMemo(() => {
        for (const section of program.sections) {
            for (const mod of section.modules ?? []) {
                if (mod.lessons.length > 0 && mod.lessons[0].muxPlaybackId) {
                    return mod.lessons[0];
                }
            }
        }
        return null;
    }, [program]);

    const programAchievements = useMemo(() => {
        const cat = programCategoryMap[program.id];
        return cat ? achievements.filter(a => a.categories.includes(cat as never)) : [];
    }, [program.id]);

    const gameFeatures = [
        {
            icon: <ChestIcon className="size-5 text-amber-400" />,
            title: 'Cofres de recompensa',
            desc: 'Desbloquea cofres al completar modulos y gana Tins, XP y portadas exclusivas.',
            color: 'border-amber-400/20 bg-amber-400/[0.04]',
            titleColor: 'text-amber-400',
            iconBg: 'bg-amber-400/15',
        },
        {
            icon: <Image src={stannum_coin} alt="Tins" width={20} height={20} />,
            title: 'Tins',
            desc: 'Gana la moneda virtual de STANNUM completando lecciones e instrucciones.',
            color: 'border-amber-400/20 bg-amber-400/[0.04]',
            titleColor: 'text-amber-400',
            iconBg: 'bg-amber-400/10',
        },
        {
            icon: <CrownIcon className="size-5 text-stannum" />,
            title: 'XP y niveles',
            desc: 'Cada leccion e instruccion te da XP. Subi de nivel y desbloquea logros exclusivos.',
            color: 'border-stannum/20 bg-stannum/[0.04]',
            titleColor: 'text-stannum',
            iconBg: 'bg-stannum/10',
        },
        {
            icon: <MedalIcon className="size-5 text-stannum" />,
            title: 'Ranking competitivo',
            desc: 'Competi con otros jugadores y escala posiciones en la tabla de lideres.',
            color: 'border-stannum/20 bg-stannum/[0.04]',
            titleColor: 'text-stannum',
            iconBg: 'bg-stannum/10',
        },
        ...(stats.totalInstructions > 0 ? [{
            icon: <CompassIcon className="size-5 text-stannum" />,
            title: `${stats.totalInstructions} instrucciones`,
            desc: 'Instrucciones con niveles de dificultad, recompensas en XP y feedback real.',
            color: 'border-stannum/20 bg-stannum/[0.04]',
            titleColor: 'text-stannum',
            iconBg: 'bg-stannum/10',
        }] : []),
        {
            icon: <StarIcon className="size-5 text-stannum" />,
            title: 'Portadas de perfil',
            desc: 'Desbloquea portadas exclusivas a traves de cofres y la tienda de Tins.',
            color: 'border-stannum/20 bg-stannum/[0.04]',
            titleColor: 'text-stannum',
            iconBg: 'bg-stannum/10',
        },
    ];

    const statItems = [
        { icon: <VideosIcon className="size-5 text-stannum" />, value: stats.totalLessons, label: 'Lecciones' },
        { icon: <CompassIcon className="size-5 text-stannum" />, value: stats.totalInstructions, label: 'Instrucciones' },
        { icon: <ChestIcon className="size-5 text-amber-400" />, value: stats.totalModules, label: 'Cofres' },
        { icon: <MedalIcon className="size-5 text-stannum" />, value: programAchievements.length, label: 'Logros' },
    ];

    let moduleIndex = 0;

    return (
        <div className="w-full flex flex-col gap-6">
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full relative rounded-xl overflow-hidden"
            >
                <div className="size-full bg-gradient-to-t from-black via-black/60 to-transparent absolute top-0 left-0 z-10" />
                <div className="size-full bg-gradient-to-r from-black/50 to-transparent absolute top-0 left-0 z-10" />
                <Image src={program.background} alt={program.name} className="size-full object-cover absolute top-0 left-0 z-0" priority />

                <div className="hidden lg:block relative z-20 pt-6 pl-6">
                    <GoBackButton href="/dashboard/store" className="bg-black/40 hover:bg-black/60" />
                </div>

                <m.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="relative z-20 p-6 pt-6 pb-8 lg:p-8 lg:pt-8 lg:pb-10 flex flex-col gap-4"
                >
                    <m.div variants={fadeUp}>
                        <Image src={program.logo} alt={program.name} className="w-48 lg:w-64" />
                    </m.div>
                    <m.p variants={fadeUp} className="text-sm lg:text-base text-white/80 max-w-xl leading-relaxed">
                        {program.description}
                    </m.p>
                    {program.type === 'subscription' && program.subscriptionPriceARS ? (
                        <m.div variants={fadeUp} className="lg:hidden flex flex-col items-end self-end">
                            <span className="text-2xl font-black">{formatARS(program.subscriptionPriceARS)}</span>
                            <span className="text-[11px] text-white/50">por mes</span>
                        </m.div>
                    ) : program.purchasable && program.price > 0 ? (
                        <m.div variants={fadeUp} className="lg:hidden flex items-end gap-1 self-end">
                            <span className="text-2xl font-black">{program.price}</span>
                            <span className="text-sm text-white/60 mb-0.5">USD</span>
                        </m.div>
                    ) : program.purchasable && program.price === 0 ? (
                        <m.span variants={fadeUp} className="lg:hidden text-2xl font-black text-stannum self-end">Gratis</m.span>
                    ) : null}
                </m.div>
            </m.div>

            <m.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3"
            >
                {statItems.map((stat, i) => (
                    <m.div
                        key={i}
                        variants={fadeUp}
                        className="p-4 rounded-lg bg-card border border-card flex items-center gap-3"
                    >
                        <div className="size-10 rounded-full bg-stannum/10 flex justify-center items-center shrink-0">
                            {stat.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black">{stat.value}</span>
                            <span className="text-xs text-white/40">{stat.label}</span>
                        </div>
                    </m.div>
                ))}
            </m.div>

            <div className="w-full flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-2/3 flex flex-col gap-6">

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', bounce: 0, delay: 0.05 }}
                        className="card p-0 overflow-hidden rounded-xl"
                    >
                        {trailerLesson && (
                            <div className="w-full aspect-video relative">
                                <MuxPlayer
                                    className="size-full absolute top-0 left-0"
                                    playbackId={trailerLesson.muxPlaybackId}
                                    envKey={process.env.NEXT_PUBLIC_MUX_TOKEN_DATA}
                                    preload="auto"
                                    playsInline
                                    streamType="on-demand"
                                    thumbnailTime={5}
                                    forwardSeekOffset={5}
                                    backwardSeekOffset={5}
                                    defaultShowRemainingTime
                                    defaultHiddenCaptions
                                    primaryColor="rgba(255,255,255,1)"
                                    accentColor="#00FFCC"
                                    metadataVideoId={trailerLesson.id}
                                    metadataVideoTitle={`Trailer - ${program.name}`}
                                    title={`Trailer - ${program.name}`}
                                />
                            </div>
                        )}
                        {program.longDescription && (
                            <div className="px-6 py-6">
                                <h2 className="title-2 mb-4">Acerca de este programa</h2>
                                {/* SAFE: program.longDescription is static trusted HTML from src/config/programs/index.ts */}
                                <div
                                    className="text-sm lg:text-base text-white/70 leading-relaxed space-y-3 [&_strong]:text-white [&_p]:mb-0"
                                    dangerouslySetInnerHTML={{ __html: program.longDescription }}
                                />
                            </div>
                        )}
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', bounce: 0, delay: 0.15 }}
                        className="card p-6"
                    >
                        <h2 className="title-2 mb-4">Lo que vas a aprender</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {program.sections.flatMap(s => s.modules ?? []).map((mod) => (
                                <div key={mod.id} className="flex items-start gap-3 p-3 rounded-lg bg-card-light/30">
                                    <div className="mt-0.5 size-5 rounded-full bg-stannum/20 flex justify-center items-center shrink-0">
                                        <CheckIcon className="size-3 text-stannum" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">{mod.name}</span>
                                        <span className="text-xs text-white/50">{mod.description}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', bounce: 0, delay: 0.2 }}
                        className="card p-6"
                    >
                        <h2 className="title-2 mb-2">Experiencia de juego incluida</h2>
                        <p className="text-sm text-white/50 mb-6">
                            Cada programa en STANNUM Game incluye mecanicas de juego que hacen tu aprendizaje mas dinamico y competitivo.
                        </p>
                        <m.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={stagger}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                            {gameFeatures.map((f, i) => (
                                <m.div key={i} variants={fadeUp} className={`p-3 rounded-lg border ${f.color} flex items-center gap-3`}>
                                    <div className={`size-10 rounded-full ${f.iconBg} flex justify-center items-center shrink-0`}>
                                        {f.icon}
                                    </div>
                                    <div>
                                        <span className={`text-sm font-bold ${f.titleColor}`}>{f.title}</span>
                                        <p className="mt-1 text-xs text-white/50">{f.desc}</p>
                                    </div>
                                </m.div>
                            ))}
                        </m.div>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', bounce: 0, delay: 0.25 }}
                        className="card p-6"
                    >
                        <h2 className="title-2 mb-2">Contenido del programa</h2>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-6 text-sm text-white/50">
                            <span>{stats.totalModules} modulos</span>
                            <span className="text-white/20">|</span>
                            <span>{stats.totalLessons} lecciones</span>
                            <span className="text-white/20">|</span>
                            <span>{stats.totalInstructions} instrucciones</span>
                            <span className="text-white/20">|</span>
                            <span>{stats.totalHours}h+ de contenido</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            {program.sections.map(section => (
                                <div key={section.id} className="flex flex-col gap-2">
                                    {section.modules?.map(mod => {
                                        moduleIndex++;
                                        return (
                                            <ProgramModulePreview
                                                key={mod.id}
                                                module={mod}
                                                index={moduleIndex}
                                                defaultOpen={moduleIndex === 1}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </m.div>

                </div>

                <div className="hidden lg:block lg:w-1/3">
                    <ProgramPurchasePanel program={program} isPurchased={isPurchased} />
                </div>
            </div>

            {(program.price >= 0 || program.type === 'subscription' || program.type === 'demo') && (
                <>
                    <div className="lg:hidden h-9" />
                    <div className="lg:hidden z-[999] px-4 pt-4 pb-2 bg-gradient-to-t from-background via-background to-transparent" style={{ position: 'fixed', left: 0, right: 0, bottom: 'calc(3.5rem + env(safe-area-inset-bottom))' }}>
                        {isPurchased ? (
                            <Link href={`/dashboard/library/${program.id}`} className="w-full py-3.5 rounded-lg bg-stannum text-black font-bold text-center flex items-center justify-center hover:bg-stannum-light transition-200">
                                Ir al programa
                            </Link>
                        ) : program.type === 'demo' ? (
                            <Link href={`/dashboard/library/${program.id}`} className="w-full py-3.5 rounded-lg bg-stannum text-black font-bold text-center flex items-center justify-center gap-2 hover:bg-stannum-light transition-200">
                                Probar gratis
                            </Link>
                        ) : program.type === 'subscription' && program.subscriptionPriceARS ? (
                            <Link href={`/dashboard/subscription/checkout/${program.id}`} className="w-full py-3.5 rounded-lg bg-stannum text-black font-bold text-center flex items-center justify-center gap-2 hover:bg-stannum-light transition-200">
                                Suscribirme — {formatARS(program.subscriptionPriceARS)}/mes
                            </Link>
                        ) : !program.purchasable ? (
                            <Link href="/dashboard?activar=true" className="w-full py-3.5 rounded-lg bg-card-light text-white font-bold text-center flex items-center justify-center gap-2 hover:bg-white/10 transition-200">
                                <KeyIcon className="size-4" />
                                Activar clave
                            </Link>
                        ) : (
                            <Link href={`/dashboard/checkout/${program.id}`} className="w-full py-3.5 rounded-lg bg-stannum text-black font-bold text-center flex items-center justify-center gap-2 hover:bg-stannum-light transition-200">
                                {program.price === 0 ? 'Empezar ahora' : `Comprar ahora — ${program.price} USD`}
                            </Link>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
