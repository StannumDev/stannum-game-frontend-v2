import { Metadata } from 'next';
import { MyPromptsGrid } from '@/components';

export const metadata: Metadata = {
    title: 'Mis Prompts',
    description: 'Administra tus prompts de IA creados para la comunidad STANNUM Game. Comparte tus mejores prompts para ChatGPT, Claude, Gemini y otras plataformas.',
    keywords: ['prompts IA', 'ChatGPT', 'Claude', 'Gemini', 'STANNUM', 'prompts personalizados', 'ingeniería de prompts', 'productividad'],
    openGraph: {
        title: 'Mis Prompts | STANNUM Game',
        description: 'Administra y comparte tus prompts de IA con la comunidad STANNUM. Crea, edita y publica prompts especializados.',
        url: 'https://stannumgame.com/dashboard/community/prompts/my-prompts',
        siteName: 'STANNUM',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://stannumgame.com/dashboard/community/prompts/my-prompts',
        creator: 'STANNUM',
        title: 'Mis Prompts | STANNUM Game',
        description: 'Administra y comparte tus prompts de IA con la comunidad STANNUM.',
    },
};

export default function MyPromptsPage() {
    return (
        <main className="main-container">
            <MyPromptsGrid />
        </main>
    );
}