'use client'

import { useState } from "react";
import Image from "next/image";
import { UserProfileEditPicture } from "@/components";
import mateo from "@/assets/user/usuario_mateo.webp";

export const UserProfilePicture = () => {

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <div className="size-24 lg:size-48 bg-gradient-to-br from-card to-card-light rounded-lg lg:rounded-2xl shadow-md relative overflow-hidden z-50 group/picture outline outline-2 outline-stannum">
            <div onClick={() => setShowModal(true)} className="lg:hidden size-full opacity-0 absolute top-0 left-0 z-20"></div>
            <Image
                priority
                src={mateo}
                alt="Perfil de usuario STANNUM Game"
                className="size-full object-cover absolute top-0 left-0 z-10"
            />
            <UserProfileEditPicture showModal={showModal} setShowModal={setShowModal}/>
        </div>
    )
}
