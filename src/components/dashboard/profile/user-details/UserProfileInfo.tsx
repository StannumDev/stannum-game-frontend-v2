export const UserProfileInfo = () => {
    return (
        <div className="w-full flex gap-4">
            <section className="w-[calc((100%/3)*2-16px)] card">
                <h2 className="title-2">Información</h2>
                <div className="mt-4 w-full grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-sm text-neutral-500 font-semibold">Nombre</h3>
                        <p className="w-full title-3 truncate">Mateo Bernabé Lohezic</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-neutral-500 font-semibold">Empresa</h3>
                        <p className="w-full title-3 truncate">STANNUM</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-neutral-500 font-semibold">Ubicación</h3>
                        <p className="w-full title-3 truncate">Tucumán, Argentina</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-neutral-500 font-semibold">Rol</h3>
                        <p className="w-full title-3 truncate">Desarrollador Full-Stack</p>
                    </div>
                </div>
            </section>
            <section className="w-1/3 card flex flex-col gap-4">
                <h2 className="title-2">Acerca de</h2>
                <div className="w-[calc(100%+13px)] grow relative overflow-y-auto">
                    <div className="size-full absolute top-0 left-0">
                        <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, harum ab modi voluptatibus ut voluptates quisquam esse dignissimos soluta, nostrum laboriosam odit? Error ratione exercitationem dolore perspiciatis similique sunt quia!</p>
                        <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, harum ab modi voluptatibus ut voluptates quisquam esse dignissimos soluta, nostrum laboriosam odit? Error ratione exercitationem dolore perspiciatis similique sunt quia!</p>
                        <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, harum ab modi voluptatibus ut voluptates quisquam esse dignissimos soluta, nostrum laboriosam odit? Error ratione exercitationem dolore perspiciatis similique sunt quia!</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
