import Link from "next/link";
import { FaRankingStar, FaCircleInfo } from "react-icons/fa6";
import { SimpleRanking } from "@/interfaces";
import { CardRankingHome } from "@/components";
import foto from "@/assets/user/default_user.webp";

const rankings:Array<SimpleRanking> = [
    {
        position: 1,
        name:"Mateo Bernabé Lohezic",
        photo: foto,
        enterprise: "STANNUM",
        points: 100,
    },
    {
        position: 2,
        name:"Nicolas Darelli",
        photo: foto,
        enterprise: "STANNUM",
        points: 93,
    },
    {
        position: 3,
        name:"Nani Ghiotto",
        photo: foto,
        enterprise: "STANNUM",
        points: 87,
    },
    {
        position: 4,
        name:"Martin Merlini",
        photo: foto,
        enterprise: "STANNUM",
        points: 86,
    },
    {
        position: 5,
        name:"Nicolas Nasrallah",
        photo: foto,
        enterprise: "STANNUM",
        points: 80,
    },
    {
        position: 6,
        name:"Nicolas Nasrallah",
        photo: foto,
        enterprise: "STANNUM",
        points: 80,
    },
    {
        position: 7,
        name:"Nicolas Nasrallah",
        photo: foto,
        enterprise: "STANNUM",
        points: 80,
    },
    {
        position: 8,
        name:"Nicolas Nasrallah",
        photo: foto,
        enterprise: "STANNUM",
        points: 80,
    },
    {
        position: 9,
        name:"Nicolas Nasrallah",
        photo: foto,
        enterprise: "STANNUM",
        points: 80,
    },
    {
        position: 10,
        name:"Nicolas Nasrallah",
        photo: foto,
        enterprise: "STANNUM",
        points: 80,
    },
    {
        position: 11,
        name:"Nicolas Nasrallah",
        photo: foto,
        enterprise: "STANNUM",
        points: 80,
    },
]

export const RankingHome = () => {
    return (
        <section className="w-full card">
            <div className="w-full flex justify-between items-center">
                <h2 className="w-fit title-2 flex justify-start items-center gap-2">
                    <div>
                        <FaRankingStar className="text-2xl lg:text-3xl relative -top-px"/>
                    </div>
                    Top Leaders
                </h2>
                <Link href={'/'} className="w-fit px-2.5 lg:px-4 py-1 text-sm lg:text-lg rounded-lg border border-card-light relative group hover:bg-card-hover transition-all duration-200 ease-in-out">
                    <FaCircleInfo className="text-xs lg:text-base text-stannum absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 rounded-full bg-card scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 ease-in-out"/>
                    Temporada 1
                </Link>
            </div>
            <div className="mt-4 lg:mt-8 w-full">
                <div className="w-full grid grid-cols-12 lg:grid-cols-8 gap-1 lg:gap-2 px-1 lg:px-4">
                    <h3 className="col-span-2 lg:col-span-1 text-center text-xs lg:text-base">Posición</h3>
                    <h3 className="col-span-5 lg:col-span-4 lg:pl-2 text-xs lg:text-base">Jugador</h3>
                    <h3 className="col-span-3 lg:col-span-2 lg:pl-2 text-xs lg:text-base">Empresa</h3>
                    <h3 className="col-span-2 lg:col-span-1 text-center text-xs lg:text-base">Puntos</h3>
                </div>
                <div className="mt-2 w-[calc(100%+11px)] lg:w-[calc(100%+13px)] pr-1.5 lg:pr-2 flex flex-col gap-1.5 lg:gap-3 justify-start items-start max-h-80 lg:max-h-64 overflow-y-scroll overflow-x-hidden">
                    {
                        rankings.map((player:SimpleRanking, i:number) => (
                            <CardRankingHome {...player} key={i}/>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}