'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowTrendDown, ArrowTrendUp, ClockIcon, CrownIcon, FireIcon, LockIcon, StarIcon } from "@/icons";
import { MotionWrapperLayout } from "@/components";
import { useUserStore } from "@/stores/userStore";
import stannum_coin from "@/assets/tins_coin.svg";

const formatLocalDate = (tz: string, d: Date = new Date()) => {
    const formatter = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" });
    return formatter.format(d);
};

const STREAK_XP_PER_DAY = [25, 38, 57, 86, 129, 194, 291];
const STREAK_COINS_PER_DAY = 3;

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

export const RachaHome = () => {
    const user = useUserStore(s => s.user);
    const [streakStatus, setStreakStatus] = useState({missedToday: false, streakCount: 0, maxStreak: false});
    const [countdown, setCountdown] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return undefined;
        const { dailyStreak } = user;
        const timezone = dailyStreak?.timezone || "America/Argentina/Buenos_Aires";
        const today = formatLocalDate(timezone);
        const missedToday = !dailyStreak?.lastActivityLocalDate || dailyStreak.lastActivityLocalDate !== today;
        const streakCount = dailyStreak?.count || 0;
        const maxStreak = dailyStreak?.count >= 7;
        setStreakStatus({ missedToday, streakCount, maxStreak });

        if (missedToday && streakCount > 0) {
            setCountdown(formatCountdown(getSecondsUntilMidnight(timezone)));
            const interval = setInterval(() => setCountdown(formatCountdown(getSecondsUntilMidnight(timezone))), 1000);
            return () => clearInterval(interval);
        }
        setCountdown(null);
        return undefined;
    }, [user]);

    if (!user) return null;

    const days = Array.from({ length: 7 }, (_, i) => {
        if (i < streakStatus.streakCount) return "completed";
        if (i === streakStatus.streakCount && streakStatus.missedToday) return "today";
        return "locked";
    });

    const progressPct = streakStatus.streakCount > 0 ? (streakStatus.streakCount / 7) * 100 : 0;

    return (
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
                            <div className="flex items-center gap-1 text-amber-400 font-bold">
                                <Image src={stannum_coin} alt="Tins" width={12} height={12} />
                                <span>+{STREAK_COINS_PER_DAY} Tins</span>
                            </div>
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
                        <div className="grid grid-cols-7 gap-4">
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
            </section>
        </MotionWrapperLayout>
    );
};


