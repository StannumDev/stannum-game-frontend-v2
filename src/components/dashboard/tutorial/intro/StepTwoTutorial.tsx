import { motion } from 'framer-motion';
import MuxPlayer from '@mux/mux-player-react';

interface Props{
    direction: 'prev'|'next'
}

export const StepTwoTutorial = ({direction}:Props) => {

    const variants = {
        enter: { x: direction === "next" ? "50%" : "-50%", opacity: 0 },
        center: { x: 0, opacity: 1, transition: { duration: 0.1 } },
        exit: { x: direction === "next" ? "-50%" : "50%", opacity: 0, transition: { duration: 0.1 } }
    };

    return (
        <motion.main
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            className="w-full aspect-video lg:aspect-auto lg:grow my-12 lg:my-8 relative lg:overflow-y-auto"
        >
            <div className='w-full lg:w-auto lg:h-full aspect-video absolute top-0 right-0 mx-auto left-0 flex flex-col justify-center items-center'>
                <div className='w-full lg:w-auto lg:h-full aspect-video relative rounded-lg border border-card overflow-hidden'>
                    <MuxPlayer
                        className="size-full absolute top-0 left-0"
                        playbackId={process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID}
                        envKey={process.env.NEXT_PUBLIC_MUX_TOKEN_DATA}
                        preload="auto"
                        playsInline
                        streamType="on-demand"
                        forwardSeekOffset={5}
                        backwardSeekOffset={5}
                        defaultShowRemainingTime
                        defaultHiddenCaptions={true}
                        primaryColor="rgba(255,255,255,1)"
                        accentColor="#41cfc9"
                        metadataVideoId="introduccion01"
                        metadata={{
                            username: 'mateolohezic',
                            title: 'Introducción a STANNUM Game',
                        }}
                        metadataVideoTitle="introduccion01"
                        metadataViewerUserId="Introducción a STANNUM Game"
                        title="Introducción a STANNUM Game"
                    />
                </div>
            </div>
        </motion.main>
    )
}
