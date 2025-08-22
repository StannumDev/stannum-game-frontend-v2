import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserByToken, getUserDetailsByUsernameServer } from "@/services";
import { UserProfileWrapper } from "@/components";

interface Props {
    params: {
        username: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const user = await getUserDetailsByUsernameServer(params.username);

        if (!user) {
            return {
                title: "Usuario no encontrado | STANNUM Game",
                description: "El perfil solicitado no existe.",
            };
        }

        return {
            title: `${user.username} | STANNUM Game`,
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
            title: "Usuario no encontrado | STANNUM Game",
            description: "Hubo un problema al cargar el perfil solicitado.",
        };
    }
}

export default async function ProfilePage({ params }: Props) {
    const { username } = params;

    const user = await getUserByToken();
    if (!user) return null;
    
    const userDetails = await getUserDetailsByUsernameServer(username);
    if (!userDetails) return notFound();

    return (
        <main className="main-container">
            <h1 className="sr-only">Perfil del jugador {username} en STANNUM Game</h1>
            <UserProfileWrapper owner={user.username === username} username={username}/>
        </main>
    );
}