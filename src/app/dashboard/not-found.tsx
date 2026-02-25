import Link from 'next/link';
import { HomeIcon } from '@/icons';

export default function NotFound() {
    return (
        <main className="main-container size-full justify-center items-center">
            <div className="w-full max-w-sm flex flex-col items-center text-center">
                <span className="text-[8rem] lg:text-[10rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-card-light to-card select-none">
                    404
                </span>

                <h1 className="mt-1 text-xl lg:text-2xl font-black uppercase tracking-wider text-white">
                    Misión no encontrada
                </h1>
                <p className="mt-2 text-sm text-card-lightest leading-relaxed">
                    Parece que esta sección no existe. Volvé al dashboard para seguir avanzando.
                </p>

                <Link
                    href="/dashboard"
                    className="mt-6 h-10 px-6 text-sm font-bold uppercase tracking-wider bg-stannum hover:bg-stannum-light text-card rounded-lg flex items-center gap-2 transition-200"
                >
                    <HomeIcon className="size-4" />
                    Ir al dashboard
                </Link>
            </div>
        </main>
    );
}
