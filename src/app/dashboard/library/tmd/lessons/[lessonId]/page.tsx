import { Metadata } from "next";
import { TMD_PROGRAM } from "@/config/programs";
import { LessonVideoPlayer, LessonMiniatureCard, LessonDetails } from "@/components";
import { Lesson, Module } from "@/interfaces";

interface Props {
    params: {
        lessonId: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lessonId } = params;
    const module: Module | undefined = TMD_PROGRAM.modules.find(mod => mod.lessons.some(l => l.id === lessonId));
    const lesson: Lesson | undefined = module?.lessons.find(l => l.id === lessonId);
    
    if (!lesson || !module) {
        return {
            title: "Lección no encontrada",
            description: "La lección solicitada no existe en el programa.",
        };
    }

    const longTitle = `${lesson.title} - ${module.name} | ${TMD_PROGRAM.name}`;
    
    return {
        title: longTitle,
        description: lesson.title,
        openGraph: {
            title: longTitle,
            description: lesson.title,
            url: `https://stanumgame.com/dashboard/library/tmd/lessons/${lesson.id}`,
            siteName: 'STANNUM',
            locale: 'es_AR',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://stanumgame.com/dashboard/library/tmd',
            creator: 'STANNUM',
            title: longTitle,
            description: lesson.title,
        },
    };
}

export default function TMDLessonsPage({ params }: Props) {

    const { lessonId } = params;

    const module: Module | undefined = TMD_PROGRAM.modules.find(mod => mod.lessons.some(l => l.id === lessonId));
    const lesson: Lesson | undefined = module?.lessons.find(l => l.id === lessonId);

    if (!lesson || !module) {
        return <div className="text-center text-red-500">Lección no encontrada</div>;
    }

    return (
        <main className="main-container">
            <h1 className="sr-only">{lesson.longTitle}</h1>
            <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="col-span-1 lg:col-span-3">
                    <LessonVideoPlayer lesson={lesson}/>
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
            <LessonDetails lesson={lesson}/>
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