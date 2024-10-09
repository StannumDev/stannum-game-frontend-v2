'use client'

import { useState } from "react";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import { Modal } from "@/components/ui/Modal";
import profile_background from '@/assets/profile/achievement_background_3.webp';

export const UserProfileCover = () => {

    const [showModal, setShowModal] = useState<boolean>(false)

    return (
        <div className="w-full card rounded-b-none border-b-0 p-0 overflow-hidden relative group/main">
            <div className="size-full bg-gradient-to-b from-transparent to-black absolute top-0 left-0 z-10"></div>
            <Image src={profile_background} alt="Profile background STANNUM Game" className="w-full aspect-video lg:aspect-auto lg:h-80 object-cover relative z-0 object-[50%_65%]"/>
            <button
                onClick={() => setShowModal(true)}
                type="button"
                className="size-8 rounded-md hidden lg:flex justify-center items-center bg-card-light hover:bg-card-lighter group/container opacity-0 group-hover/main:opacity-100 absolute top-6 right-6 z-20 transition-200"
            >
                <span className="sr-only">Editar portada</span>
                <MdModeEdit className="size-5 text-neutral-400 group-hover/container:text-white transition-200"/>
            </button>
            <Modal
                className="max-w-5xl"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                asdasdas
            </Modal>
        </div>
    )
}
