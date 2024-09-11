import Link from "next/link";
import { GoBackButton, LoginForm, WallpaperLogin } from "@/components";

export default function LoginPage() {
    return (
        <main className="grow w-full flex flex-col justify-start items-center bg-card">
            <h1 className="sr-only">Iniciar sesión</h1>
            <section className="w-full flex flex-col lg:flex-row justify-start items-start h-svh">
                <WallpaperLogin/>
                <div className="mt-16 lg:mt-0 w-full lg:w-1/2 lg:h-svh flex justify-center lg:justify-start items-center px-4 lg:pl-24">
                    <div className="w-full max-w-sm flex flex-col justify-start items-center lg:items-start relative">
                        <GoBackButton className="-top-4 lg:-top-8 left-0"/>
                        <p className="w-full text-3xl text-white font-light">Ingresa a <b className="text-stannum font-bold block sm:inline">STANNUM Game</b></p>
                        <p className="mt-2 lg:mt-0 w-full text-neutral-400">Completa tus datos para iniciar sesión en la plataforma.</p>
                        <LoginForm/>
                        <div className="lg:mt-12 w-full flex flex-col justify-center items-center text-center">
                            <div className="w-full h-[2px] bg-card-lighter opacity-25 hidden lg:block"></div>
                            <p className="mt-6 w-full text-neutral-400">¿Aún no tienes una cuenta?</p>
                            <Link href={'/register'} className="mt-3 w-full lg:w-fit bg-card-light h-9 px-5 text-white rounded-lg text-sm font-semibold flex justify-center items-center hover:bg-card-lighter transition-all duration-200 ease-in-out">Registrarse gratis</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}