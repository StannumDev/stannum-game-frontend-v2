import { PresentacionHome, GoalsHome, ContinuarHome, ActivarProductoHome, RankingHome, RachaHome, StanHelp } from "@/components"

export default function HomePage() {
    return (
        <main className="main-container">
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