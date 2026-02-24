import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="main-container size-full justify-center items-center text-center gap-4">
            <h1 className="text-6xl font-black text-card-lightest">404</h1>
            <p className="text-lg text-card-lightest">Sección no encontrada</p>
            <Link
                href="/dashboard"
                className="mt-4 h-10 px-6 text-sm font-semibold bg-stannum hover:bg-stannum-light text-card rounded flex items-center transition-200"
            >
                Volver al dashboard
            </Link>
        </main>
    );
}
