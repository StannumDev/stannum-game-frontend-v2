import { PiWarningOctagonThin } from "react-icons/pi";

export const RachaHome = () => {
    return (
        <section className="w-full card lg:pr-0 border border-invalid shadow-lg shadow-[rgba(244,80,80,0.25)] relative">
            <div className="w-full flex justify-center items-stretch">
                <div className="w-full lg:w-fit">
                    <h2 className="title-2">¡Todavia <b className="text-invalid font-black">no <span className="block">entrenaste hoy!</span></b></h2>
                    <p className="mt-2 text-sm lg:text-base">Aún no completaste tu entrenamiento del día. <span className="lg:block">Estas a tiempo, pero apresurate o <b className="text-invalid">perderas tu racha!</b></span></p>
                </div>
                <div className="lg:grow flex justify-center items-center absolute top-4 right-4">
                    <PiWarningOctagonThin className="text-invalid size-14 lg:size-24"/>
                </div>
            </div>
        </section>
    )
}