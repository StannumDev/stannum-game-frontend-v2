import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserDetailsByUsernameServer } from "@/services";
import { UserProfileWrapper } from "@/components";

interface Props {
    params: Promise<{
        username: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { username } = await params
    try {
        const user = await getUserDetailsByUsernameServer(username);

        if (!user) {
            return {
                title: "Usuario no encontrado",
                description: "El perfil solicitado no existe.",
            };
        }

        return {
            title: `${user.username}`,
            description: `Perfil de ${user.username} en STANNUM Game.`,
            openGraph: {
                title: `${user.username} | STANNUM Game`,
                description: `Perfil de ${user.username} en STANNUM Game.`,
            },
            twitter: {
                card: "summary_large_image",
                title: `${user.username} | STANNUM Game`,
                description: `Perfil de ${user.username} en STANNUM Game.`,
            },
        };
    } catch (error:unknown) {
        return {
            title: "Usuario no encontrado",
            description: "Hubo un problema al cargar el perfil solicitado.",
        };
    }
}

export default async function ProfilePage({ params }: Props) {
    const { username } = await params;
    const userDetails = await getUserDetailsByUsernameServer(username);
    if (!userDetails) return notFound();
    return (
        <main className="main-container">
            <h1 className="sr-only">Perfil del jugador {username} en STANNUM Game</h1>
            <UserProfileWrapper username={username}/>
        </main>
    );
}