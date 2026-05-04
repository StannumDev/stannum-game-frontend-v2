import { Metadata } from "next";
import Image from "next/image";
import { ActivateAccountHandler } from "@/components";
import background from "@/assets/background/stannum_game_trophy.webp";

export const metadata: Metadata = {
    title: 'Activá tu cuenta',
    description: "Activá tu cuenta de STANNUM Game y empezá tu entrenamiento.",
    robots: { index: false, follow: false },
};

export default function ActivateAccountPage() {
    return (
        <main className="grow w-full flex flex-col items-center bg-card relative">
            <h1 className="sr-only">Activá tu cuenta en STANNUM Game</h1>
            <div className="w-full min-h-svh absolute top-0 left-0">
                <div className="w-full min-h-svh fixed">
                    <Image src={background} draggable={false} alt="Activá tu cuenta en STANNUM Game" className="size-full object-cover blur-sm absolute top-0 left-0"/>
                </div>
            </div>
            <ActivateAccountHandler/>
        </main>
    );
}
