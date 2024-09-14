import stan_help from "@/assets/home/stan_help.webp";
import Image from "next/image";
import { TbInfoHexagon } from "react-icons/tb";

export const StanHelp = () => {
    return (
        <section className="w-full card pl-0 pb-0 pt-2 relative">
            <div className="w-full flex justify-center items-center">
                <div className="grow flex justify-center items-end">
                    <Image src={stan_help} alt="Obtén ayuda de Stan" draggable={false} className="w-full object-contain"/>
                </div>
                <div className="w-fit pb-6 pt-4">
                    <h2 className="text-2xl font-black uppercase">¿Necesitas ayuda?</h2>
                    <p className="mt-2 w-full max-w-sm">Habla con <b className="text-stannum">STAN, el entrenador de STANNUM</b> para recibir soporte y poder solucionar tus dudas e inconvenientes.</p>
                    <TbInfoHexagon className="text-2xl text-stannum absolute top-6 right-6"/>
                </div>
            </div>
        </section>
    )
}
