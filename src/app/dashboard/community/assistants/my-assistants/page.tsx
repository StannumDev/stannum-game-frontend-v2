import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mis Asistentes',
    description: 'Explora y utiliza asistentes de IA personalizados creados por la comunidad STANNUM Game. Potencia tu productividad con herramientas de ventas, marketing, innovación y más.',
    keywords: ['asistentes IA', 'ChatGPT', 'Claude', 'prompts', 'STANNUM', 'productividad', 'automatización'],
    openGraph: {
        title: 'Mis Asistentes | STANNUM Game',
        description: 'Explora asistentes de IA personalizados creados por la comunidad STANNUM. Potencia tu trabajo con herramientas especializadas.',
        url: 'https://stannumgame.com/community/assistants/my-assistants',
        siteName: 'STANNUM',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://stannumgame.com/community/assistants/my-assistants',
        creator: 'STANNUM',
        title: 'Mis Asistentes | STANNUM Game',
        description: 'Explora asistentes de IA personalizados creados por la comunidad STANNUM.',
    },
};

export default function MyAssistantsPage() {
    return (
        <main className="main-container">
        </main>
    );
}