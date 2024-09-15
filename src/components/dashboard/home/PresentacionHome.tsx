import Image from "next/image";
import { IoPlaySharp } from "react-icons/io5";
import stannum_game_video from "@/assets/home/stannum_game_video.webp";

export const PresentacionHome = () => {
    return (
        <section className="w-full card aspect-video flex justify-center items-start lg:items-center relative overflow-hidden group ">
            <div className="size-full bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 z-10"></div>
            <button type="button" className="size-14 lg:size-32 rounded-full bg-stannum flex justify-center items-center absolute lg:relative bottom-6 lg:bottom-0 right-6 lg:right-0 z-20 hover:scale-105 transition-all duration-200 ease-in-out" >
                <IoPlaySharp className="size-8 lg:size-16 relative left-1 lg:left-2"/>
            </button>
            <Image src={stannum_game_video} priority={true} alt="Presentación STANNUM Game" className="size-full object-cover blur-[1px] absolute top-0 left-0 z-0"/>
            <div className="w-full static lg:absolute lg:bottom-8 lg:left-6 z-20">
                <p className="text-2xl lg:text-4xl leading-tight">Bienvenido a <b className="block font-semibold">STANNUM Game</b></p>
                <p className="hidden lg:block mt-2 w-full max-w-xl text-pretty text-base">Adentrate con nuestros <b className="text-stannum">videos introductorios</b> para comprender el funcionamiento de la plataforma y empezar a entrenar!</p>
            </div>
        </section>
    )
}
