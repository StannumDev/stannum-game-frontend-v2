import Image from "next/image";
import { TbInfoHexagon } from "react-icons/tb";
import { MotionWrapperLayout } from "@/components";
import stan_help from "@/assets/home/stan_help.webp";

export const StanHelp = () => {
    return (
        <MotionWrapperLayout>
            <section className="w-full card lg:pl-0 pb-0 lg:pt-2 relative">
                <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center">
                    <div className="mt-2 lg:mt-0 w-full lg:w-auto lg:grow flex justify-end lg:justify-center items-end">
                        <Image src={stan_help} alt="Obtén ayuda de Stan" draggable={false} className="w-44 lg:w-full object-contain"/>
                    </div>
                    <div className="w-full lg:w-fit lg:pb-6 lg:pt-4">
                        <h2 className="title-2">¿Necesitas ayuda?</h2>
                        <p className="mt-2 w-full lg:max-w-sm">Habla con <b className="text-stannum">STAN, el entrenador de STANNUM</b> para recibir soporte y poder solucionar tus dudas e inconvenientes.</p>
                        <TbInfoHexagon className="text-2xl text-stannum absolute top-4 lg:top-6 right-4 lg:right-6"/>
                    </div>
                </div>
            </section>
        </MotionWrapperLayout>
    )
}
