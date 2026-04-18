import Image from "next/image";
import Link from "next/link";
import { LockIcon, PlayIcon } from "@/icons";
import { Lesson } from "@/interfaces";
import { FreshnessBadge } from "@/components/ui/FreshnessBadge";
import type { FreshnessStatus } from "@/utilities";

interface Props {
    lesson: Lesson;
    index: number;
    programId: string;
    isCurrent?: boolean;
    isCompleted: boolean;
    isAvailable: boolean;
    freshness?: FreshnessStatus;
}

export const LessonMiniatureCard = ({ lesson, index, programId, isCurrent, isCompleted, isAvailable, freshness }: Props) => {

    if(isAvailable) {
        return (
            <Link
                href={`/dashboard/library/${programId}/lessons/${lesson.id}`}
                className={`w-full grid grid-cols-5 p-2 rounded-lg transition-200 ${isCurrent ? "bg-card-light cursor-default" : "hover:bg-white/10 cursor-pointer group"} ${isCompleted && "opacity-75 hover:opacity-100"}`}
            >
                <div className="col-span-2 aspect-video rounded-lg relative overflow-hidden bg-card-light flex items-center justify-center">
                    <div className="size-full bg-black/75 flex justify-center items-center absolute top-0 left-0 z-10 opacity-0 group-hover:opacity-100 transition-200">
                        <PlayIcon className="size-8" />
                    </div>
                    {lesson.muxPlaybackId ? (
                        <Image
                            className="size-full object-cover absolute top-0 left-0"
                            width={160}
                            height={90}
                            src={`https://image.mux.com/${lesson.muxPlaybackId}/thumbnail.png?width=160&height=90&time=5`}
                            alt="Miniatura video"
                        />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="opacity-30"><path d="M8 5v14l11-7z"/></svg>
                    )}
                </div>
                <div className="col-span-3 px-4 py-2 flex flex-col">
                    <div className="flex items-center gap-2">
                        <p className="subtitle-1">Lección {index < 10 ? `0${index}` : index}</p>
                        <FreshnessBadge status={freshness ?? null} size='sm' />
                    </div>
                    <h2 className="w-full title-3 grow truncate">{lesson.title}</h2>
                    <p className={`subtitle-1 ${ isCompleted ? "text-stannum" : !isCompleted && !isCurrent ? "text-invalid" : isCurrent && "text-white" }`}>{isCurrent ? "Reproduciendo" : isCompleted ? "Completado" : "Pendiente"}</p>
                </div>
            </Link>
        )
    } else {
        return (
            <div className="w-full grid grid-cols-5 p-2 rounded-lg opacity-50">
                <div className="col-span-2 aspect-video rounded-lg relative overflow-hidden bg-card-light flex items-center justify-center">
                    <div className="size-full bg-black/75 flex justify-center items-center absolute top-0 left-0 z-10">
                        <LockIcon className="size-8 text-card-lightest" />
                    </div>
                    {lesson.muxPlaybackId ? (
                        <Image
                            className="size-full object-cover absolute top-0 left-0"
                            width={160}
                            height={90}
                            src={`https://image.mux.com/${lesson.muxPlaybackId}/thumbnail.png?width=160&height=90&time=5`}
                            alt="Miniatura video"
                        />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="opacity-30"><path d="M8 5v14l11-7z"/></svg>
                    )}
                </div>
                <div className="col-span-3 px-4 py-2 flex flex-col">
                    <div className="flex items-center gap-2">
                        <p className="subtitle-1">Lección {index < 10 ? `0${index}` : index}</p>
                        <FreshnessBadge status={freshness ?? null} size='sm' />
                    </div>
                    <h2 className="w-full title-3 grow truncate">{lesson.title}</h2>
                    <p className="subtitle-1">Bloqueado</p>
                </div>
            </div>
        );
    }
};
