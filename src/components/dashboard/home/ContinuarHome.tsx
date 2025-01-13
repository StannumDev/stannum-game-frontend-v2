import { PlayCircleIcon } from "@/icons";
import { MotionWrapperLayout, ContinuarCardHome } from "@/components";

export const ContinuarHome = () => {
    return (
        <MotionWrapperLayout>
            <section id="continue-training" className="w-full">
                <h2 className="w-full font-black text-2xl text-center flex items-center gap-1">
                    <PlayCircleIcon/>
                    Continuar entrenando
                </h2>
                <div className="mt-2 w-full pb-2 flex gap-4 overflow-x-auto">
                    <ContinuarCardHome/>
                    <ContinuarCardHome/>
                    <ContinuarCardHome/>
                    <ContinuarCardHome/>
                    <ContinuarCardHome/>
                </div>
            </section>
        </MotionWrapperLayout>
    )
}
