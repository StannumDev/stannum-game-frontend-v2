import { UserProfileEditInfo } from "@/components";
import { FullUserDetails } from "@/interfaces";

interface Props{
    user: FullUserDetails
}

export const UserProfileInfo = ({user}:Props) => {
    return (
        <div className="w-full flex flex-wrap gap-4">
            <section className="w-full lg:w-[calc((100%/3)*2-16px)] card relative">
                <h2 className="title-2">Información</h2>
                <div className="mt-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-sm text-neutral-500 font-semibold">Nombre</h3>
                        <p className="w-full title-3 truncate">{user?.profile?.name}</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-neutral-500 font-semibold">Empresa</h3>
                        <p className="w-full title-3 truncate">{user?.enterprise?.name}</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-neutral-500 font-semibold">Ubicación</h3>
                        <p className="w-full title-3 truncate">{user?.profile?.region}, {user?.profile?.country}</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-neutral-500 font-semibold">Rol</h3>
                        <p className="w-full title-3 truncate">{user?.enterprise?.jobPosition}</p>
                    </div>
                    <UserProfileEditInfo user={user}/>
                </div>
            </section>
            <section className="w-full lg:w-1/3 min-h-32 max-h-96 lg:h-auto card flex flex-col gap-4">
                <h2 className="title-2">Acerca de</h2>
                <div className="w-[calc(100%+13px)] lg:grow relative overflow-y-auto">
                    <div className="size-full pr-4 lg:absolute lg:top-0 lg:left-0 whitespace-pre-line">
                        { user?.profile?.aboutMe }
                    </div>
                </div>
            </section>
        </div>
    )
}