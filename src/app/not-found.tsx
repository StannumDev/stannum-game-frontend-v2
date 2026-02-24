import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-svh flex flex-col items-center justify-center gap-4 text-center px-4">
            <h1 className="text-6xl font-black text-card-lightest">404</h1>
            <p className="text-lg text-card-lightest">Página no encontrada</p>
            <Link
                href="/"
                className="mt-4 h-10 px-6 text-sm font-semibold bg-stannum hover:bg-stannum-light text-card rounded flex items-center transition-200"
            >
                Volver al inicio
            </Link>
        </main>
    );
}
