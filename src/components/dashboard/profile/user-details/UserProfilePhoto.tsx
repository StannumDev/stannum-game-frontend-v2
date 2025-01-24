'use client'

import { useState } from "react";
import Image from "next/image";
import { FullUserDetails } from "@/interfaces";
import { UserProfileDeletePhoto, UserProfileEditPhoto } from "@/components";
import mateo from "@/assets/user/usuario_mateo.webp";

interface Props{
    user: FullUserDetails,
    fetchUserData: () => Promise<void>
}

export const UserProfilePhoto = ({user, fetchUserData}:Props) => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [profilePhotoError, setProfilePhotoError] = useState(false);
    // console.log(user?.preferences?.hasProfilePhoto)

    return (
        <div className="size-24 lg:size-48 bg-gradient-to-br from-card to-card-light rounded-lg lg:rounded-2xl shadow-md relative overflow-hidden z-50 group/photo outline outline-2 outline-stannum">
            <div onClick={() => setShowEditModal(true)} className="lg:hidden size-full opacity-0 absolute top-0 left-0 z-20"></div>
            <Image
                priority
                width={192}
                height={192}
                src={ profilePhotoError || !user?.profilePhoto ? mateo : user?.profilePhoto}
                alt="Perfil de usuario STANNUM Game"
                className="size-full object-cover absolute top-0 left-0 z-10"
                onError={() => setProfilePhotoError(true)}
            />
            <UserProfileDeletePhoto showModal={showEditModal} setShowModal={setShowEditModal} fetchUserData={fetchUserData}/>
            <UserProfileEditPhoto showModal={showDeleteModal} setShowModal={setShowDeleteModal} fetchUserData={fetchUserData}/>
        </div>
    )
}
