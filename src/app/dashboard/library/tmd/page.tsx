import { Metadata } from "next";
import { TMDCover, TMDSectionsLayout } from "@/components";

export const metadata: Metadata = {
    title: 'TRENNO Mark Digital',
    description: "Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.",
    keywords: ['emprendedores', 'STANNUM'],
    openGraph: {
        title: 'TRENNO Mark Digital | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
        url: 'https://stanumgame.com/dashboard/library/tmd',
        siteName: 'STANNUM',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://stannumgame.com/dashboard/library/tmd',
        creator: 'STANNUM',
        title: 'TRENNO Mark Digital | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
    },
};

export default function TMDDashboardPage() {
    return (
        <main className="main-container">
            <h1 className="sr-only">Panel de control TRENNO Mark Digital STANNUM Game</h1>
            <TMDCover />
            <TMDSectionsLayout/>
        </main>
    );
}