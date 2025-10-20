import { Metadata } from 'next';
import { CommunityLanding } from '@/components';

export const metadata: Metadata = {
    title: 'Comunidad STANNUM',
    description: 'Accede al Banco de Prompts y Banco de Asistentes de IA creados por la comunidad STANNUM Game. Potencia tu productividad con herramientas especializadas.',
    keywords: ['comunidad STANNUM', 'prompts IA', 'asistentes IA', 'ChatGPT', 'Claude', 'productividad'],
    openGraph: {
        title: 'Comunidad STANNUM | Banco de Prompts y Asistentes',
        description: 'Descubre prompts y asistentes de IA creados por la comunidad STANNUM Game.',
        url: 'https://stannumgame.com/dashboard/community',
        siteName: 'STANNUM',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://stannumgame.com/dashboard/community',
        creator: 'STANNUM',
        title: 'Comunidad STANNUM | Banco de Prompts y Asistentes',
        description: 'Descubre prompts y asistentes de IA creados por la comunidad STANNUM Game.',
    },
};

export default function CommunityPage() {
    return (
        <main className="main-container">
            <CommunityLanding />
        </main>
    );
}