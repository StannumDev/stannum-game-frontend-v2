'use client'

import { useRef, useState } from "react";
import { SoundOnIcon, SoundOffIcon, PlayIcon, PauseIcon } from "@/icons";
import Image from "next/image";
import background from '@/assets/background/the_game.webp';
import { AnimatePresence, motion } from 'framer-motion';

export const VideoIntro = () => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const [start, setStart] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isEnded, setIsEnded] = useState(false);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const startPlaying = () => {
        setStart(true);
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className={`size-full absolute top-0 left-0 z-[99999999] ${ isEnded && "pointer-events-none" }`}>
            { !isEnded && <div className="size-full bg-black absolute top-0 left-0"></div>}
            <AnimatePresence mode="wait">
                { !start ?
                    <motion.div
                        key="video-intro"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                        className="size-full p-4 flex flex-col justify-center items-center relative"
                    >
                        <Image priority src={background} alt="Introducción STANNUM Game" className="size-full object-cover absolute top-0 left-0 z-0"/>
                        <div className="size-full bg-black/50 flex flex-col justify-center items-center gap-8 absolute top-0 left-0 z-10">
                            <h2 className="title-2 text-4xl lg:text-5xl text-center">Que comience <br />el juego</h2>
                            <button
                                type="button"
                                onClick={startPlaying}
                                className="px-4 py-2 bg-stannum hover:bg-stannum-light text-xl font-semibold text-card rounded tracking-tighter flex justify-center items-center transition-200"
                            >
                                Comenzar
                            </button>
                        </div>
                    </motion.div>
                : !isEnded ?
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key="video-intro-playing"
                        className="size-full absolute top-0 left-0 z-[99999999]"
                    >
                        <div className="size-full relative">
                            <div className="flex justify-center items-center gap-4 absolute bottom-4 lg:bottom-12 right-4 lg:right-12 z-50">
                                <button
                                    type="button"
                                    onClick={togglePlayPause}
                                    className="text-white opacity-75 hover:opacity-100 lg:text-2xl cursor-pointer transition-150"
                                >
                                    { isPlaying ? <PauseIcon/> : <PlayIcon/> }
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleMute}
                                    className="text-white opacity-75 hover:opacity-100 lg:text-2xl pointer-events-auto cursor-pointer transition-150"
                                    >
                                    {
                                        isMuted ? <SoundOffIcon/> : <SoundOnIcon/>
                                    }
                                </button>
                            </div>
                            <div className="absolute top-4 lg:top-12 right-4 lg:right-12 z-50 pointer-events-auto">
                                <button
                                    type="button"
                                    onClick={() => setIsEnded(true)}
                                    className="px-4 saltar_video_intro text-white lg:text-2xl rounded-lg bg-transparent hover:bg-white/10 border border-white/25 flex items-center gap-2 opacity-75 hover:opacity-100 pointer-events-auto cursor-pointer transition-150"
                                >
                                    Saltar
                                </button>
                            </div>
                            <div className="size-full bg-black absolute top-0 left-0 z-0"></div>
                            <video
                                ref={videoRef}
                                controls={false}
                                playsInline
                                autoPlay
                                onEnded={() => setIsEnded(true)}
                                className="size-full object-contain lg:object-cover pointer-events-none select-none relative z-10"
                            >
                                <source src="/assets/videos/welcome_stannum_game.mp4" type="video/mp4" />
                                Tu navegador no soporta este video.
                            </video>
                        </div>
                    </motion.div>
                : null
                }
            </AnimatePresence>
        </div>
    )
}
