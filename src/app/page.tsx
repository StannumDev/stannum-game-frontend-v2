import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Conoce STANNUM Game',
  description: "Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.",
  keywords: ['emprendedores', 'STANNUM'],
  openGraph: {
      title: 'Conoce STANNUM Game',
      description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
      url: 'https://stanumgame.com',
      siteName: 'STANNUM',
      locale: 'es_AR',
      type: 'website',
  },
  twitter: {
      card: 'summary_large_image',
      site: 'https://stannumgame.com',
      creator: 'STANNUM',
      title: 'Conoce STANNUM Game',
      description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
  },
};

export default function LandingPage() {
  return (
    <main className="main-container"></main>
  );
}
