import { Metadata } from "next";
import { HomeContainer } from "@/components"

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
    return (
        <main className="main-container">
            <h1 className="sr-only">Pantalla principal STANNUM Game</h1>
            <HomeContainer/>
        </main>
    );
}