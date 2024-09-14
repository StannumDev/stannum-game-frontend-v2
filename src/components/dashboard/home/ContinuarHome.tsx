import { MdPlayCircle } from "react-icons/md";
import { ContinuarCardHome } from "@/components";

export const ContinuarHome = () => {
    return (
        <section className="w-full">
            <h2 className="w-full font-black text-2xl text-center flex justify-start items-center gap-1">
                <MdPlayCircle/>
                Continuar viendo
            </h2>
            <div className="mt-4 w-full grid grid-cols-3 gap-4">
                <ContinuarCardHome/>
                <ContinuarCardHome/>
                <ContinuarCardHome/>
            </div>
        </section>
    )
}
