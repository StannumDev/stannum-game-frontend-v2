import Image from "next/image";
import { PlayIcon } from "@/icons";

export const LessonMiniatureCard = () => {
    return (
        <div className="w-full grid grid-cols-5 p-2 rounded-lg hover:bg-white/10 transition-200 cursor-pointer group">
            <div className="col-span-2 aspect-video rounded-lg relative overflow-hidden">
                <div className="size-full bg-black/75 flex justify-center items-center absolute top-0 left-0 z-10 opacity-0 group-hover:opacity-100 transition-200">
                    <PlayIcon className="size-8"/>
                </div>
                <Image
                    className="size-full object-cover absolute top-0 left-0"
                    width={160}
                    height={90}
                    src={`https://image.mux.com/${process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID}/thumbnail.png?width=160&height=90&time=5`}
                    alt="Miniatura video"
                />
            </div>
            <div className="col-span-3 px-4 py-2 flex flex-col">
                <p className="subtitle-1">Módulo 01</p>
                <h2 className="w-full title-3 grow truncate">Organización digital digital digital digital</h2>
                <p className="subtitle-1">Incompleto</p>
            </div>
        </div>
    )
}
