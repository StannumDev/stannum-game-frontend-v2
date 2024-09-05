import Image from "next/image";
import wallpaper from "@/assets/wallpaper/login.webp"
import Link from "next/link";
import { TfiBackLeft } from "react-icons/tfi";

export default function LoginPage() {
    return (
        <main className="grow w-full flex flex-col justify-start items-center bg-card">
            <h1 className="sr-only">Iniciar sesión</h1>
            <section className="w-full flex justify-center items-center h-svh">
                <div className="w-1/2 h-svh relative">
                    <Image src={wallpaper} alt='Iniciar sesión' className="size-full object-cover absolute top-0 left-0"/>
                </div>
                <div className="w-1/2 h-svh flex justify-start items-center pl-24">
                    <div className="w-full max-w-md flex flex-col justify-start items-start">
                        <Link href={'/'} className="flex items-center gap-1.5 text-white">
                            <TfiBackLeft className="stroke-1 text-base relative top-px"/>
                            <span className="font-semibold text-lg">Volver</span>
                        </Link>
                        <p className="mt-4 text-3xl text-white font-light">Ingresa a <b className="text-stannum font-bold">STANNUM Game</b></p>
                        <p className="text-neutral-400">Completa tus datos para iniciar sesión en la plataforma.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}