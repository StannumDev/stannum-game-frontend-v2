import Image from "next/image";
import { RegisterHandler } from "@/components";
import wallpaper from "@/assets/wallpaper/register.webp";

export default function RegisterPage() {
    return (
        <main className="grow w-full flex flex-col justify-start items-center bg-card relative">
            <h1 className="sr-only">Registrate gratis en STANNUM Game</h1>
            <div className="w-full min-h-svh absolute top-0 left-0">
                <div className="w-full min-h-svh fixed">
                    <Image src={wallpaper} draggable={false} alt='Registrate gratis en STANNUM Game' className="size-full object-cover blur-sm absolute top-0 left-0"/>
                </div>
            </div>
            <RegisterHandler/>
        </main>
    );
}