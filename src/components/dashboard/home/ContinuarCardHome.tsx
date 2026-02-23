import Link from "next/link";
import { PlayIcon, CompassIcon } from "@/icons";
import Image, { StaticImageData } from "next/image";

type Props = {
    href: string;
    programName: string;
    activityTitle: string;
    programLogo: StaticImageData;
    type: 'lesson' | 'instruction';
    activityLabel: string;
    programProgress: number;
};

export const ContinuarCardHome = ({ href, programName, activityTitle, programLogo, type, activityLabel, programProgress }: Props) => {
    return (
        <Link
            href={href}
            aria-label={`Continuar entrenando en ${programName} — ${activityTitle}`}
            className="w-64 xl:w-[calc((100%-1rem)/2)] 2xl:w-[calc((100%-2rem)/3)] shrink-0 lg:aspect-square rounded-lg"
        >
            <article className="size-full card rounded-lg flex flex-col items-start hover:border-card-lightest transition-200 group">
                <h3 className="sr-only">{programName}</h3>
                <div className="w-40 min-h-10 grow">
                    <Image
                        src={programLogo}
                        alt={programName}
                        className="w-40 h-auto object-contain"
                    />
                </div>
                <h4 className="mt-4 subtitle-1 flex items-center gap-1.5">
                    {type === 'instruction'
                        ? <CompassIcon className="shrink-0"/>
                        : <PlayIcon className="shrink-0"/>
                    }
                    {activityLabel}
                </h4>
                <p className="hidden lg:block text-sm opacity-80 line-clamp-2">{activityTitle}</p>
                <div className="mt-2 lg:mt-4 w-full">
                    <p className="text-[10px] lg:text-xs text-card-lightest mb-1">Progreso del programa</p>
                    <div className="w-full flex items-center gap-2">
                        <div className="grow h-1 bg-card-light rounded-full overflow-hidden">
                            <div className="h-full bg-stannum/60 rounded-full transition-[width] duration-300" style={{ width: `${programProgress}%` }} />
                        </div>
                        <span className="text-[10px] lg:text-xs text-card-lightest font-semibold shrink-0">{programProgress}%</span>
                    </div>
                </div>
            </article>
        </Link>
    );
};