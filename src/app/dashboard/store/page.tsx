import { Suspense } from "react";
import { StoreTinsBalance, StoreTinsSection, StoreSectionsLayout } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tienda',
    description: "Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.",
    keywords: ['emprendedores', 'STANNUM'],
    openGraph: {
        title: 'Tienda | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
        url: 'https://stannumgame.com/dashboard/store',
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
            <header className="w-full flex justify-between items-center gap-2">
                <h1 className="title-1">Tienda</h1>
                <StoreTinsBalance/>
            </header>
            <Suspense fallback={<div className="w-full card animate-pulse h-64 bg-card-light rounded-xl" />}>
                <StoreTinsSection/>
            </Suspense>
            <Suspense fallback={<div className="w-full card animate-pulse h-40 bg-card-light rounded-xl" />}>
                <StoreSectionsLayout/>
            </Suspense>
        </main>
    );
}