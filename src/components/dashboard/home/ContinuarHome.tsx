import { StaticImageData } from "next/image";
import { PlayCircleIcon } from "@/icons";
import { buildContinueEntryForProgram } from "@/utilities";
import { MotionWrapperLayout, ContinuarCardHome } from "@/components";
import { ContinueEntry, FullUserDetails } from "@/interfaces";
import { programs } from "@/config/programs";

interface Props {
    user: FullUserDetails
}

export const ContinuarHome = async ({ user }: Props) => {
    const entries: Array<ContinueEntry> = programs.map(p => buildContinueEntryForProgram(p, user)).filter(Boolean) as ContinueEntry[];
    return (
        <MotionWrapperLayout>
            <section id="continue-training" className="w-full">
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
                                lessonTitle={e.lessonTitle}
                                progressPct={e.progressPct}
                                programLogo={e.programLogo as StaticImageData}
                            />
                        ))
                    ) : (
                        <p className="text-card-lightest max-w-xl">Desde aquí podrás acceder rápidamente a tus programas adquiridos y retomar tus entrenamientos justo donde los dejaste.</p>
                    )}
                </div>
            </section>
        </MotionWrapperLayout>
    );
};
