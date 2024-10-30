import { Metadata } from "next";
import { UserProfileDetails, ProfileSectionsLayout } from "@/components";

export const metadata: Metadata = {
    title: 'alezerda',
    description: "Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.",
    keywords: ['emprendedores', 'STANNUM'],
    openGraph: {
        title: 'alezerda | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
        url: 'https://stanumgame.com/dashboard/profile',
        siteName: 'STANNUM',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://stannumgame.com/dashboard/profile',
        creator: 'STANNUM',
        title: 'alezerda | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
    },
};

export default function ProfilePage() {
    return (
        <main className="main-container">
            <h1 className="sr-only">Perfil del jugador STANNUM Game</h1>
            <UserProfileDetails/>
            <ProfileSectionsLayout/>
        </main>
    );
}