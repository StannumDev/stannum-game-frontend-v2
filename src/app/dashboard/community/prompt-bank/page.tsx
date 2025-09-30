import { PromptBankArsenal } from "@/components";
import { Metadata } from "next";
// import { getUserByToken } from "@/services";

export const metadata: Metadata = {
    title: 'Banco de PROMPTs',
    description: "Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.",
    keywords: ['emprendedores', 'STANNUM'],
    openGraph: {
        title: 'Banco de PROMPTs | STANNUM Game',
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
        title: 'Banco de PROMPTs | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
    },
};

export default async function PromptBankPage() {
    // const user = await getUserByToken();
    return (
        <main className="main-container">
            <h1 className="sr-only">Banco de PROMPTs STANNUM Game</h1>
            <PromptBankArsenal/>
        </main>
    );
}