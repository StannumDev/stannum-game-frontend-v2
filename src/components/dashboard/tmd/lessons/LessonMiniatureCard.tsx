import Image from "next/image";

export const LessonMiniatureCard = () => {
    return (
        <div className="w-full grid grid-cols-5 p-2 rounded-lg hover:bg-white/10 transition-200 cursor-pointer">
            <div className="col-span-2 aspect-video rounded-lg relative overflow-hidden">
                <Image
                    className="size-full aspect-video object-cover absolute top-0 left-0"
                    width={160}
                    height={90}
                    src={'https://image.mux.com/BD02aMIvQ3Nykgeia02rcGRJ9n11CcTHrSOe9e00r8IwY00/thumbnail.png?width=160&height=90&time=5'}
                    alt="Miniatura video"
                />
            </div>
            <div className="col-span-3 px-4 py-2 flex flex-col">
                <p className="subtitle-1">Módulo 01</p>
                <h2 className="w-full title-3 grow truncate">Organización digital digital digital digital</h2>
                <p className="subtitle-1">Incompleto</p>
            </div>
        </div>
    )
}
