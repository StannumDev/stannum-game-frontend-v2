import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import profile_background from '@/assets/profile/achievement_background_3.webp';

export const UserProfileCover = () => {
    return (
        <div className="w-full card rounded-b-none border-b-0 p-0 overflow-hidden relative group/main">
            <div className="size-full bg-gradient-to-b from-transparent to-black absolute top-0 left-0 z-10"></div>
            <Image src={profile_background} alt="Profile background STANNUM Game" className="w-full h-80 object-cover relative z-0 object-[50%_65%]"/>
            <button type="button" className="size-8 rounded-md flex justify-center items-center bg-card-light hover:bg-card-lighter group/container opacity-0 group-hover/main:opacity-100 absolute top-6 right-6 z-20 transition-all duration-200 ease-in-out">
                <span className="sr-only">Editar portada</span>
                <MdModeEdit className="size-5 text-neutral-400 group-hover/container:text-white transition-all duration-200 ease-in-out"/>
            </button>
        </div>
    )
}
