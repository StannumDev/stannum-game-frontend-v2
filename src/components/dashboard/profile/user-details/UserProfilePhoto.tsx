'use client'

import { ChangeEvent, useCallback, useState } from "react";
import { callToast } from "@/helpers";
import { AddPhotoIcon } from "@/icons";
import { FullUserDetails } from "@/interfaces";
import { InitialsAvatar, UserProfileEditPhoto } from "@/components";

interface Props{
    owner: boolean;
    user: FullUserDetails;
}

export const UserProfilePhoto = ({user, owner}:Props) => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;
        const fileSizeInMB = selectedFile.size / (1024 * 1024);
        if (fileSizeInMB > 20) {
            callToast({ type: 'error', message: { title: 'Archivo muy grande', description: 'La imagen no puede superar los 20 MB.' } });
            return;
        }
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
            <InitialsAvatar
                name={user.profile.name || user.username}
                className="size-full absolute top-0 left-0 z-10 rounded-lg lg:rounded-2xl"
                textClassName="text-2xl lg:text-4xl"
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
                        onPhotoUploaded={() => {}}
                    />
                </>
            }
        </div>
    )
}
