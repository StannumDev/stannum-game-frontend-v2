import Image from "next/image";
import Link from "next/link";
import { PlayIcon } from "@/icons";
import { Lesson } from "@/interfaces";

interface Props {
    lesson: Lesson;
    index: number;
    programId: string;
    isCurrent?: boolean;
    isCompleted: boolean;
}

export const LessonMiniatureCard = ({ lesson, index, programId, isCurrent, isCompleted }: Props) => {
    return (
        <Link
            href={`/dashboard/library/${programId}/lessons/${lesson.id}`}
            className={`w-full grid grid-cols-5 p-2 rounded-lg transition-200 ${isCurrent ? "bg-card-light cursor-default" : "hover:bg-white/10 cursor-pointer group"} ${isCompleted && "opacity-25 hover:opacity-75"}`}
        >
            <div className="col-span-2 aspect-video rounded-lg relative overflow-hidden">
                <div className="size-full bg-black/75 flex justify-center items-center absolute top-0 left-0 z-10 opacity-0 group-hover:opacity-100 transition-200">
                    <PlayIcon className="size-8" />
                </div>
                <Image
                    className="size-full object-cover absolute top-0 left-0"
                    width={160}
                    height={90}
                    src={`https://image.mux.com/${lesson.muxPlaybackId}/thumbnail.png?width=160&height=90&time=5`}
                    alt="Miniatura video"
                />
            </div>
            <div className="col-span-3 px-4 py-2 flex flex-col">
                <p className="subtitle-1">Lección {index < 10 ? `0${index}` : index}</p>
                <h2 className="w-full title-3 grow truncate">{lesson.title}</h2>
                <p className={`subtitle-1 ${ isCompleted ? "text-stannum" : !isCompleted && !isCurrent && "text-invalid"} `}>{isCurrent ? "Reproduciendo" : isCompleted ? "Completado" : "Pendiente"}</p>
            </div>
        </Link>
    );
};
