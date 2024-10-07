import { PresentacionHome, GoalsHome, ContinuarHome, ActivarProductoHome, RankingHome, RachaHome, StanHelp } from "@/components"

export default function HomePage() {
    return (
        <main className="mt-12 mb-14 lg:my-0 grow min-w-0 lg:min-h-svh p-4 flex flex-col gap-4 overflow-x-hidden">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4">
                <div className="lg:col-span-7 lg:min-h-svh flex flex-col justify-start items-start gap-4 lg:gap-4">
                    <PresentacionHome/>
                    <GoalsHome/>
                    <ContinuarHome/>
                </div>
                <div className="lg:col-span-5 lg:min-h-svh flex flex-col justify-start items-start gap-4 lg:gap-4">
                    <RachaHome/>
                    <ActivarProductoHome/>
                    <RankingHome/>
                    <StanHelp/>
                </div>
            </div>
        </main>
    );
}