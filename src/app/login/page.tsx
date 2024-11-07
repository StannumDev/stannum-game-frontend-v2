import { Metadata } from "next";
import Link from "next/link";
import { GoBackButton, LoginForm, BackgroundLogin } from "@/components";

export const metadata: Metadata = {
  title: 'Inicia sesión',
  description: "Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.",
  keywords: ['emprendedores', 'STANNUM'],
  openGraph: {
      title: 'Inicia sesión | STANNUM Game',
      description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
      url: 'https://stanumgame.com/login',
      siteName: 'STANNUM',
      locale: 'es_AR',
      type: 'website',
  },
  twitter: {
      card: 'summary_large_image',
      site: 'https://stannumgame.com/login',
      creator: 'STANNUM',
      title: 'Inicia sesión | STANNUM Game',
      description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
  },
};

export default function LoginPage() {
    return (
        <main className="grow w-full flex flex-col items-center bg-background">
            <h1 className="sr-only">Inicia sesión en STANNUM Game</h1>
            <section className="w-full flex flex-col lg:flex-row items-start min-h-svh">
                <BackgroundLogin/>
                <div className="mt-2 mb-16 lg:my-0 w-full lg:max-w-3xl lg:h-svh flex justify-center items-center px-4 lg:pl-24 relative z-50">
                    <div className="w-full max-w-sm flex flex-col items-center lg:items-start relative">
                        <GoBackButton className=" absolute -top-4 lg:-top-8 left-0 -translate-y-full"/>
                        <p className="w-full text-3xl font-light">Ingresa a <b className="text-stannum font-semibold block sm:inline">STANNUM Game</b></p>
                        <p className="mt-2 lg:mt-0 w-full text-neutral-400">Completa tus datos para iniciar sesión en la plataforma.</p>
                        <LoginForm/>
                        <div className="lg:mt-8 w-full flex flex-col justify-center items-center text-center">
                            <div className="w-full h-[2px] bg-white/10 opacity-25 hidden lg:block"></div>
                            <p className="mt-6 w-full text-neutral-400">¿Aún no tienes una cuenta?</p>
                            <Link href={'/register'} className="mt-3 w-full lg:w-fit h-9 px-5 bg-card lg:bg-card-light rounded text-sm font-semibold flex justify-center items-center hover:bg-card-light lg:hover:bg-card-lighter transition-200">Registrarse gratis</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}