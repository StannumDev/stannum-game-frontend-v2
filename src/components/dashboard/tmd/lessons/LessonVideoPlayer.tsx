'use client'

import { useEffect, useState } from "react";
import MuxPlayer from '@mux/mux-player-react/lazy';
import { createBlurUp } from '@mux/blurup';
import { markLessonAsCompleted } from "@/services";
import { Lesson } from '@/interfaces';
import '@/components/styles/lessonVideoPlayer.css';

interface Props {
  lesson: Lesson;
}

interface BlurData {
    blurDataURL: string;
    aspectRatio: number;
}

export const LessonVideoPlayer = ({ lesson }: Props) => {

    const { id, longTitle, muxPlaybackId } = lesson;
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [blurData, setBlurData] = useState<BlurData>({ blurDataURL: "", aspectRatio: 16 / 9 });

    useEffect(() => {
        const fetchBlurData = async () => {
          try {
            const { blurDataURL, aspectRatio } = await createBlurUp(muxPlaybackId);
            setBlurData({ blurDataURL, aspectRatio });
          } catch (error) {
            setBlurData({ blurDataURL: "", aspectRatio: 16 / 9 });
          }
        };
        fetchBlurData();
    }, [muxPlaybackId]);

    const handleVideoEnd = async () => {
        if (!isCompleted) {
            try {
                const success = await markLessonAsCompleted("TMD", id);
                if (success) {
                    setIsCompleted(true);
                    console.log("✅ Lección marcada como completada.");
                }
            } catch (error) {
                console.error("❌ Error al marcar la lección como completada:", error);
            }
        }
    };

    return (
        <div className='w-full aspect-video relative rounded-lg border border-card overflow-hidden'>
            <MuxPlayer
                className="w-full aspect-video absolute top-0 left-0"
                style={{ aspectRatio: blurData.aspectRatio }}
                playbackId={muxPlaybackId}
                envKey={process.env.NEXT_PUBLIC_MUX_TOKEN_DATA}
                preload="auto"
                autoPlay
                playsInline
                streamType="on-demand"
                placeholder={blurData.blurDataURL}
                thumbnailTime={5}
                forwardSeekOffset={5}
                backwardSeekOffset={5}
                defaultShowRemainingTime
                defaultHiddenCaptions={true}
                primaryColor="rgba(255,255,255,1)"
                accentColor="#41cfc9"
                loading='viewport'
                metadataVideoId={id}
                metadataVideoTitle={longTitle}
                metadataViewerUserId="mateolohezic"
                title={longTitle}
                onEnded={handleVideoEnd}
            />
        </div>
    );
};