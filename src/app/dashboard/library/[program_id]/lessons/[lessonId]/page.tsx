import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonPageContent } from "@/components";
import { Lesson, Module, Program, Section } from "@/interfaces";
import { programs } from "@/config/programs";

interface Props {
    params: Promise<{
        program_id: string;
        lessonId: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { program_id, lessonId } = await params;

    const program: Program | undefined = programs.find(p => p.id === program_id.toLowerCase());
    const modules: Module[] = program?.sections.flatMap(section => section.modules||[]) ?? [];

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
            url: `https://stannumgame.com/dashboard/library/${program_id}/lessons/${lesson.id}`,
            siteName: 'STANNUM',
            locale: 'es_AR',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: `https://stannumgame.com/dashboard/library/${program_id}`,
            creator: 'STANNUM',
            title: longTitle,
            description: lesson.title,
        },
    };
}

export default async function LessonPage({ params }: Props) {
    const { program_id, lessonId } = await params;
    const program = programs.find(p => p.id === program_id.toLowerCase());
    if (!program) return notFound();
    let section: Section | undefined;
    let program_module: Module | undefined;
    for (const sec of program.sections) {
        const foundModule = sec.modules?.find(m => m.lessons.some(l => l.id === lessonId));
        if (foundModule) {
            section = sec;
            program_module = foundModule;
            break;
        }
    }
    if (!section || !program_module) return notFound();
    const lesson = program_module.lessons.find(l => l.id === lessonId);
    if (!lesson) return notFound();

    return (
        <LessonPageContent
            lesson={lesson}
            program_module={program_module}
            section={section}
            program={program}
            programId={program_id}
            lessonId={lessonId}
        />
    );
}
