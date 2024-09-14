import Image from "next/image"
import { IoPlaySharp } from "react-icons/io5"
import stannum_game_video from "@/assets/home/stannum_game_video.webp"

export const PresentacionHome = () => {
    return (
        <section className="w-full card aspect-video flex justify-center items-center relative overflow-hidden">
            <Image src={stannum_game_video} alt="Presentación STANNUM Game" className="size-full object-cover blur-[1px] absolute top-0 left-0 z-0"/>
            <div className="size-full bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 z-10"></div>
            <button type="button" className="size-32 rounded-full bg-stannum flex justify-center items-center relative z-20">
                <IoPlaySharp className="size-16 relative left-2"/>
            </button>
            <div className="w-full absolute bottom-8 left-6 z-20">
                <p className="text-4xl">Bienvenido a <b className="block font-semibold">STANNUM Game</b></p>
                <p className="mt-2 w-full max-w-xl text-pretty">Adentrate con nuestros <b className="text-stannum">videos introductorios</b> para comprender el funcionamiento de la plataforma y empezar a entrenar!</p>
            </div>
        </section>
    )
}
