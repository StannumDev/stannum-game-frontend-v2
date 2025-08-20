'use client'

import { Fragment, useState } from "react";
import Image from "next/image";
import { FullUserDetails } from "@/interfaces";
import { UserProfileDeletePhoto, UserProfileEditPhoto } from "@/components";
import default_user from "@/assets/user/default_user.webp";

interface Props{
    owner: boolean;
    user: FullUserDetails;
    fetchUserData: (force?: boolean) => Promise<void>
}

export const UserProfilePhoto = ({user, fetchUserData, owner}:Props) => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [profilePhotoError, setProfilePhotoError] = useState(false);

    return (
        <div className="size-24 lg:size-48 bg-gradient-to-br from-card to-card-light rounded-lg lg:rounded-2xl shadow-md relative overflow-hidden z-50 group/photo outline outline-2 outline-stannum">
            <div onClick={() => owner && setShowEditModal(true)} className="lg:hidden size-full opacity-0 absolute top-0 left-0 z-20"></div>
            <Image
                priority
                width={192}
                height={192}
                src={ profilePhotoError || !user?.profilePhoto ? default_user : user?.profilePhoto}
                alt="Perfil de usuario STANNUM Game"
                className="size-full object-cover absolute top-0 left-0 z-10"
                onError={() => setProfilePhotoError(true)}
            />
            { owner &&
                <Fragment>
                    <UserProfileDeletePhoto showModal={showEditModal} setShowModal={setShowEditModal} fetchUserData={fetchUserData}/>
                    <UserProfileEditPhoto showModal={showDeleteModal} setShowModal={setShowDeleteModal} fetchUserData={fetchUserData}/>
                </Fragment>
            }
        </div>
    )
}
