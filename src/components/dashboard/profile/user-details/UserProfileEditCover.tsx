'use client'

import { Dispatch, Fragment, SetStateAction, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from 'framer-motion';
import { LiaSpinnerSolid } from "react-icons/lia";
import { MdModeEdit } from "react-icons/md";
import { Modal } from "@/components/ui/Modal";
import profile_background_1 from '@/assets/profile/achievement_background_1.webp';
import profile_background_2 from '@/assets/profile/achievement_background_2.webp';
import profile_background_3 from '@/assets/profile/achievement_background_3.webp';

const backgrounds:Array<{img:StaticImageData}> = [
    {
        img: profile_background_1
    },
    {
        img: profile_background_2
    },
    {
        img: profile_background_3
    }
]

interface Props{
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const UserProfileEditCover = ({showModal, setShowModal}:Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedBackground, setSelectedBackground] = useState<StaticImageData>(profile_background_1);

    const changeBackground = () => {
        setIsLoading(true);
        setInterval(() => {
            setIsLoading(false);
        }, 1000);
    }

    return (
        <Fragment>
            <div className="content-visibility-hidden lg:content-visibility-visible">
                <button
                    onClick={() => setShowModal(true)}
                    type="button"
                    className="size-8 rounded-lg lg:flex justify-center items-center bg-card-light hover:bg-card-lighter group/container opacity-0 group-hover/main:opacity-100 absolute top-2 right-2 z-20 transition-200"
                >
                    <span className="sr-only">Editar portada</span>
                    <MdModeEdit className="size-5 text-neutral-400 group-hover/container:text-white transition-200"/>
                </button>
            </div>
            <Modal
                className="max-w-7xl flex-col"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <div className="w-full">
                    <div className="w-full card rounded-b-none p-0 overflow-hidden relative">
                        <div className="size-full bg-gradient-to-b from-transparent to-black absolute top-0 left-0 z-10"></div>
                        <Image priority src={selectedBackground} alt="Profile background STANNUM Game" className="w-full aspect-video lg:aspect-auto lg:h-80 object-cover relative z-0 object-[50%_65%]"/>
                    </div>
                    <div className="-mt-16 lg:-mt-44 w-full flex justify-center relative z-10">
                        <div className="size-24 lg:size-48 bg-gradient-to-br from-card to-card-light rounded-lg lg:rounded-2xl shadow-md"></div>
                    </div>
                </div>
                <div className="mt-4 lg:mt-6 w-full grow bg-card rounded-b-lg relative overflow-y-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 p-2 lg:p-4 gap-2 lg:gap-4 absolute top-0 left-0">
                        {
                            backgrounds.map(({img}, i) => (
                                <div
                                    key={i}
                                    className="card p-0 aspect-video overflow-hidden group relative cursor-pointer"
                                    onClick={ () => setSelectedBackground(img) }
                                >
                                    <div className='size-full bg-gradient-to-br from-transparent to-black absolute top-0 left-0 opacity-50 lg:opacity-25 lg:group-hover:opacity-50 transition-200'></div>
                                    <Image src={img} alt="Seleccionar fondo" className=""/>
                                </div>
                            ))
                        }
                        {
                            backgrounds.map(({img}, i) => (
                                <div
                                    key={i}
                                    className="card p-0 aspect-video overflow-hidden group relative cursor-pointer"
                                    onClick={ () => setSelectedBackground(img) }
                                >
                                    <div className='size-full bg-gradient-to-br from-transparent to-black absolute top-0 left-0 opacity-50 lg:opacity-25 lg:group-hover:opacity-50 transition-200'></div>
                                    <Image src={img} alt="Seleccionar fondo" className=""/>
                                </div>
                            ))
                        }
                        {
                            backgrounds.map(({img}, i) => (
                                <div
                                    key={i}
                                    className="card p-0 aspect-video overflow-hidden group relative cursor-pointer"
                                    onClick={ () => setSelectedBackground(img) }
                                >
                                    <div className='size-full bg-gradient-to-br from-transparent to-black absolute top-0 left-0 opacity-50 lg:opacity-25 lg:group-hover:opacity-50 transition-200'></div>
                                    <Image src={img} alt="Seleccionar fondo" className=""/>
                                </div>
                            ))
                        }
                        {
                            backgrounds.map(({img}, i) => (
                                <div
                                    key={i}
                                    className="card p-0 aspect-video overflow-hidden group relative cursor-pointer"
                                    onClick={ () => setSelectedBackground(img) }
                                >
                                    <div className='size-full bg-gradient-to-br from-transparent to-black absolute top-0 left-0 opacity-50 lg:opacity-25 lg:group-hover:opacity-50 transition-200'></div>
                                    <Image src={img} alt="Seleccionar fondo" className=""/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="mt-6 w-full flex justify-end items-center">
                    <motion.button
                        whileTap={{scale: !isLoading ? 1.05 : 1 }}
                        whileHover={{ backgroundColor: '#66eae5'}}
                        disabled={isLoading}
                        onClick={changeBackground}
                        type="button"
                        className='w-full lg:w-32 h-9 text-sm font-semibold bg-stannum disabled:bg-stannum-hover rounded tracking-tighter text-white flex justify-center items-center'
                    >
                        {
                            isLoading ?
                                <LiaSpinnerSolid className="animate-spin size-6"/>
                            :
                            'Confirmar'
                        }
                    </motion.button>
                </div>
            </Modal>
        </Fragment>
    )
}
