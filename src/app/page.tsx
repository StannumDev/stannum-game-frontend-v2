import { Metadata } from "next";
import Image from "next/image";
import background from '@/assets/background/stannum_game_trophy.webp';
import { STANNUMLogo } from "@/components";
import Link from "next/link";

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
    <main className="w-full flex justify-center relative">
      <h1 className="sr-only">Bienvenido a STANNUM Game</h1>
      <section className="w-full lg:w-auto lg:grow h-full lg:h-auto min-h-svh flex justify-center items-center fixed lg:relative top-0 left-0 overflow-y-hidden">
        <div className="lg:size-full lg:relative min-h-lvh">
          <div className="size-full absolute top-0 left-0 bg-gradient-to-br lg:bg-gradient-to-r from-background/25 lg:from-transparent via-background/75 lg:via-background/50 to-background lg:to-background z-10"></div>
          <div className="size-full absolute top-0 left-0 z-0">
            <Image priority src={background} alt="Presentación STANNUM Game" className="size-full object-cover object-[75%_50%] lg:object-[100%_50%]"/>
          </div>
        </div>
      </section>
      <section className="w-full max-w-3xl min-h-svh p-4 lg:p-12 lg:bg-gradient-to-r lg:from-background lg:to-card/40 text-center flex flex-col justify-center items-center relative z-50">
        <STANNUMLogo className="w-60 lg:w-80 fill-white"/>
        <h2 className="mt-8 lg:mt-12 subtitle-1 text-base lg:text-lg text-stannum">Una nueva forma de aprender</h2>
        <p className="mt-2 w-full max-w-lg text-sm lg:text-base text-white/75">Desarrollamos una forma de enseñanza que combina, los objetivos desafiantes que tienen los grandes deportistas, con lo divertido de los videojuegos.</p>
        <p className="mt-8 subtitle-1 text-base lg:text-lg text-white">Si ya tienes una cuenta...</p>
        <Link
          href={'/login'}
          className="mt-2 w-full max-w-lg h-12 bg-stannum hover:bg-stannum-light rounded lg:text-lg uppercase font-semibold tracking-widest flex justify-center items-center transition-200"
        >
          Inicia sesión
        </Link>
        <p className="mt-8 subtitle-1 text-base lg:text-lg text-white">O regístrate gratis ahora!</p>
        <Link
          href={'/dashboard'}
          className="mt-2 w-full max-w-lg h-12 bg-card-light lg:bg-card hover:bg-card-lighter lg:hover:bg-card-light rounded lg:text-lg uppercase font-semibold tracking-widest flex justify-center items-center transition-200"
        >
          Regístrarme ahora
        </Link>
      </section>
    </main>
  );
}
