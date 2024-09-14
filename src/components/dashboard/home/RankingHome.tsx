import Link from "next/link";
import { FaRankingStar, FaCircleInfo } from "react-icons/fa6";
import { CardRankingHome } from "@/components";
import foto from "@/assets/user/default_user.webp";
import { SimpleRanking } from "@/interfaces";

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
                <h2 className="w-fit text-2xl font-black uppercase flex justify-start items-center gap-2">
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
                <div className="mt-2 w-[calc(100%+0.5rem)] pr-2 flex flex-col gap-3 justify-start items-start max-h-64 overflow-y-auto overflow-x-hidden">
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