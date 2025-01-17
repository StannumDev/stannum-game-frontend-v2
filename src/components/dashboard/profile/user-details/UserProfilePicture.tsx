'use client'

import { useState } from "react";
import Image from "next/image";
import { FullUserDetails } from "@/interfaces";
import { UserProfileEditPicture } from "@/components";
import mateo from "@/assets/user/usuario_mateo.webp";

interface Props{
    user: FullUserDetails,
    fetchUserData: () => Promise<void>
}

export const UserProfilePicture = ({user, fetchUserData}:Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <div className="size-24 lg:size-48 bg-gradient-to-br from-card to-card-light rounded-lg lg:rounded-2xl shadow-md relative overflow-hidden z-50 group/picture outline outline-2 outline-stannum">
            <div onClick={() => setShowModal(true)} className="lg:hidden size-full opacity-0 absolute top-0 left-0 z-20"></div>
            <Image
                priority
                width={192}
                height={192}
                src={user.profilePhoto || mateo}
                alt="Perfil de usuario STANNUM Game"
                className="size-full object-cover absolute top-0 left-0 z-10"
                onError={(e) => (e.currentTarget.src = mateo.src)}
            />
            <UserProfileEditPicture showModal={showModal} setShowModal={setShowModal} fetchUserData={fetchUserData}/>
        </div>
    )
}
