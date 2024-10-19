import Link from "next/link";
import { PlayIcon } from "@/icons";

export const ContinuarCardHome = () => {
    return (
        <Link href={'/'} aria-label="Continuar entrenando en ${}" className="w-64 lg:w-[calc((100%-2rem)/3)] shrink-0 aspect-square">
            <article className="size-full card flex flex-col justify-start items-start hover:border-card-lightest transition-200 group">
                <h3 className="w-full text-start text-2xl font-black">TRENNO MARK DIGITAL</h3>
                <div className="w-full grow flex justify-start items-end">
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full text-neutral-400 group-hover:text-white font-semibold flex justify-start items-center gap-2 transition-200">
                            Continuar
                            <PlayIcon className="relative top-px"/>
                        </div>
                        <div className="w-1/2 group-hover:w-full h-1.5 bg-card-light rounded-lg flex overflow-hidden transition-200" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={0}>
                            <div className="flex flex-col justify-center bg-stannum" style={{ width: '25%' }}></div>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
}
