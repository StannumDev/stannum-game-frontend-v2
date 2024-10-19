'use client'

import { useState } from "react";
import Image from "next/image";
import { EditIcon } from "@/icons";
import mateo from "@/assets/user/usuario_mateo.webp";

export const UserProfilePicture = () => {

    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    return (
        <div className="size-24 lg:size-48 bg-gradient-to-br from-card to-card-light rounded-lg lg:rounded-2xl shadow-md relative overflow-hidden z-20 group/picture outline outline-2 outline-stannum">
            { !imageLoaded && <div className='size-full bg-gradient-to-br from-card to-card-light absolute top-0 left-0 animate-pulse z-0'></div> }
            <Image
                priority
                src={mateo}
                alt="Perfil de usuario STANNUM Game"
                className="size-full object-cover absolute top-0 left-0 z-10"
                onLoad={() => setImageLoaded(true)}
            />
            <div className="content-visibility-hidden lg:content-visibility-visible">
                <button type="button" className="size-8 rounded-xl lg:flex justify-center items-center bg-card-light hover:bg-card-lighter group/container opacity-0 group-hover/picture:opacity-100 absolute top-2 right-2 z-20 transition-200">
                    <span className="sr-only">Editar portada</span>
                    <EditIcon className="size-5 text-neutral-400 group-hover/container:text-white transition-200"/>
                </button>
            </div>
        </div>
    )
}
