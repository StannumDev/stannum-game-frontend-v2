'use client'

import { TbInfoHexagon } from "react-icons/tb"
import { GoalCardHome } from "@/components"

export const GoalsHome = () => {
    return (
        <div className="w-full grid grid-cols-3 gap-8">
            <div className="col-span-1 card aspect-square flex flex-col justify-center items-center">
                <p className="grow text-3xl font-thin uppercase">Monitorea tus <b className="text-stannum font-semibold">goals</b> diariamente</p>
                <p className="w-full px-3 text-base flex justify-center items-center gap-3">
                    <TbInfoHexagon className="text-2xl shrink-0 text-stannum"/>
                    <span className="text-pretty leading-tight">Ver más detalles acerca de mis goals</span>
                </p>
            </div>
            <div className="col-span-2 card flex justify-start items-stretch gap-8 overflow-x-auto">
                <GoalCardHome/>
                <GoalCardHome/>
                <GoalCardHome/>
                <GoalCardHome/>
            </div>
        </div>
    )
}
