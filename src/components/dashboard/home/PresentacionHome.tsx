'use client'

import { useState } from "react";
import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";
import { IoPlaySharp } from "react-icons/io5";
import { MotionWrapperLayout } from "@/components";
import background from "@/assets/wallpaper/the_game.webp";
import { motion, AnimatePresence } from 'framer-motion';

export const PresentacionHome = () => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    return (
        <MotionWrapperLayout>
            <AnimatePresence initial={false}>
                {
                    isPlaying ?
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className='w-full aspect-video relative rounded-lg border border-card overflow-hidden'
                    >
                        <MuxPlayer
                            className="w-full aspect-video absolute top-0 left-0"
                            playbackId={process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID}
                            envKey={process.env.NEXT_PUBLIC_MUX_TOKEN_DATA}
                            preload="auto"
                            autoPlay
                            playsInline
                            streamType="on-demand"
                            thumbnailTime={1}
                            forwardSeekOffset={5}
                            backwardSeekOffset={5}
                            defaultShowRemainingTime
                            defaultHiddenCaptions={true}
                            primaryColor="rgba(255,255,255,1)"
                            accentColor="#41cfc9"
                            metadataVideoId="introduccion"
                            metadata={{
                                episode: '1',
                                module: '1',
                                title: 'Lesson 1',
                            }}
                            metadataVideoTitle="introduccion"
                            metadataViewerUserId="Introducción a STANNUM Game"
                            title="Introducción a STANNUM Game"
                            onEnded={ () => setIsPlaying(false)}
                        />
                    </motion.div>
                    :
                    <motion.section
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="w-full card aspect-video flex justify-center items-start lg:items-center relative overflow-hidden group "
                    >
                        <div className="size-full bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 z-10"></div>
                        <button
                            onClick={() => setIsPlaying(true)}
                            type="button"
                            className="size-14 lg:size-32 rounded-full bg-stannum flex justify-center items-center absolute lg:relative bottom-6 lg:bottom-0 right-6 lg:right-0 z-20 hover:scale-105 transition-200"
                        >
                            <IoPlaySharp className="size-8 lg:size-16 relative left-1 lg:left-2"/>
                        </button>
                        <Image src={background} priority alt="Presentación STANNUM Game" className="size-full object-cover blur-[1px] absolute top-0 left-0 z-0"/>
                        <div className="w-full static lg:absolute lg:bottom-8 lg:left-6 z-20">
                            <p className="text-2xl lg:text-4xl leading-tight">Bienvenido a <b className="block font-semibold">STANNUM Game</b></p>
                            <p className="hidden lg:block mt-2 w-full max-w-xl text-base">Adentrate con nuestros <b className="text-stannum">videos introductorios</b> para comprender el funcionamiento de la plataforma y empezar a entrenar!</p>
                        </div>
                    </motion.section>
                }
            </AnimatePresence>
        </MotionWrapperLayout>
    )
}
