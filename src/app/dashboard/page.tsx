import { Metadata } from "next";
import { PresentacionHome, ContinuarHome, ActivarProductoHome, RankingHome, RachaHome, StanHelp } from "@/components"
import { getUserByToken } from "@/services";

export const metadata: Metadata = {
    title: 'Inicio',
    description: "Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.",
    keywords: ['emprendedores', 'STANNUM'],
    openGraph: {
        title: 'Inicio | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
        url: 'https://stanumgame.com/dashboard',
        siteName: 'STANNUM',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://stannumgame.com/dashboard',
        creator: 'STANNUM',
        title: 'Inicio | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
    },
};

export default async function HomePage() {
    const user = await getUserByToken();
    if (!user) return null;
    return (
        <main className="main-container">
            <h1 className="sr-only">Pantalla principal STANNUM Game</h1>
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4">
                <div className="lg:col-span-7 lg:min-h-svh flex flex-col items-start gap-4 lg:gap-4">
                    <PresentacionHome/>
                    {/* <GoalsHome/> */}
                    <ContinuarHome user={user}/>
                </div>
                <div className="lg:col-span-5 lg:min-h-svh flex flex-col items-start gap-4 lg:gap-4">
                    <RachaHome user={user}/>
                    <ActivarProductoHome/>
                    <RankingHome/>
                    <StanHelp/>
                </div>
            </div>
        </main>
    );
}