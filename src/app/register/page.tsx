import { Metadata } from "next";
import Image from "next/image";
import { RegisterHandler } from "@/components";
import background from "@/assets/background/register.webp";

export const metadata: Metadata = {
    title: 'Regístrate',
    description: "Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.",
    keywords: ['emprendedores', 'STANNUM'],
    openGraph: {
        title: 'Regístrate | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
        url: 'https://stanumgame.com/register',
        siteName: 'STANNUM',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://stannumgame.com/register',
        creator: 'STANNUM',
        title: 'Regístrate | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
    },
};

export default function RegisterPage() {
    return (
        <main className="grow w-full flex flex-col items-center bg-card relative">
            <h1 className="sr-only">Registrate gratis en STANNUM Game</h1>
            <div className="w-full min-h-svh absolute top-0 left-0">
                <div className="w-full min-h-svh fixed">
                    <Image src={background} draggable={false} alt='Registrate gratis en STANNUM Game' className="size-full object-cover blur-sm absolute top-0 left-0"/>
                </div>
            </div>
            <RegisterHandler/>
        </main>
    );
}