import Link from "next/link";
import { PlayIcon } from "@/icons";
import Image, { StaticImageData } from "next/image";

type Props = {
    href: string;
    programName: string;
    lessonTitle: string;
    progressPct: number;
    programLogo: StaticImageData;
};

export const ContinuarCardHome = ({ href, programName, lessonTitle, progressPct, programLogo }: Props) => {
    return (
        <Link
            href={href}
            aria-label={`Continuar entrenando en ${programName} — ${lessonTitle}`}
            className="w-64 lg:w-[calc((100%-2rem)/3)] shrink-0 aspect-square rounded-lg"
        >
            <article className="size-full card rounded-lg flex flex-col items-start hover:border-card-lightest transition-200 group">
                <h3 className="sr-only">{programName}</h3>
                <Image
                    src={programLogo}
                    alt={programName}
                    className="w-40 h-auto"
                />
                <h4 className="mt-4 subtitle-1">Lección en progreso</h4>
                <p className="text-sm opacity-80 line-clamp-2">{lessonTitle}</p>
                <div className="grow"></div>
                <div className="mt-4 w-full">
                    <div className="w-full subtitle-1 group-hover:text-white flex items-center gap-2 transition-200">
                        Continuar
                        <PlayIcon/>
                    </div>
                    <div
                        className="mt-2 w-full h-1.5 bg-card-light rounded-lg overflow-hidden"
                        role="progressbar"
                        aria-valuenow={progressPct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuetext={progressPct === 0 ? "Sin progreso" : progressPct === 100 ? "Completado" : `${progressPct}% completado`}
                        title={`Progreso: ${progressPct}%`}
                    >
                        <div
                            className="h-full bg-stannum transition-[width] duration-300"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                </div>
            </article>
        </Link>
    );
};