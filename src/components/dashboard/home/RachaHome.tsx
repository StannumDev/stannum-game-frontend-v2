// import { PiWarningThin } from "react-icons/pi";
import { PiWarningOctagonThin } from "react-icons/pi";

export const RachaHome = () => {
    return (
        <section className="w-full card pr-0 border-2 border-invalid shadow-lg shadow-[rgba(244,80,80,0.25)]">
            <div className="w-full flex justify-center items-stretch">
                <div className="w-fit">
                    <h2 className="text-2xl font-black uppercase">¡Todavia <b className="text-invalid font-black">no <span className="block">entrenaste hoy!</span></b></h2>
                    <p className="mt-2">Aún no completaste tu entrenamiento del día. <span className="block">Estas a tiempo, pero apresurate o <b className="text-invalid">perderas tu racha!</b></span></p>
                </div>
                <div className="grow flex justify-center items-center">
                    <PiWarningOctagonThin className="text-invalid size-24"/>
                </div>
            </div>
        </section>
    )
}
