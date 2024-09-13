import { FirstPlaceIcon } from "@/components";
import Link from "next/link";
import { FaRankingStar, FaCircleInfo } from "react-icons/fa6";
import foto from "@/assets/user/default_user.webp";
import Image from "next/image";

export const RankingHome = () => {
    return (
        <section className="w-full card">
            <div className="w-full flex justify-between items-center">
                <h2 className="w-fit text-2xl font-semibold uppercase flex justify-start items-center gap-2">
                    <div>
                        <FaRankingStar className="text-3xl relative -top-px"/>
                    </div>
                    Top Leaders
                </h2>
                <Link href={'/'} className="w-fit px-4 py-1 text-lg rounded-lg border border-card-light relative group hover:bg-card-light transition-all duration-200 ease-in-out">
                    <FaCircleInfo className="text-base text-stannum absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 rounded-full bg-card scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 ease-in-out"/>
                    Temporada 1
                </Link>
            </div>
            <div className="mt-8 w-full">
                <div className="w-full grid grid-cols-8 gap-2 px-4">
                    <h3 className="col-span-1 text-center">Posición</h3>
                    <h3 className="col-span-4 pl-2">Jugador</h3>
                    <h3 className="col-span-2 pl-2">Empresa</h3>
                    <h3 className="col-span-1 text-center">Puntos</h3>
                </div>
                <div className="mt-2 w-full flex flex-col gap-3 justify-start items-start">
                    <div className="w-full bg-card-light px-4 py-3 rounded-lg grid grid-cols-8 items-center gap-2">
                        <h3 className="col-span-1 flex justify-center items-center">
                            <span className="sr-only">Primer puesto</span>
                            <FirstPlaceIcon/>
                        </h3>
                        <h3 className="col-span-4 pl-2 flex justify-start items-center gap-3">
                            <Image src={foto} alt='Primer puesto Mateo Bernabé Lohezic' className="size-9 rounded-full"/>
                            <span className="grow whitespace-nowrap truncate">Mateo Bernabé Lohezic Bernabé Lohezic Bernabé Lohezic</span>
                        </h3>
                        <h3 className="col-span-2 pl-2 whitespace-nowrap truncate">STANNUM STANNUM STANNUM STANNUM</h3>
                        <h3 className="col-span-1 text-center">99</h3>
                    </div>
                    <div className="w-full bg-card-light px-4 py-3 rounded-lg grid grid-cols-8 items-center gap-2">
                        <h3 className="col-span-1 flex justify-center items-center">
                            <span className="sr-only">Primer puesto</span>
                            <FirstPlaceIcon/>
                        </h3>
                        <h3 className="col-span-4 pl-2 flex justify-start items-center gap-3">
                            <Image src={foto} alt='Primer puesto Mateo Bernabé Lohezic' className="size-9 rounded-full"/>
                            <span className="grow whitespace-nowrap truncate">Mateo Bernabé Lohezic Bernabé Lohezic Bernabé Lohezic</span>
                        </h3>
                        <h3 className="col-span-2 pl-2 whitespace-nowrap truncate">STANNUM STANNUM STANNUM STANNUM</h3>
                        <h3 className="col-span-1 text-center">99</h3>
                    </div>
                    <div className="w-full bg-card-light px-4 py-3 rounded-lg grid grid-cols-8 items-center gap-2">
                        <h3 className="col-span-1 flex justify-center items-center">
                            <span className="sr-only">Primer puesto</span>
                            <FirstPlaceIcon/>
                        </h3>
                        <h3 className="col-span-4 pl-2 flex justify-start items-center gap-3">
                            <Image src={foto} alt='Primer puesto Mateo Bernabé Lohezic' className="size-9 rounded-full"/>
                            <span className="grow whitespace-nowrap truncate">Mateo Bernabé Lohezic Bernabé Lohezic Bernabé Lohezic</span>
                        </h3>
                        <h3 className="col-span-2 pl-2 whitespace-nowrap truncate">STANNUM STANNUM STANNUM STANNUM</h3>
                        <h3 className="col-span-1 text-center">99</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}