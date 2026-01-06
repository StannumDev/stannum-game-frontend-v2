import { Metadata } from "next";
import Image from "next/image";
import { CompleteProfileForm } from "@/components";
import background from "@/assets/background/stannum_game_trophy.webp";

export const metadata: Metadata = {
    title: 'Completá tu perfil',
    description: "Completá tu perfil para acceder a STANNUM Game y comenzar tu entrenamiento.",
    keywords: ['emprendedores', 'STANNUM', 'perfil'],
    openGraph: {
        title: 'Completá tu perfil | STANNUM Game',
        description: 'Completá tu perfil para acceder a STANNUM Game y comenzar tu entrenamiento.',
        url: 'https://stannumgame.com/register/complete-profile',
        siteName: 'STANNUM',
        locale: 'es_AR',
        type: 'website',
    },
};

export default function CompleteProfilePage() {
    return (
        <main className="grow w-full flex flex-col items-center bg-card relative">
            <h1 className="sr-only">Completá tu perfil en STANNUM Game</h1>
            <div className="w-full min-h-svh absolute top-0 left-0">
                <div className="w-full min-h-svh fixed">
                    <Image src={background} draggable={false} alt="Completá tu perfil en STANNUM Game" className="size-full object-cover blur-sm absolute top-0 left-0"/>
                </div>
            </div>
            <CompleteProfileForm />
        </main>
    );
}