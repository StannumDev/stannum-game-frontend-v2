'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Program } from '@/interfaces';
import { ArrowRightIcon, KeyIcon, CheckIcon, VideosIcon, CompassIcon, ChestIcon } from '@/icons';

interface Props {
    program: Program;
    isPurchased: boolean;
}

export const ProgramPurchasePanel = ({ program, isPurchased }: Props) => {
    const { id, price, purchasable, logo, background } = program;

    const totalLessons = program.sections.reduce((acc, s) => acc + (s.modules?.reduce((m, mod) => m + mod.lessons.length, 0) ?? 0), 0);
    const totalInstructions = program.sections.reduce((acc, s) => acc + (s.modules?.reduce((m, mod) => m + mod.instructions.length, 0) ?? 0), 0);
    const totalModules = program.sections.reduce((acc, s) => acc + (s.modules?.length ?? 0), 0);

    if (isPurchased) {
        return (
            <div className="rounded-xl overflow-hidden sticky top-6 border border-card">
                <div className="relative aspect-[3/1]">
                    <div className="size-full bg-gradient-to-t from-card to-transparent absolute top-0 left-0 z-10" />
                    <Image src={background} alt={program.name} className="size-full object-cover absolute top-0 left-0 z-0" />
                    <div className="absolute bottom-3 left-4 z-20">
                        <Image src={logo} alt={program.name} className="w-28" />
                    </div>
                </div>
                <div className="bg-card p-5 flex flex-col gap-3">
                    <div className="bg-stannum/15 text-stannum text-sm font-semibold py-2 px-3 rounded-lg text-center">
                        En tu biblioteca
                    </div>
                    <Link href={`/dashboard/library/${id}`} className="w-full py-3 rounded-lg bg-stannum text-black font-bold text-center hover:bg-stannum-light transition-200 flex items-center justify-center gap-2">
                        Ir al programa
                        <ArrowRightIcon className="size-4" />
                    </Link>
                </div>
            </div>
        );
    }

    if (price < 0) {
        return (
            <div className="rounded-xl overflow-hidden sticky top-6 border border-card opacity-50">
                <div className="relative aspect-[3/1]">
                    <div className="size-full bg-gradient-to-t from-card to-transparent absolute top-0 left-0 z-10" />
                    <Image src={background} alt={program.name} className="size-full object-cover absolute top-0 left-0 z-0" />
                    <div className="absolute bottom-3 left-4 z-20">
                        <Image src={logo} alt={program.name} className="w-28" />
                    </div>
                </div>
                <div className="bg-card p-5 flex flex-col gap-3">
                    <span className="text-2xl font-black">Próximamente</span>
                    <p className="text-sm text-white/60">Este programa estará disponible pronto.</p>
                </div>
            </div>
        );
    }

    if (!purchasable) {
        return (
            <div className="rounded-xl overflow-hidden sticky top-6 border border-card">
                <div className="relative aspect-[3/1]">
                    <div className="size-full bg-gradient-to-t from-card via-card/80 to-transparent absolute top-0 left-0 z-10" />
                    <Image src={background} alt={program.name} className="size-full object-cover absolute top-0 left-0 z-0" />
                    <div className="absolute bottom-3 left-4 z-20">
                        <Image src={logo} alt={program.name} className="w-28" />
                    </div>
                </div>
                <div className="bg-card p-5 flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { icon: <VideosIcon className="size-3.5 text-stannum" />, text: `${totalLessons} lecciones en video` },
                            { icon: <CompassIcon className="size-3.5 text-stannum" />, text: `${totalInstructions} instrucciones` },
                            { icon: <ChestIcon className="size-3.5 text-amber-400" />, text: `${totalModules} cofres de recompensa` },
                            { icon: <CheckIcon className="size-3.5 text-stannum" />, text: 'Acceso de por vida' },
                        ].filter(item => !item.text.startsWith('0')).map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                {item.icon}
                                <span className="text-xs text-white/60">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-sm text-white/50">
                        Este programa se activa con una clave de producto.
                    </p>

                    <Link
                        href="/dashboard?activar=true"
                        className="w-full py-3.5 rounded-lg bg-card-light text-white font-bold text-center hover:bg-white/10 transition-200 flex items-center justify-center gap-2"
                    >
                        <KeyIcon className="size-4" />
                        Activar clave
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl overflow-hidden sticky top-6 border border-card">
            <div className="relative aspect-[3/1]">
                <div className="size-full bg-gradient-to-t from-card via-card/80 to-transparent absolute top-0 left-0 z-10" />
                <Image src={background} alt={program.name} className="size-full object-cover absolute top-0 left-0 z-0" />
                <div className="absolute bottom-3 left-5 right-5 z-20 flex items-end justify-between">
                    <Image src={logo} alt={program.name} className="w-32" />
                    {price === 0 ? (
                        <span className="text-2xl font-black text-stannum">Gratis</span>
                    ) : (
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black">{price}</span>
                            <span className="text-xs text-white/50">USD</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-card p-5 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { icon: <VideosIcon className="size-3.5 text-stannum" />, text: `${totalLessons} lecciones en video` },
                        { icon: <CompassIcon className="size-3.5 text-stannum" />, text: `${totalInstructions} instrucciones` },
                        { icon: <ChestIcon className="size-3.5 text-amber-400" />, text: `${totalModules} cofres de recompensa` },
                        { icon: <CheckIcon className="size-3.5 text-stannum" />, text: 'Acceso de por vida' },
                    ].filter(item => !item.text.startsWith('0')).map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            {item.icon}
                            <span className="text-xs text-white/60">{item.text}</span>
                        </div>
                    ))}
                </div>

                <Link
                    href={`/dashboard/checkout/${id}`}
                    className="w-full py-3.5 rounded-lg bg-stannum text-black font-extrabold text-center hover:bg-stannum-light transition-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    style={{ transition: 'all 0.2s' }}
                >
                    {price === 0 ? 'Empezar ahora' : 'Comprar ahora'}
                    <ArrowRightIcon className="size-4" />
                </Link>

                <Link
                    href="/dashboard?activar=true"
                    className="w-full flex items-center justify-center gap-2 text-xs text-white/40 hover:text-white/70 transition-200"
                >
                    <KeyIcon className="size-3.5" />
                    <span>¿Tenés una clave de producto? Activar clave</span>
                </Link>
            </div>
        </div>
    );
};
