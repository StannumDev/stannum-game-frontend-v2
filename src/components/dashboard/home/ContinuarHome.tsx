'use client';

import { StaticImageData } from "next/image";
import Link from "next/link";
import { PlayCircleIcon, KeyIcon } from "@/icons";
import { buildContinueEntryForProgram } from "@/utilities";
import { MotionWrapperLayout, ContinuarCardHome } from "@/components";
import { ContinueEntry } from "@/interfaces";
import { programs } from "@/config/programs";
import { useUserStore } from "@/stores/userStore";

export const ContinuarHome = () => {
    const user = useUserStore(s => s.user);
    if (!user) return null;
    const entries: Array<ContinueEntry> = programs.map(p => buildContinueEntryForProgram(p, user)).filter(Boolean) as ContinueEntry[];
    return (
        <MotionWrapperLayout className="grow">
            <section id="continue-training" className="size-full">
                <h2 className="w-full font-black text-2xl text-center flex items-center gap-1">
                    <PlayCircleIcon />
                    Continuar entrenando
                </h2>
                <div className="mt-2 w-full pb-2 flex gap-4 overflow-x-auto">
                    {entries.length > 0 ? (
                        entries.map(e => (
                            <ContinuarCardHome
                                key={`${e.programId}-${e.href}`}
                                href={e.href}
                                programName={e.programName}
                                activityTitle={e.activityTitle}
                                progressPct={e.progressPct}
                                programLogo={e.programLogo as StaticImageData}
                                type={e.type}
                                activityLabel={e.activityLabel}
                            />
                        ))
                    ) : (
                        <div className="max-w-xl flex flex-col gap-2">
                            <p className="text-card-lightest">Desde aquí podrás retomar tus entrenamientos justo donde los dejaste.</p>
                            <Link href="/dashboard?activar=true" className="w-fit text-sm text-stannum hover:text-stannum-light font-semibold flex items-center gap-1.5 transition-200">
                                <KeyIcon className="size-4" />
                                ¿Tenés una clave de producto? Activala acá
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </MotionWrapperLayout>
    );
};
