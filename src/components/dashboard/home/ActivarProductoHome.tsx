import Image from "next/image";
import activar_producto from "@/assets/wallpaper/activar_producto.webp";

export const ActivarProductoHome = () => {
    return (
        <section className="w-full card card-link relative overflow-hidden group">
            <div className="w-full relative z-20">
                <h2 className="title-2">Activar producto</h2>
                <p className="mt-2 w-full text-sm lg:text-base"><b className="text-stannum">Ingresa tu código</b> de activación y comenza a <span className="block">disfrutar tu producto al maximo.</span></p>
            </div>
            <div className="size-full bg-gradient-to-r from-card to-transparent to-[150%] absolute top-0 left-0 z-10"></div>
            <div className="size-full absolute top-0 left-0 z-0 group-hover:scale-125 transition-200">
                <Image src={activar_producto} alt="Activar producto STANNUM Game" className="size-full object-cover"/>
            </div>
        </section>
    )
}