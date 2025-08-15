'use client'

import { useEffect, useState } from "react";
import { ArrowTrendUp, ClockIcon, CrossIcon, FireIcon, LockIcon, StarIcon } from "@/icons";
import { MotionWrapperLayout } from "@/components";
import { FullUserDetails } from "@/interfaces";

interface Props {
    user: FullUserDetails;
}

const formatLocalDate = (tz: string, d: Date = new Date()) => {
    const dateInTZ = new Date(d.toLocaleString("en-US", { timeZone: tz }));
    const year = dateInTZ.getFullYear();
    const month = String(dateInTZ.getMonth() + 1).padStart(2, "0");
    const day = String(dateInTZ.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const RachaHome = ({ user }: Props) => {
    const [streakStatus, setStreakStatus] = useState({missedToday: false, streakCount: 0});

    useEffect(() => {
        const { dailyStreak } = user;
        const timezone = dailyStreak?.timezone || "America/Argentina/Buenos_Aires";
        const today = formatLocalDate(timezone);
        const missedToday = !dailyStreak?.lastActivityLocalDate || dailyStreak.lastActivityLocalDate !== today;
        const streakCount = dailyStreak?.count || 0;
        setStreakStatus({ missedToday, streakCount });
    }, [user]);

    
    const days = Array.from({ length: 7 }, (_, i) => {
        if (i < streakStatus.streakCount) return "completed";
        if (i === streakStatus.streakCount) return "today";
        return "locked";
    });

    const progressPct = streakStatus.streakCount > 0 ? (streakStatus.streakCount / 7) * 100 : 0;

    return (
        <MotionWrapperLayout>
            <section
                id="streak-section"
                className={`w-full card border ${ streakStatus.missedToday ? "border-invalid shadow-[rgba(244,80,80,0.25)]" : "border-stannum"} flex flex-col gap-4 relative`}
            >
                <div className="flex items-center gap-4">
                    <h2 className="title-2">Racha diaria</h2>
                    <div className={`px-2 bg-card rounded-full border border-card-light text-sm font-black ${streakStatus.missedToday ? "text-invalid" : streakStatus.streakCount === 7 ? "text-stannum" : "text-card-lightest"}`}>{streakStatus.streakCount} / 7</div>
                </div>
                <div className="flex items-center gap-4 lg:gap-6">
                    <div className="w-fit shrink-0 flex flex-col items-center">
                        <div className={`mt-1 p-3 border-2 rounded-full relative ${streakStatus.missedToday ? "bg-invalid/25 border-invalid/75 text-invalid" : "bg-stannum/25 border-stannum/75 text-stannum"}`}>
                            <FireIcon className="size-6"/>
                            <div className="size-5 bg-card text-xs rounded-full flex justify-center items-center absolute top-0 right-0 translate-x-1/4 -translate-y-1/4">
                                {streakStatus.streakCount}
                            </div>
                        </div>
                        <p className={`mt-2 text-xs flex items-center gap-2 ${streakStatus.missedToday ? "text-invalid" : "text-stannum"}`}>
                            {streakStatus.missedToday ? <CrossIcon/> : <ArrowTrendUp/>}
                            <span>{streakStatus.missedToday ? "Aún no entrenaste" : "Manten tu racha"}</span>
                        </p>
                    </div>
                    <div className={`h-20 w-px bg-gradient-to-b from-transparent to-transparent ${streakStatus.missedToday ? "via-invalid/50" : "via-stannum/50"}`}/>
                    <div className="grow shrink-0 flex flex-col gap-2">
                        <div className="grid grid-cols-7 gap-4">
                            {days.map((day, index) => (
                                day === "completed" || (day === "today" && !streakStatus.missedToday) ? (
                                    <div key={index} className={`w-full flex flex-col items-center gap-1 relative ${streakStatus.missedToday ? "text-invalid" : "text-stannum"}`}>
                                        <div className={`w-full aspect-square rounded-xl border-2 flex justify-center items-center ${streakStatus.missedToday ? "bg-invalid/25 border-invalid/75" : "bg-stannum/25 border-stannum/75"}`}>
                                            <StarIcon className="size-6"/>
                                        </div>
                                        <p className="text-xs">Día {index + 1}</p>
                                        { !streakStatus.missedToday && <div className="size-3 rounded-full bg-stannum animate-ping absolute -top-0.5 -right-0.5"/>}
                                    </div>
                                ) : day === "today" && streakStatus.missedToday ? (
                                    <div key={index} className="w-full flex flex-col items-center gap-1 animate-pulse text-invalid">
                                        <div className="w-full aspect-square rounded-xl bg-card border-2 border-invalid/75 border-dashed flex justify-center items-center">
                                            <ClockIcon className="size-6"/>
                                        </div>
                                        <p className="text-xs">Día {index + 1}</p>
                                    </div>
                                ) : day === "locked" && (
                                    <div key={index} className="w-full flex flex-col items-center gap-1 text-card-lighter">
                                        <div className="w-full aspect-square rounded-xl bg-card border border-card-lighter flex justify-center items-center">
                                            <LockIcon className="size-6"/>
                                        </div>
                                        <p className="text-xs">Día {index + 1}</p>
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
                            aria-valuetext={progressPct === 0 ? "Sin racha" : progressPct === 100 ? "Racha al maximo" : `${progressPct}% de racha`}
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


