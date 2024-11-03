import { InfoHexagonIcon } from "@/icons";
import { MotionWrapperLayout, GoalCardHome } from "@/components";

export const GoalsHome = () => {
    return (
        <MotionWrapperLayout>
            <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="hidden col-span-1 card aspect-square lg:flex flex-col justify-center items-center">
                    <p className="grow text-3xl font-thin uppercase">Monitorea tus <b className="text-stannum font-semibold">goals</b> diariamente</p>
                    <p className="w-full px-3 flex justify-center items-center gap-3">
                        <InfoHexagonIcon className="text-2xl shrink-0 text-stannum"/>
                        <span className="leading-tight">Ver más detalles acerca de mis goals</span>
                    </p>
                </div>
                <div className="col-span-1 lg:col-span-2 relative">
                    <div className="h-full w-full overflow-x-scroll pb-2">
                        <div className="size-full pb-[13px] absolute top-0 right-0 pointer-events-none z-20">
                            <div className="size-full border border-card rounded-lg"></div>
                        </div>
                        <div className="size-full pb-[13px] absolute top-0 right-0 pointer-events-none z-0">
                            <div className="size-full card rounded-lg"></div>
                        </div>
                        <div className="h-full w-fit card bg-none border-transparent flex gap-4 lg:gap-8 min-h-56 lg:min-h-0 relative z-10">
                            <GoalCardHome/>
                            <GoalCardHome/>
                            <GoalCardHome/>
                            <GoalCardHome/>
                        </div>
                    </div>
                </div>
            </section>
        </MotionWrapperLayout>
    )
}
