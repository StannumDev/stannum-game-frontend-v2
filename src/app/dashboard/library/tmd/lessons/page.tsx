import { LessonVideoPlayer, LessonMiniatureCard, LessonDetails } from "@/components";

export default function TMDLessonsPage() {
    return (
        <main className="main-container">
            <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="col-span-1 lg:col-span-3">
                    <LessonVideoPlayer playbackId={process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID || ''}/>
                </div>
                <div className="hidden lg:block content-visibility-hidden lg:content-visibility-visible col-span-1 w-[calc(100%+5px)] max-h-none relative overflow-y-auto">
                    <div className="size-full pr-2 flex flex-col gap-2 absolute top-0 left-0">
                        <LessonMiniatureCard/>
                        <LessonMiniatureCard/>
                        <LessonMiniatureCard/>
                        <LessonMiniatureCard/>
                        <LessonMiniatureCard/>
                        <LessonMiniatureCard/>
                        <LessonMiniatureCard/>
                        <LessonMiniatureCard/>
                    </div>
                </div>
            </div>
            <LessonDetails/>
            <div className="lg:hidden lg:content-visibility-hidden col-span-1 w-full max-h-96 relative overflow-y-auto">
                <div className="size-full flex flex-col gap-2">
                    <LessonMiniatureCard/>
                    <LessonMiniatureCard/>
                    <LessonMiniatureCard/>
                    <LessonMiniatureCard/>
                    <LessonMiniatureCard/>
                    <LessonMiniatureCard/>
                    <LessonMiniatureCard/>
                    <LessonMiniatureCard/>
                </div>
            </div>
        </main>
    );
}