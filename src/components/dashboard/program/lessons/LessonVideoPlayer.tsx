'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import MuxPlayer from '@mux/mux-player-react/lazy';
import type MuxPlayerElement from "@mux/mux-player";
import { createBlurUp } from '@mux/blurup';
import { markLessonAsCompleted, saveLastWatchedLesson } from "@/services";
import type { LessonCompletionResult } from "@/services/lesson";
import { Lesson } from '@/interfaces';
import { errorHandler } from "@/helpers";
import { CrownIcon, ChestIcon } from "@/icons";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import stannum_coin from "@/assets/tins_coin.svg";
import { useUserStore } from '@/stores/userStore';
import '@/components/styles/lessonVideoPlayer.css';

interface Props {
    program: string;
    lesson: Lesson;
    moduleLessons: Array<Lesson>;
    isCompleted: boolean;
    isNextLessonAvailable: boolean;
    nextInstruction?: { id: string; title: string };
    nextModule?: { name: string; firstLessonId: string };
    nextChest?: { id: string; name: string; moduleHref: string };
    userId: string;
}

interface BlurData {
    blurDataURL: string;
    aspectRatio: number;
}

const END_THRESHOLD = 10;
const NEXT_COUNTDOWN = 15;
const SAVE_INTERVAL_MS = 10_000;

export const LessonVideoPlayer = ({ program, lesson, moduleLessons, isCompleted, isNextLessonAvailable, nextInstruction, nextModule, nextChest, userId }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const refreshUser = useUserStore(s => s.refreshUser);

    const videoRef = useRef<MuxPlayerElement | null>(null);
    const [blurData, setBlurData] = useState<BlurData>({ blurDataURL: "", aspectRatio: 16 / 9 });

    const markedAsCompleted = useRef(isCompleted);
    const [countdown, setCountdown] = useState(NEXT_COUNTDOWN);
    const [showNextOverlay, setShowNextOverlay] = useState(false);
    const [cancelNext, setCancelNext] = useState(false);
    const [xpResult, setXpResult] = useState<LessonCompletionResult | null>(null);

    const redirectTimeout = useRef<NodeJS.Timeout | null>(null);
    const hasStartedRedirect = useRef(false);
    const lastTimeRef = useRef(0);
    const initialSeekApplied = useRef(false);

    const currentIndex = moduleLessons.findIndex(l => l.id === lesson.id);
    const nextLesson = moduleLessons[currentIndex + 1];

    useEffect(() => {
        const fetchBlurData = async () => {
            try {
                const { blurDataURL, aspectRatio } = await createBlurUp(lesson.muxPlaybackId);
                setBlurData({ blurDataURL, aspectRatio });
            } catch {
                setBlurData({ blurDataURL: "", aspectRatio: 16 / 9 });
            }
        };
        fetchBlurData();

        const progressInterval = setInterval(() => {
            if (lastTimeRef.current > 0 && !markedAsCompleted.current && !hasStartedRedirect.current) {
                 saveLastWatchedLesson(program.toLowerCase(), lesson.id, lastTimeRef.current).catch((e) => {
                    if (process.env.NEXT_PUBLIC_ENV === 'development') console.error('Failed to save lesson progress:', e);
                 });
            }
        }, SAVE_INTERVAL_MS);

        initialSeekApplied.current = false;
        hasStartedRedirect.current = false;

        return () => {
            if (redirectTimeout.current) {
                clearInterval(redirectTimeout.current);
                redirectTimeout.current = null;
            }
            if (progressInterval) clearInterval(progressInterval);
            if (lastTimeRef.current > 0 && !markedAsCompleted.current) {
                saveLastWatchedLesson(program.toLowerCase(), lesson.id, lastTimeRef.current).catch((e) => {
                    if (process.env.NEXT_PUBLIC_ENV === 'development') console.error('Failed to save lesson progress on cleanup:', e);
                });
            }
            hasStartedRedirect.current = false;
        };
    }, [lesson.muxPlaybackId, lesson.id, program]);

    useEffect(() => {
        if (showNextOverlay && xpResult && xpResult.totalGain > 0) {
            import('canvas-confetti').then(({ default: confetti }) => {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }).catch(() => {});
        }
    }, [showNextOverlay, xpResult]);

    const handleTimeUpdate = async () => {
        if (!videoRef.current) return;

        const duration = videoRef.current.duration;
        const currentTime = videoRef.current.currentTime;
        lastTimeRef.current = Math.floor(currentTime);
        const remaining = Number.isFinite(duration) ? duration - currentTime : Infinity;

        if (remaining <= END_THRESHOLD && !markedAsCompleted.current) {
            markedAsCompleted.current = true;
            try {
                const result = await markLessonAsCompleted(program.toLowerCase(), lesson.id);
                setXpResult(result);
                refreshUser();
            } catch (error:unknown) {
                errorHandler(error);
            }
        }

        if (remaining <= END_THRESHOLD && !hasStartedRedirect.current && !cancelNext) {
            hasStartedRedirect.current = true;

            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
            }

            setShowNextOverlay(true);

            let counter = NEXT_COUNTDOWN;
            setCountdown(counter);

            redirectTimeout.current = setInterval(() => {
                counter--;
                setCountdown(counter);
                if (counter <= 0) {
                    clearInterval(redirectTimeout.current!);
                    redirectTimeout.current = null;
                    if (nextLesson && isNextLessonAvailable) {
                        router.push(`/dashboard/library/${program.toLowerCase()}/lessons/${nextLesson.id}`);
                    } else if (nextInstruction) {
                        router.push(`/dashboard/library/${program.toLowerCase()}/instructions/${nextInstruction.id}`);
                    } else if (nextModule) {
                        router.push(`/dashboard/library/${program.toLowerCase()}/lessons/${nextModule.firstLessonId}`);
                    } else {
                        router.push(`/dashboard/library/${program.toLowerCase()}`);
                    }
                }
            }, 1000);
        }
    };

    const cancelRedirect = () => {
        if (redirectTimeout.current) {
            clearInterval(redirectTimeout.current);
            redirectTimeout.current = null;
        }
        hasStartedRedirect.current = false;
        setShowNextOverlay(false);
        setCountdown(NEXT_COUNTDOWN);
        setCancelNext(true);
    };

    const startAt = useMemo(() => {
        const tParam = Number(searchParams.get("t"));
        return Number.isFinite(tParam) && tParam >= 0 ? tParam : 0;
    }, [searchParams]);

    const handleLoadedMetadata = () => {
        if (!videoRef.current || initialSeekApplied.current) return;
        const duration = videoRef.current.duration;
        const maxSafe = Number.isFinite(duration) && duration > 0 ? Math.max(0, duration - (END_THRESHOLD + 1)) : undefined;
        const safeTarget = typeof maxSafe === "number" ? Math.min(Math.max(0, startAt), maxSafe) : Math.max(0, startAt);
        try {
            videoRef.current.currentTime = safeTarget;
            lastTimeRef.current = Math.floor(safeTarget);
            initialSeekApplied.current = true;
        } catch (error:unknown) {
            if(process.env.NEXT_PUBLIC_ENV === 'development') console.error("Error seeking video:", error);
        }
    };

    return (
        <div className='w-full aspect-video relative rounded-lg border border-card cursor-pointer overflow-hidden'>
            {showNextOverlay && nextLesson && isNextLessonAvailable && (
                <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center gap-4 text-white p-4 transition-opacity">
                    {xpResult && xpResult.totalGain > 0 && (
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-sm font-semibold text-stannum">¡Lección completada!</p>
                            <div className="flex items-center gap-2">
                                <CrownIcon className="size-8 text-stannum" />
                                <span className="text-4xl font-black">+</span>
                                <AnimatedCounter target={xpResult.totalGain} className="text-4xl font-black text-stannum" />
                                <span className="text-4xl font-black">XP</span>
                            </div>
                            {xpResult.streakBonus > 0 && (
                                <p className="text-sm text-white/60">Incluye +{xpResult.streakBonus} XP por racha diaria</p>
                            )}
                            {xpResult.coinsGained > 0 && (
                                <div className="flex items-center gap-1.5 mt-1">
                                    <Image src={stannum_coin} alt="Tins" width={16} height={16} />
                                    <span className="text-sm font-bold text-amber-400">+{xpResult.coinsGained} Tins</span>
                                </div>
                            )}
                        </div>
                    )}
                    {xpResult && xpResult.totalGain > 0 && <div className="w-32 border-t border-white/20" />}
                    {nextChest && (
                        <button
                            type="button"
                            onClick={() => { cancelRedirect(); router.push(nextChest.moduleHref); }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 font-semibold rounded-lg transition-200"
                        >
                            <ChestIcon className="size-4" />
                            <span>¡Cofre desbloqueado! Reclamalo</span>
                        </button>
                    )}
                    <p className="text-lg font-bold text-center">Siguiente lección en {countdown} segundos...</p>
                    <div className="flex items-center gap-4 w-full max-w-md">
                        <Image
                            width={160}
                            height={90}
                            alt="Miniatura"
                            src={`https://image.mux.com/${nextLesson.muxPlaybackId}/thumbnail.png?width=160&height=90&time=5`}
                            className="rounded-lg"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <div className="flex-1">
                            <p className="text-sm opacity-80">Siguiente lección</p>
                            <p className="font-semibold">{nextLesson.title}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-2">
                        <button type="button" onClick={cancelRedirect} className="px-6 py-2.5 bg-card-light hover:bg-card-lighter text-white font-semibold rounded-lg transition-200">Cancelar</button>
                        <button type="button" onClick={() => router.push(`/dashboard/library/${program.toLowerCase()}/lessons/${nextLesson.id}`)} className="px-6 py-2.5 bg-stannum hover:bg-stannum-light text-card font-bold rounded-lg transition-200">Siguiente lección</button>
                    </div>
                </div>
            )}
            {showNextOverlay && nextInstruction && (!nextLesson || !isNextLessonAvailable) && (
                <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center gap-4 text-white p-4 transition-opacity">
                    {xpResult && xpResult.totalGain > 0 && (
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-sm font-semibold text-stannum">¡Lección completada!</p>
                            <div className="flex items-center gap-2">
                                <CrownIcon className="size-8 text-stannum" />
                                <span className="text-4xl font-black">+</span>
                                <AnimatedCounter target={xpResult.totalGain} className="text-4xl font-black text-stannum" />
                                <span className="text-4xl font-black">XP</span>
                            </div>
                            {xpResult.streakBonus > 0 && (
                                <p className="text-sm text-white/60">Incluye +{xpResult.streakBonus} XP por racha diaria</p>
                            )}
                            {xpResult.coinsGained > 0 && (
                                <div className="flex items-center gap-1.5 mt-1">
                                    <Image src={stannum_coin} alt="Tins" width={16} height={16} />
                                    <span className="text-sm font-bold text-amber-400">+{xpResult.coinsGained} Tins</span>
                                </div>
                            )}
                        </div>
                    )}
                    {xpResult && xpResult.totalGain > 0 && <div className="w-32 border-t border-white/20" />}
                    {nextChest && (
                        <button
                            type="button"
                            onClick={() => { cancelRedirect(); router.push(nextChest.moduleHref); }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 font-semibold rounded-lg transition-200"
                        >
                            <ChestIcon className="size-4" />
                            <span>¡Cofre desbloqueado! Reclamalo</span>
                        </button>
                    )}
                    <p className="text-lg font-bold text-center">Completá la instrucción para seguir avanzando ({countdown}s)</p>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-sm opacity-80">Siguiente instrucción</p>
                        <p className="font-semibold">{nextInstruction.title}</p>
                    </div>
                    <div className="flex gap-4 mt-2">
                        <button type="button" onClick={cancelRedirect} className="px-6 py-2.5 bg-card-light hover:bg-card-lighter text-white font-semibold rounded-lg transition-200">Cancelar</button>
                        <button type="button" onClick={() => router.push(`/dashboard/library/${program.toLowerCase()}/instructions/${nextInstruction.id}`)} className="px-6 py-2.5 bg-stannum hover:bg-stannum-light text-card font-bold rounded-lg transition-200">Ir a la instrucción</button>
                    </div>
                </div>
            )}
            {showNextOverlay && !nextInstruction && (!nextLesson || !isNextLessonAvailable) && nextModule && (
                <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center gap-4 text-white p-4 transition-opacity">
                    {xpResult && xpResult.totalGain > 0 && (
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-sm font-semibold text-stannum">¡Lección completada!</p>
                            <div className="flex items-center gap-2">
                                <CrownIcon className="size-8 text-stannum" />
                                <span className="text-4xl font-black">+</span>
                                <AnimatedCounter target={xpResult.totalGain} className="text-4xl font-black text-stannum" />
                                <span className="text-4xl font-black">XP</span>
                            </div>
                            {xpResult.streakBonus > 0 && (
                                <p className="text-sm text-white/60">Incluye +{xpResult.streakBonus} XP por racha diaria</p>
                            )}
                            {xpResult.coinsGained > 0 && (
                                <div className="flex items-center gap-1.5 mt-1">
                                    <Image src={stannum_coin} alt="Tins" width={16} height={16} />
                                    <span className="text-sm font-bold text-amber-400">+{xpResult.coinsGained} Tins</span>
                                </div>
                            )}
                        </div>
                    )}
                    {xpResult && xpResult.totalGain > 0 && <div className="w-32 border-t border-white/20" />}
                    {nextChest && (
                        <button
                            type="button"
                            onClick={() => { cancelRedirect(); router.push(nextChest.moduleHref); }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 font-semibold rounded-lg transition-200"
                        >
                            <ChestIcon className="size-4" />
                            <span>¡Cofre desbloqueado! Reclamalo</span>
                        </button>
                    )}
                    <p className="text-lg font-bold text-center">Siguiente módulo en {countdown} segundos...</p>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-sm opacity-80">Siguiente módulo</p>
                        <p className="font-semibold">{nextModule.name}</p>
                    </div>
                    <div className="flex gap-4 mt-2">
                        <button type="button" onClick={cancelRedirect} className="px-6 py-2.5 bg-card-light hover:bg-card-lighter text-white font-semibold rounded-lg transition-200">Cancelar</button>
                        <button type="button" onClick={() => router.push(`/dashboard/library/${program.toLowerCase()}/lessons/${nextModule.firstLessonId}`)} className="px-6 py-2.5 bg-stannum hover:bg-stannum-light text-card font-bold rounded-lg transition-200">Siguiente módulo</button>
                    </div>
                </div>
            )}
            {showNextOverlay && !nextInstruction && (!nextLesson || !isNextLessonAvailable) && !nextModule && (
                <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center gap-4 text-white p-4 transition-opacity">
                    {xpResult && xpResult.totalGain > 0 && (
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-sm font-semibold text-stannum">¡Lección completada!</p>
                            <div className="flex items-center gap-2">
                                <CrownIcon className="size-8 text-stannum" />
                                <span className="text-4xl font-black">+</span>
                                <AnimatedCounter target={xpResult.totalGain} className="text-4xl font-black text-stannum" />
                                <span className="text-4xl font-black">XP</span>
                            </div>
                            {xpResult.streakBonus > 0 && (
                                <p className="text-sm text-white/60">Incluye +{xpResult.streakBonus} XP por racha diaria</p>
                            )}
                            {xpResult.coinsGained > 0 && (
                                <div className="flex items-center gap-1.5 mt-1">
                                    <Image src={stannum_coin} alt="Tins" width={16} height={16} />
                                    <span className="text-sm font-bold text-amber-400">+{xpResult.coinsGained} Tins</span>
                                </div>
                            )}
                        </div>
                    )}
                    {xpResult && xpResult.totalGain > 0 && <div className="w-32 border-t border-white/20" />}
                    {nextChest && (
                        <button
                            type="button"
                            onClick={() => { cancelRedirect(); router.push(nextChest.moduleHref); }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 font-semibold rounded-lg transition-200"
                        >
                            <ChestIcon className="size-4" />
                            <span>¡Cofre desbloqueado! Reclamalo</span>
                        </button>
                    )}
                    <p className="text-lg font-bold text-center">Volviendo al programa ({countdown}s)</p>
                    <div className="flex gap-4 mt-2">
                        <button type="button" onClick={cancelRedirect} className="px-6 py-2.5 bg-card-light hover:bg-card-lighter text-white font-semibold rounded-lg transition-200">Cancelar</button>
                        <button type="button" onClick={() => router.push(`/dashboard/library/${program.toLowerCase()}`)} className="px-6 py-2.5 bg-stannum hover:bg-stannum-light text-card font-bold rounded-lg transition-200">Ir al programa</button>
                    </div>
                </div>
            )}
            <MuxPlayer
                key={lesson.id}
                ref={videoRef}
                className="w-full aspect-video absolute top-0 left-0"
                style={{ aspectRatio: blurData.aspectRatio }}
                playbackId={lesson.muxPlaybackId}
                envKey={process.env.NEXT_PUBLIC_MUX_TOKEN_DATA}
                preload="auto"
                autoPlay
                playsInline
                streamType="on-demand"
                placeholder={blurData.blurDataURL}
                thumbnailTime={5}
                forwardSeekOffset={5}
                backwardSeekOffset={5}
                // defaultShowRemainingTime
                defaultHiddenCaptions
                primaryColor="rgba(255,255,255,1)"
                accentColor="#00FFCC"
                loading="viewport"
                metadataVideoId={lesson.id}
                metadataVideoTitle={lesson.longTitle}
                metadataViewerUserId={userId}
                title={lesson.longTitle}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
            />
        </div>
    );
};
