import { Metadata } from "next";
import { SearchResultsList } from "@/components";

export const metadata: Metadata = {
    title: 'Resultados de Búsqueda',
    description: "Explora los usuarios y empresas en STANNUM Game.",
    keywords: ['STANNUM', 'búsqueda', 'usuarios', 'empresas'],
    openGraph: {
        title: 'Resultados de Búsqueda | STANNUM Game',
        description: 'Explora los usuarios y empresas en STANNUM Game.',
        url: 'https://stannumgame.com/search',
        siteName: 'STANNUM',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://stannumgame.com/search',
        creator: 'STANNUM',
        title: 'Resultados de Búsqueda | STANNUM Game',
        description: 'Explora los usuarios y empresas en STANNUM Game.',
    },
};

interface Props {
    searchParams: {
        query?: string
    };
}

export default function SearchPage({ searchParams }:Props) {
    const searchQuery = searchParams?.query || "";

    return (
        <main className="main-container">
            <h1 className="sr-only">Resultados de Búsqueda en STANNUM Game</h1>
            <section className="w-full card">
                <h2 className="flex flex-col">
                    <span className="subtitle-1">Mostrando resultados para</span>
                    <span className="title-2">{searchQuery}</span>
                </h2>
            </section>
            <SearchResultsList query={searchQuery}/>
        </main>
    );
}
