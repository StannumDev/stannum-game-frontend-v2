import { Metadata } from "next";
import Link from "next/link";
import { GoBackButton, LoginForm, BackgroundLogin, GoogleAuthButton } from "@/components";

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
            <section className="w-full flex flex-col lg:flex-row">
                <BackgroundLogin/>
                <div className="py-24 w-full lg:max-w-3xl lg:min-h-svh flex justify-center items-center px-4 relative z-50">
                    <div className="w-full max-w-lg flex flex-col items-center lg:items-start relative">
                        <GoBackButton className=" absolute -top-4 lg:-top-8 left-0 -translate-y-full"/>
                        <p className="w-full text-3xl font-light">Ingresa a <b className="text-stannum font-semibold block sm:inline">STANNUM Game</b></p>
                        <p className="mt-2 lg:mt-0 w-full text-neutral-400">Completa tus datos para iniciar sesión en la plataforma.</p>
                        <LoginForm/>
                        <div className="mt-4 w-full max-w-lg flex justify-center">
                            <GoogleAuthButton/>
                        </div>
                        <div className="mt-8 w-full max-w-lg flex justify-center items-center gap-4">
                            <div className="grow h-px bg-card-lightest"></div>
                            <p className="shrink-0 subtitle-1">¿Aún no tienes una cuenta?</p>
                            <div className="grow h-px bg-card-lightest"></div>
                        </div>
                        <Link href={'/register'} className="lg:mt-6 w-full h-12 bg-card-light lg:bg-card hover:bg-card-lighter lg:hover:bg-card-light rounded lg:text-lg uppercase font-semibold tracking-widest flex justify-center items-center transition-200">Registrarse gratis</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}