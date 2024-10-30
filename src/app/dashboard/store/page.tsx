import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tienda',
    description: "Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.",
    keywords: ['emprendedores', 'STANNUM'],
    openGraph: {
        title: 'Tienda | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
        url: 'https://stanumgame.com/dashboard/store',
        siteName: 'STANNUM',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://stannumgame.com/dashboard/store',
        creator: 'STANNUM',
        title: 'Tienda | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
    },
};

export default function StorePage() {
    return (
        <main className="main-container">
            <h1 className="sr-only">Tienda STANNUM Game</h1>
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8"></div>
        </main>
    );
}