import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Biblioteca',
    description: "Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.",
    keywords: ['emprendedores', 'STANNUM'],
    openGraph: {
        title: 'Biblioteca | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
        url: 'https://stanumgame.com/dashboard/library',
        siteName: 'STANNUM',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://stannumgame.com/dashboard/library',
        creator: 'STANNUM',
        title: 'Biblioteca | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
    },
};

export default function LibraryPage() {
    return (
        <main className="main-container">
            <h1 className="sr-only">Biblioteca STANNUM Game</h1>
            <div>
                <Link href='/dashboard/library/tmd' className="bg-card-light py-1 px-4 rounded-lg">TMD</Link>
            </div>
        </main>
    );
}