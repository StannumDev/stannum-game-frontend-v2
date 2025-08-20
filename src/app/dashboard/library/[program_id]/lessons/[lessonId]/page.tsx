import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserByToken } from "@/services";
import { LessonVideoPlayer, LessonMiniatureCard, GoBackButton } from "@/components";
import { Lesson, Module, Program } from "@/interfaces";
import { programs } from "@/config/programs";

interface Props {
    params: {
        program_id: string;
        lessonId: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { program_id, lessonId } = params;

    const program: Program | undefined = programs.find(p => p.id === program_id.toLowerCase());
    const modules: Module[] = program?.sections.flatMap(section => section.modules) ?? [];

    const program_module: Module | undefined = modules.find(m => m.lessons.some(l => l.id === lessonId));
    const lesson: Lesson | undefined = program_module?.lessons.find(l => l.id === lessonId);

    if (!lesson || !program_module || !program) {
        return {
            title: "Lección no encontrada",
            description: "La lección solicitada no existe en el programa.",
        };
    }

    const longTitle = `${lesson.title} - ${program_module.name} | ${program.name}`;

    return {
        title: longTitle,
        description: lesson.title,
        openGraph: {
            title: longTitle,
            description: lesson.title,
            url: `https://stanumgame.com/dashboard/library/${program_id}/lessons/${lesson.id}`,
            siteName: 'STANNUM',
            locale: 'es_AR',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: `https://stanumgame.com/dashboard/library/${program_id}`,
            creator: 'STANNUM',
            title: longTitle,
            description: lesson.title,
        },
    };
}

export default async function LessonPage({ params }: Props) {
    const { program_id, lessonId } = params;
    
    const user = await getUserByToken();
    if (!user) redirect("/login");

    const program: Program | undefined = programs.find(p => p.id === program_id.toLowerCase());
    const modules: Module[] = program?.sections.flatMap(section => section.modules) ?? [];

    const program_module: Module | undefined = modules.find(m => m.lessons.some(l => l.id === lessonId));
    const lesson: Lesson | undefined = program_module?.lessons.find(l => l.id === lessonId);
    
    if (!lesson || !program_module) {
        return <div className="text-center text-red-500">Lección no encontrada</div>;
    }

    const isCompleted = user.programs?.[program_id as keyof typeof user.programs]?.lessonsCompleted.some((ul) => ul.lessonId === lesson.id);

    return (
        <main className="main-container flex flex-col items-start">
            <h1 className="sr-only">{lesson.longTitle}</h1>
            <GoBackButton className='text-card-lightest hover:text-white lg:hover:bg-card' />
            <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="col-span-1 lg:col-span-3">
                    <LessonVideoPlayer
                        program={program_id}
                        lesson={lesson}
                        moduleLessons={program_module.lessons}
                        isCompleted={isCompleted}
                        userId={user.username}
                    />
                </div>
                <div className="hidden lg:block content-visibility-hidden lg:content-visibility-visible col-span-1 w-[calc(100%+5px)] max-h-none relative overflow-y-auto">
                    <div className="size-full pr-2 flex flex-col gap-2 absolute top-0 left-0">
                        {program_module.lessons.map((miniLesson, index) => {
                            const lessonCompleted = user.programs?.[program_id as keyof typeof user.programs]?.lessonsCompleted.some((ul) => ul.lessonId === miniLesson.id);
                            return (
                                <LessonMiniatureCard
                                    key={miniLesson.id}
                                    lesson={miniLesson}
                                    index={index + 1}
                                    programId={program_id}
                                    isCurrent={miniLesson.id === lessonId}
                                    isCompleted={lessonCompleted}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="mt-6 w-full flex flex-col">
                <p className="subtitle-1">Pretemporada | Módulo 01</p>
                <div className="w-full flex justify-between gap-4">
                    <div className="flex flex-col">
                        <h1 className="title-2">{lesson.title}</h1>
                    </div>
                </div>
                <span className="my-4 lg:mb-6 block w-full h-px bg-card-light"></span>
                <div className="w-[calc(100%+13px)] max-w-3xl max-h-64 lg:max-h-none pr-4 lg:pr-0 text-sm overflow-y-auto">
                    <div className="size-full pr-4 absolute lg:static top-0 left-0 whitespace-pre-line">
                        { lesson.description }
                    </div>
                </div>
            </div>
            <div className="lg:hidden lg:content-visibility-hidden col-span-1 w-full max-h-96 relative overflow-y-auto">
                <div className="size-full flex flex-col gap-2">
                    {program_module.lessons.map((miniLesson, index) => {
                        const lessonCompleted = user.programs?.[program_id as keyof typeof user.programs]?.lessonsCompleted.some((ul) => ul.lessonId === miniLesson.id);
                        return (
                            <LessonMiniatureCard
                                key={miniLesson.id}
                                lesson={miniLesson}
                                index={index + 1}
                                programId={program_id}
                                isCurrent={miniLesson.id === lessonId}
                                isCompleted={lessonCompleted}
                            />
                        )
                    })}
                </div>
            </div>
        </main>
    );
}