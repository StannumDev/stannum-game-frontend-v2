'use client'

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowTrendDown, ArrowTrendUp, ClockIcon, CrownIcon, FireIcon, LockIcon, ShieldCompletedIcon, ShieldEmpyIcon, SpinnerIcon, StarIcon } from "@/icons";
import { Modal, MotionWrapperLayout } from "@/components";
import { useUserStore } from "@/stores/userStore";
import { purchaseStreakShield, recoverStreak } from "@/services";
import { errorHandler } from "@/helpers";
import { callToast } from "@/helpers/callToast";
import stannum_coin from "@/assets/tins_coin.svg";

const SHIELD_PRICE = 25;
const SHIELD_MAX = 1;

const formatLocalDate = (tz: string, d: Date = new Date()) => {
    const formatter = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" });
    return formatter.format(d);
};

const STREAK_XP_PER_DAY = [25, 38, 57, 86, 129, 194, 291];
const STREAK_COINS_PER_DAY = [0, 0, 1, 2, 3, 4, 5];

const getSecondsUntilMidnight = (tz: string): number => {
    const now = new Date();
    const nowInTz = new Date(now.toLocaleString("en-US", { timeZone: tz }));
    const midnight = new Date(nowInTz);
    midnight.setHours(24, 0, 0, 0);
    return Math.max(0, Math.floor((midnight.getTime() - nowInTz.getTime()) / 1000));
};

const formatCountdown = (totalSeconds: number): string => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const getRecoverySecondsLeft = (expiresAt: string): number => {
    const deadline = new Date(expiresAt).getTime();
    return Math.max(0, Math.floor((deadline - Date.now()) / 1000));
};

export const RachaHome = () => {
    const user = useUserStore(s => s.user);
    const refreshUser = useUserStore(s => s.refreshUser);
    const [streakStatus, setStreakStatus] = useState({missedToday: false, streakCount: 0, maxStreak: false});
    const [countdown, setCountdown] = useState<string | null>(null);
    const [recoveryCountdown, setRecoveryCountdown] = useState<string | null>(null);
    const [recoveringStreak, setRecoveringStreak] = useState(false);
    const [showShieldModal, setShowShieldModal] = useState(false);
    const [purchasingShield, setPurchasingShield] = useState(false);

    useEffect(() => {
        if (!user) return undefined;
        const { dailyStreak } = user;
        const timezone = dailyStreak?.timezone || "America/Argentina/Buenos_Aires";
        const today = formatLocalDate(timezone);
        const missedToday = !dailyStreak?.lastActivityLocalDate || dailyStreak.lastActivityLocalDate !== today;
        const streakCount = dailyStreak?.count || 0;
        const maxStreak = dailyStreak?.count >= 7;
        setStreakStatus({ missedToday, streakCount, maxStreak });

        const intervals: ReturnType<typeof setInterval>[] = [];

        if (missedToday && streakCount > 0) {
            setCountdown(formatCountdown(getSecondsUntilMidnight(timezone)));
            intervals.push(setInterval(() => setCountdown(formatCountdown(getSecondsUntilMidnight(timezone))), 1000));
        } else {
            setCountdown(null);
        }

        if (dailyStreak?.recoveryAvailable && dailyStreak.recoveryExpiresAt) {
            const updateRecovery = () => {
                const secs = getRecoverySecondsLeft(dailyStreak.recoveryExpiresAt!);
                if (secs <= 0) {
                    setRecoveryCountdown(null);
                } else {
                    const h = Math.floor(secs / 3600);
                    const m = Math.floor((secs % 3600) / 60);
                    setRecoveryCountdown(h > 0 ? `${h}h ${m}m` : `${m}m`);
                }
            };
            updateRecovery();
            intervals.push(setInterval(updateRecovery, 60000));
        } else {
            setRecoveryCountdown(null);
        }

        return () => intervals.forEach(clearInterval);
    }, [user]);

    if (!user) return null;

    const days = Array.from({ length: 7 }, (_, i) => {
        if (i < streakStatus.streakCount) return "completed";
        if (i === streakStatus.streakCount && streakStatus.missedToday) return "today";
        return "locked";
    });

    const progressPct = streakStatus.streakCount > 0 ? (streakStatus.streakCount / 7) * 100 : 0;
    const currentTinsReward = STREAK_COINS_PER_DAY[Math.min(streakStatus.streakCount, 6)];

    const currentShields = user.dailyStreak?.shields || 0;
    const canPurchaseShield = currentShields < SHIELD_MAX && user.coins >= SHIELD_PRICE;

    const handleRecoverStreak = async () => {
        if (recoveringStreak) return;
        setRecoveringStreak(true);
        try {
            const result = await recoverStreak();
            callToast({ type: 'success', message: { title: '¡Racha recuperada!', description: `Tu racha de ${result.restoredCount} días fue restaurada.` } });
            await refreshUser();
        } catch (err) {
            errorHandler(err);
        } finally {
            setRecoveringStreak(false);
        }
    };

    const handlePurchaseShield = async () => {
        if (purchasingShield) return;
        setPurchasingShield(true);
        try {
            await purchaseStreakShield();
            callToast({ type: 'success', message: { title: 'Escudo de racha comprado', description: 'Tu racha estará protegida si faltás un día.' } });
            await refreshUser();
            setShowShieldModal(false);
        } catch (err) {
            errorHandler(err);
        } finally {
            setPurchasingShield(false);
        }
    };

    return (
        <Fragment>
        <MotionWrapperLayout>
            <section
                id="streak-section"
                className={`w-full card border ${ streakStatus.missedToday ? "border-invalid shadow-[rgba(244,80,80,0.25)]" : "border-stannum"} ${ streakStatus.maxStreak && !streakStatus.missedToday && "from-stannum/50 to-stannum/25"} flex flex-col gap-4 relative`}
            >
                <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <h2 className="title-2">Racha diaria</h2>
                        <div className={`px-2 bg-card rounded-full border border-card-light text-base lg:text-sm font-black flex items-center ${streakStatus.missedToday ? "text-invalid" : streakStatus.maxStreak ? "text-stannum" : "text-card-lightest"}`}>
                            {streakStatus.streakCount} / 7
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 text-[10px] lg:text-xs">
                        <span className="text-card-lightest">Recompensa actual</span>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-stannum font-bold">
                                <CrownIcon className="size-3 lg:size-3.5"/>
                                <span>+{STREAK_XP_PER_DAY[Math.min(streakStatus.streakCount, 6)]} XP</span>
                            </div>
                            {currentTinsReward > 0 ? (
                                <div className="flex items-center gap-1 text-amber-400 font-bold">
                                    <Image src={stannum_coin} alt="Tins" width={12} height={12} />
                                    <span>+{currentTinsReward} Tins</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 text-card-lighter font-bold">
                                    <Image src={stannum_coin} alt="Tins" width={12} height={12} className="opacity-50" />
                                    <span>+0 Tins</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 lg:gap-6">
                    <div className="hidden w-fit shrink-0 lg:flex flex-col items-center">
                        <div className={`mt-1 p-3 border-2 rounded-full relative ${streakStatus.missedToday ? "bg-invalid/25 border-invalid/75 text-invalid" : "bg-stannum/25 border-stannum/75 text-stannum"}`}>
                            { streakStatus.missedToday ? <ClockIcon className="size-6"/> : <FireIcon className="size-6"/>}
                            <div className="size-5 aspect-square bg-card text-xs rounded-full flex justify-center items-center absolute top-0 right-0 translate-x-1/4 -translate-y-1/4">
                                {streakStatus.streakCount}
                            </div>
                        </div>
                        <p className={`mt-2 text-xs flex items-center gap-2 ${streakStatus.missedToday ? "text-invalid" : "text-stannum"}`}>
                            {streakStatus.missedToday ? <ArrowTrendDown/> : <ArrowTrendUp/>}
                            <span>{streakStatus.missedToday ? "Aún no entrenaste" : "Manten tu racha"}</span>
                        </p>
                        {countdown && <p className="mt-1 text-sm font-bold text-invalid tabular-nums">{countdown}</p>}
                    </div>
                    <div className={`hidden lg:block h-20 w-px bg-gradient-to-b from-transparent to-transparent ${streakStatus.missedToday ? "via-invalid/50" : "via-stannum/50"}`}/>
                    <div className="grow shrink-0 flex flex-col gap-2">
                        <div className="grid grid-cols-7 gap-2 sm:gap-4">
                            {days.map((day, index) => (
                                day === "completed" || (day === "today" && !streakStatus.missedToday) ? (
                                    <div key={index} className={`w-full flex flex-col items-center gap-1 relative ${streakStatus.missedToday ? "text-invalid" : "text-stannum"}`}>
                                        <div className={`w-full aspect-square rounded-lg lg:rounded-xl border-2 flex justify-center items-center ${streakStatus.missedToday ? "bg-invalid/25 border-invalid/75" : "bg-stannum/25 border-stannum/75"}`}>
                                            <StarIcon className="size-5 2xl:size-6"/>
                                        </div>
                                        <p className="text-[10px] lg:text-xs font-bold">Día {index + 1}</p>
                                        { !streakStatus.missedToday && <div className="size-2 lg:size-3 rounded-full bg-stannum animate-ping absolute -top-0.5 -right-0.5"/>}
                                    </div>
                                ) : day === "today" && streakStatus.missedToday ? (
                                    <div key={index} className="w-full flex flex-col items-center gap-1 animate-pulse text-invalid">
                                        <div className="w-full aspect-square rounded-lg lg:rounded-xl bg-card border-2 border-invalid/75 border-dashed flex justify-center items-center">
                                            <ClockIcon className="size-5 2xl:size-6"/>
                                        </div>
                                        <p className="text-[10px] lg:text-xs font-bold">Día {index + 1}</p>
                                    </div>
                                ) : day === "locked" && (
                                    <div key={index} className="w-full flex flex-col items-center gap-1 text-card-lighter">
                                        <div className="w-full aspect-square rounded-lg lg:rounded-xl bg-card border border-card-lighter flex justify-center items-center">
                                            <LockIcon className="size-5 2xl:size-6"/>
                                        </div>
                                        <p className="text-[10px] lg:text-xs font-bold">Día {index + 1}</p>
                                    </div>
                                )
                            ))}
                        </div>
                        <div
                            className="w-full h-1.5 bg-card-light rounded-lg overflow-hidden"
                            role="progressbar"
                            aria-valuenow={progressPct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuetext={progressPct === 0 ? "Sin racha" : progressPct === 100 ? "Racha al máximo" : `${progressPct}% de racha`}
                            title={`Progreso: ${progressPct}%`}
                        >
                            <div
                                className={`h-full transition-[width] duration-300 ${streakStatus.missedToday ? "bg-invalid" : "bg-stannum"}`}
                                style={{ width: `${progressPct}%` }}
                            />
                        </div>
                    </div>
                </div>

                {currentShields > 0 ? (
                    <button
                        type="button"
                        onClick={() => setShowShieldModal(true)}
                        className="p-3 rounded-lg border border-blue-500/30 bg-blue-500/10 flex items-center gap-3 cursor-pointer hover:border-blue-500/50 transition-200"
                    >
                        <ShieldCompletedIcon className="size-5 text-blue-400 shrink-0" />
                        <div className="min-w-0 text-left">
                            <p className="text-sm font-semibold text-blue-400">Escudo activo</p>
                            <p className="text-xs text-card-lightest">Tu racha está protegida si faltás un día</p>
                        </div>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setShowShieldModal(true)}
                        className="p-3 rounded-lg border border-invalid/30 bg-invalid/10 flex items-center justify-between gap-3 cursor-pointer hover:border-invalid/50 transition-200"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <ShieldEmpyIcon className="size-5 text-invalid shrink-0" />
                            <div className="text-left">
                                <p className="text-sm font-semibold text-invalid">Sin escudo</p>
                                <p className="text-xs text-card-lightest">Protegé tu racha si faltás un día</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                            <Image src={stannum_coin} alt="Tins" width={14} height={14} />
                            <span className="text-xs font-bold text-amber-400">{SHIELD_PRICE}</span>
                        </div>
                    </button>
                )}

                {user.dailyStreak.recoveryAvailable && user.dailyStreak.lostCount && recoveryCountdown && (
                    <div className="p-3 rounded-lg border border-amber-500/50 bg-amber-500/10 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-amber-400">
                                Perdiste tu racha de {user.dailyStreak.lostCount} días
                            </p>
                            <p className="text-xs text-card-lightest">
                                Recuperala por 30 Tins · quedan {recoveryCountdown}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleRecoverStreak}
                            disabled={recoveringStreak || user.coins < 30}
                            className="h-8 px-4 text-xs font-semibold bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-card rounded transition-200 shrink-0 flex items-center gap-1.5"
                        >
                            <Image src={stannum_coin} alt="Tins" width={14} height={14} />
                            30 Tins
                        </button>
                    </div>
                )}
            </section>
        </MotionWrapperLayout>

        <Modal className="max-w-md h-auto" showModal={showShieldModal} setShowModal={setShowShieldModal}>
            <div className="flex flex-col items-center text-center">
                <div className="size-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <ShieldCompletedIcon className="size-8 text-blue-400" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">Escudo de Racha</h3>
                <p className="mt-2 text-sm text-white/80 max-w-xs">
                    Comprá un escudo y protegé tu racha. Si faltás un día, el escudo se activa automáticamente y tu racha sigue.
                </p>
                <div className="mt-4 w-full space-y-2 text-left">
                    <div className="flex items-start gap-2.5">
                        <ShieldCompletedIcon className="size-4 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-white/70">Podés tener <b className="text-white">1 escudo</b> a la vez</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <FireIcon className="size-4 text-stannum shrink-0 mt-0.5" />
                        <p className="text-xs text-white/70">Si faltás <b className="text-white">1 día</b>, el escudo te salva y tu racha continúa</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <ClockIcon className="size-4 text-invalid shrink-0 mt-0.5" />
                        <p className="text-xs text-white/70">Si faltás <b className="text-white">2 o más días</b>, el escudo se consume pero la racha se pierde</p>
                    </div>
                </div>
                {currentShields > 0 ? (
                    <p className="mt-5 text-sm font-semibold text-blue-400 flex items-center gap-2">
                        <ShieldCompletedIcon className="size-4" />
                        Escudo activo
                    </p>
                ) : (
                    <div className="mt-5 flex flex-col items-center gap-2">
                        <button
                            type="button"
                            disabled={!canPurchaseShield || purchasingShield}
                            onClick={handlePurchaseShield}
                            className="h-10 px-6 text-sm font-semibold bg-stannum hover:bg-stannum-light disabled:opacity-50 disabled:cursor-not-allowed text-card rounded transition-200 flex items-center gap-2"
                        >
                            {purchasingShield ? (
                                <SpinnerIcon className="animate-spin size-5" />
                            ) : (
                                <>
                                    <Image src={stannum_coin} alt="Tins" width={16} height={16} />
                                    <span>Comprar por {SHIELD_PRICE} Tins</span>
                                </>
                            )}
                        </button>
                        {user.coins < SHIELD_PRICE && (
                            <p className="text-xs text-invalid">No tenés suficientes Tins</p>
                        )}
                    </div>
                )}
            </div>
        </Modal>
        </Fragment>
    );
};
