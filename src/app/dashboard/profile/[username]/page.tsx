import { Metadata } from "next";
import { UserProfileWrapper } from "@/components";

interface Props {
    params: Promise<{
        username: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { username } = await params;

    return {
        title: `${username}`,
        description: `Perfil de ${username} en STANNUM Game.`,
        openGraph: {
            title: `${username} | STANNUM Game`,
            description: `Perfil de ${username} en STANNUM Game.`,
        },
        twitter: {
            card: "summary_large_image",
            title: `${username} | STANNUM Game`,
            description: `Perfil de ${username} en STANNUM Game.`,
        },
    };
}

export default async function ProfilePage({ params }: Props) {
    const { username } = await params;
    return (
        <main className="main-container">
            <h1 className="sr-only">Perfil del jugador {username} en STANNUM Game</h1>
            <UserProfileWrapper username={username}/>
        </main>
    );
}