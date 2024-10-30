import MuxPlayer from '@mux/mux-player-react/lazy';
import { createBlurUp } from '@mux/blurup';
import '@/components/styles/lessonVideoPlayer.css';

interface Props {
  playbackId: string;
}

interface BlurData {
    blurDataURL: string;
    aspectRatio: number;
}

export const LessonVideoPlayer = async ({ playbackId }: Props) => {
    
    const getBlur = async ():Promise<BlurData> => {
        try {
            const { blurDataURL, aspectRatio } = await createBlurUp(playbackId);
            return { blurDataURL, aspectRatio }
        } catch (error) {
            return { blurDataURL: '', aspectRatio: 16/9 }
        }
    }

    const { blurDataURL, aspectRatio}:BlurData = await getBlur();

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
                    product: 'TMD',
                    episode: '1',
                    module: '1',
                }}
                metadataVideoTitle="Organización digital - Módulo 01 - TRENNO Mark Digital"
                metadataViewerUserId="mateolohezic"
                title="Organización digital - Módulo 01 - TRENNO Mark Digital"
            />
        </div>
    );
};