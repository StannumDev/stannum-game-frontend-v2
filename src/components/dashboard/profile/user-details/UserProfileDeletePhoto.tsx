'use client'

import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { deleteProfilePhoto } from "@/services";
import { errorHandler } from "@/helpers";
import { AppError } from "@/interfaces";
import { SpinnerIcon, TrashIcon } from "@/icons";
import { Modal } from "@/components";

interface Props{
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>,
    fetchUserData: (force?: boolean) => Promise<void>
}

export const UserProfileDeletePhoto = ({showModal, setShowModal, fetchUserData}:Props) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await deleteProfilePhoto();
            await fetchUserData(true);
            setShowModal(false);
        } catch (error:unknown) {
            const appError:AppError = errorHandler(error);
            console.error(appError);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Fragment>
            <div className="content-visibility-hidden lg:content-visibility-visible">
                <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="size-8 rounded-xl lg:flex justify-center items-center bg-card-light hover:bg-card-lighter group/container opacity-0 group-hover/photo:opacity-100 absolute top-2 right-11 z-20 transition-200"
                >
                    <span className="sr-only">Eliminar foto de perfil</span>
                    <TrashIcon className="size-4 text-invalid/75 group-hover/container:text-invalid transition-200"/>
                </button>
            </div>
            <Modal
                className="max-w-md h-auto"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <div className="w-full flex flex-col justify-center items-center text-center">
                    <h2 className="title-3 text-3xl text-pretty">¿Estas seguro que deseas eliminar tu foto de perfil?</h2>
                    <p className="mt-4 subtitle-1">No podras deshacer esta acción. Sin embargo, eres libre de agregar una foto nueva de perfil en cualquier momento.</p>
                    <div className="mt-6 w-full flex justify-center items-center gap-4">
                        <button
                            disabled={isLoading}
                            onClick={() => setShowModal(false)}
                            type="submit"
                            className="w-full h-10 text-sm font-semibold bg-card-light hover:bg-card-lighter disabled:bg-card-lighter rounded tracking-tighter flex justify-center items-center transition-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="w-full h-10 text-sm font-semibold bg-invalid hover:bg-invalid/75 disabled:bg-invalid/75 rounded tracking-tighter flex justify-center items-center transition-200"
                        >
                            {
                                isLoading ?
                                    <SpinnerIcon className="animate-spin size-6"/>
                                :
                                    'Eliminar'
                            }
                        </button>
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}