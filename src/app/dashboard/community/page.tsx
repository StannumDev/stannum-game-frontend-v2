import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Comunidad',
    description: "Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.",
    keywords: ['emprendedores', 'STANNUM'],
    openGraph: {
        title: 'Comunidad | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
        url: 'https://stanumgame.com/dashboard/community',
        siteName: 'STANNUM',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://stannumgame.com/dashboard/community',
        creator: 'STANNUM',
        title: 'Comunidad | STANNUM Game',
        description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
    },
};

export default async function CommunityPage() {
    return (
        <main className="main-container size-full px-4 text-center justify-center items-center gap-0">
            <h1 className="sr-only">Comunidad STANNUM Game</h1>
            <div className="flex flex-col justify-center items-center">
                <h2 className="title-2 text-3xl lg:text-5xl opacity-75">Proximamente</h2>
                <p className='mt-4 subtitle-1 max-w-xl overflow-auto text-ellipsis whitespace-normal'>Aquí se abrirá la puerta a la Comunidad STANNUM, el lugar donde los líderes se potencian juntos. Tendrás acceso al <b className="font-black text-stannum">Banco de Prompts Perfectos</b> listos para aplicar, una <b className="font-black text-stannum">biblioteca de GPTs personalizados</b> diseñados para negocios reales, y muchos más recursos que llevarán tu rendimiento al siguiente nivel.</p>
            </div>
        </main>
    );
}