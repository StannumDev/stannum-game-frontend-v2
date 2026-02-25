import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-svh flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,204,0.05)_0%,transparent_70%)]" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-md">
                <span className="text-[10rem] lg:text-[14rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-card-light to-card select-none">
                    404
                </span>

                <h1 className="mt-2 text-2xl lg:text-3xl font-black uppercase tracking-wider text-white">
                    Fuera de la cancha
                </h1>
                <p className="mt-3 text-sm lg:text-base text-card-lightest leading-relaxed">
                    Esta página no existe o fue movida. Volvé al inicio para seguir entrenando.
                </p>

                <Link
                    href="/"
                    className="mt-8 h-11 px-8 text-sm font-bold uppercase tracking-wider bg-stannum hover:bg-stannum-light text-card rounded-lg flex items-center gap-2 transition-200"
                >
                    Volver al inicio
                </Link>
            </div>
        </main>
    );
}
