import MuxPlayer from '@mux/mux-player-react/lazy';
import { createBlurUp } from '@mux/blurup';
import '@/components/styles/lessonVideoPlayer.css';

interface Props {
  playbackId: string;
}

export const LessonVideoPlayer = async ({ playbackId }: Props) => {
    
    const { blurDataURL, aspectRatio } = await createBlurUp(playbackId);

    return (
        <div className='w-full aspect-video relative rounded-lg border border-card overflow-hidden'>
            <MuxPlayer
                className="w-full aspect-video absolute top-0 left-0"
                style={{ aspectRatio }}
                playbackId={playbackId}
                envKey={process.env.NEXT_PUBLIC_MUX_TOKEN_DATA}
                preload="auto"
                autoPlay
                playsInline
                streamType="on-demand"
                placeholder={blurDataURL}
                thumbnailTime={5}
                forwardSeekOffset={5}
                backwardSeekOffset={5}
                defaultShowRemainingTime
                defaultHiddenCaptions={true}
                primaryColor="rgba(255,255,255,1)"
                accentColor="#41cfc9"
                loading='viewport'
                metadataVideoId="videoE01M01"
                metadata={{
                    episode: '1',
                    module: '1',
                    title: 'Lesson 1',
                }}
                metadataVideoTitle="E01M01"
                metadataViewerUserId="Organización digital"
                title="Organización digital"
            />
        </div>
    );
};