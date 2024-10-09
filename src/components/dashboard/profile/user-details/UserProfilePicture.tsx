import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import default_user from '@/assets/user/default_user.webp';

export const UserProfilePicture = () => {
    return (
        <div className="size-24 lg:size-48 rounded-lg lg:rounded-2xl shadow-md relative overflow-hidden z-10 group/picture">
            <Image priority src={default_user} alt="Perfil de usuario STANNUM Game" className="size-full object-cover absolute top-0 left-0"/>
            <div className="content-visibility-hidden lg:content-visibility-visible">
                <button type="button" className="size-8 rounded-md lg:flex justify-center items-center bg-card-light hover:bg-card-lighter group/container opacity-0 group-hover/picture:opacity-100 absolute top-4 right-4 z-20 transition-200">
                    <span className="sr-only">Editar portada</span>
                    <MdModeEdit className="size-5 text-neutral-400 group-hover/container:text-white transition-200"/>
                </button>
            </div>
        </div>
    )
}
