import { Metadata } from 'next';
import { PromptsGrid } from '@/components';

export const metadata: Metadata = {
    title: 'Banco de Prompts',
    description: 'Explora y copia prompts de IA personalizados creados por la comunidad STANNUM Game. Potencia tu productividad con herramientas de ventas, marketing, innovación y más.',
    keywords: ['prompts IA', 'ChatGPT prompts', 'Claude prompts', 'STANNUM', 'productividad', 'automatización', 'prompts efectivos'],
    openGraph: {
        title: 'Banco de Prompts | STANNUM Game',
        description: 'Explora prompts de IA personalizados creados por la comunidad STANNUM. Potencia tu trabajo con herramientas especializadas.',
        url: 'https://stannumgame.com/community/prompts',
        siteName: 'STANNUM',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://stannumgame.com/community/prompts',
        creator: 'STANNUM',
        title: 'Banco de Prompts | STANNUM Game',
        description: 'Explora prompts de IA personalizados creados por la comunidad STANNUM.',
    },
};

export default function PromptsPage() {
    return (
        <main className="main-container">
            <PromptsGrid />
        </main>
    );
}