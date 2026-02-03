'use client'

import { ChangeEvent, useCallback, useState } from "react";
import Image from "next/image";
import { AddPhotoIcon } from "@/icons";
import { FullUserDetails } from "@/interfaces";
import { UserProfileEditPhoto } from "@/components";
import default_user from "@/assets/user/default_user.webp";

interface Props{
    owner: boolean;
    user: FullUserDetails;
}

export const UserProfilePhoto = ({user, owner}:Props) => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [profilePhotoError, setProfilePhotoError] = useState(false);
    const [photoVersion, setPhotoVersion] = useState<number>(0);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;
        const fileSizeInMB = selectedFile.size / (1024 * 1024);
        if (fileSizeInMB > 20) return;
        setImageSrc(URL.createObjectURL(selectedFile));
        setShowEditModal(true);
        event.target.value = '';
    };

    const handleModalClose = useCallback(() => {
        if (imageSrc) {
            URL.revokeObjectURL(imageSrc);
            setImageSrc(null);
        }
    }, [imageSrc]);

    return (
        <div className={`size-24 lg:size-48 bg-gradient-to-br from-card to-card-light rounded-lg lg:rounded-2xl shadow-md relative z-50 outline outline-2 outline-stannum ${owner ? 'rounded-tr-none lg:rounded-tr-none' : ''}`}>
            <Image
                priority
                width={500}
                height={500}
                src={ profilePhotoError || !user.profilePhoto ? default_user : `${user.profilePhoto}?v=${photoVersion}`}
                alt="Perfil de usuario STANNUM Game"
                className="size-full object-cover absolute top-0 left-0 z-10 rounded-lg lg:rounded-2xl"
                onError={() => setProfilePhotoError(true)}
            />
            { owner &&
                <>
                    <label className="size-6 lg:size-6 rounded-full bg-stannum flex justify-center items-center hover:bg-stannum-light hover:scale-110 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-30 transition-200">
                        <AddPhotoIcon className="size-3 lg:size-4 text-card relative -top-px"/>
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .webp, .avif, .tiff"
                            className="size-full absolute top-0 left-0 opacity-0"
                            onChange={handleFileChange}
                        />
                        <span className="sr-only">Cambiar foto de perfil</span>
                    </label>
                    <UserProfileEditPhoto
                        showModal={showEditModal}
                        setShowModal={setShowEditModal}
                        imageSrc={imageSrc}
                        onClose={handleModalClose}
                        onPhotoUploaded={() => setPhotoVersion(prev => prev + 1)}
                    />
                </>
            }
        </div>
    )
}
