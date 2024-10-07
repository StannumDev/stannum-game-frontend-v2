import { MdPlayCircle } from "react-icons/md";
import { MotionWrapperLayout, ContinuarCardHome } from "@/components";

export const ContinuarHome = () => {
    return (
        <MotionWrapperLayout>
            <section className="w-full">
                <h2 className="w-full font-black text-2xl text-center flex justify-start items-center gap-1">
                    <MdPlayCircle/>
                    Continuar viendo
                </h2>
                <div className="mt-2 w-full pb-2 lg:pb-0 lg:grid lg:grid-cols-3 flex gap-4 overflow-x-auto lg:overflow-x-hidden">
                    <ContinuarCardHome/>
                    <ContinuarCardHome/>
                    <ContinuarCardHome/>
                </div>
            </section>
        </MotionWrapperLayout>
    )
}
