import Image from "next/image";
import activar_producto from "@/assets/wallpaper/activar_producto.webp";

export const ActivarProductoHome = () => {
    return (
        <section className="w-full card relative overflow-hidden">
            <div className="w-full relative z-20">
                <h2 className="text-2xl font-black uppercase">Activar producto</h2>
                <p className="mt-2 w-full max-w-sm"><b className="text-stannum">Ingresa tu código</b> de activación y comenza a disfrutar tu producto al maximo.</p>
            </div>
            <div className="size-full bg-gradient-to-r from-card to-transparent to-[150%] absolute top-0 left-0 z-10"></div>
            <div className="size-full absolute top-0 left-0 z-0">
                <Image src={activar_producto} alt="Activar producto STANNUM Game" className="size-full object-cover"/>
            </div>
        </section>
    )
}
