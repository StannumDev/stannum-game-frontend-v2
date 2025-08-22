import { motion } from 'framer-motion';
import MuxPlayer from '@mux/mux-player-react';
import { FullUserDetails } from '@/interfaces';

const muxPlaybackIds: Record<string, string> = JSON.parse(process.env.NEXT_PUBLIC_MUX_IDS || "{}");
const playbackId = muxPlaybackIds["WELCOME"] || "";

interface Props{
    direction: 'prev'|'next';
    user: FullUserDetails;
}

export const StepTwoTutorial = ({direction, user}:Props) => {

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
                        playbackId={playbackId}
                        envKey={process.env.NEXT_PUBLIC_MUX_TOKEN_DATA}
                        preload="auto"
                        autoPlay
                        playsInline
                        streamType="on-demand"
                        thumbnailTime={5}
                        forwardSeekOffset={5}
                        backwardSeekOffset={5}
                        defaultShowRemainingTime
                        defaultHiddenCaptions
                        primaryColor="rgba(255,255,255,1)"
                        accentColor="#00FFCC"
                        metadataVideoId="WELCOME"
                        metadataVideoTitle={"Bienvenido a STANNUM Game"}
                        metadataViewerUserId={user.username}
                        metadata={{
                            username: user.username,
                            title: 'Bienvenido a STANNUM Game',
                        }}
                        title="Bienvenido a STANNUM Game"
                    />
                </div>
            </div>
        </motion.main>
    )
}
