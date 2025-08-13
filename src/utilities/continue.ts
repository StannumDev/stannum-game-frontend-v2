import type { FullUserDetails, Program, Lesson, ContinueEntry } from "@/interfaces";

const PROGRESS_HIDE_THRESHOLD = 0.95;
const NEAR_END_SECONDS = 10;

const flattenLessons = (program: Program): Lesson[] => program.sections.flatMap(s => s.modules.flatMap(m => m.lessons));

const isLessonCompleted = (user: FullUserDetails, programId: string, lessonId: string) => !!user.programs?.[programId as keyof FullUserDetails["programs"]]?.lessonsCompleted?.some(l => l.lessonId === lessonId);

const nextUncompletedLesson = (program: Program, user: FullUserDetails): Lesson | null => {
    const all = flattenLessons(program);
    const next = all.find(l => !isLessonCompleted(user, program.id, l.id));
    return next || null;
};

const pctFrom = (current: number, total: number) => {
    if (!(Number.isFinite(current) && Number.isFinite(total) && total > 0)) return 0;
    return Math.round((current / total) * 100);
};

export const buildContinueEntryForProgram = (program: Program, user: FullUserDetails): ContinueEntry | null => {
    const programId = program.id as "tia" | "tmd";
    const state = user.programs?.[programId];

    if (!state?.isPurchased) return null;

    const last = state.lastWatchedLesson;
    const lessons = flattenLessons(program);

    if (!last?.lessonId) {
        const next = nextUncompletedLesson(program, user);
        if (!next) return null;
        return {
            programId: programId,
            programName: program.name,
            programLogo: program.logo,
            lessonTitle: next.title,
            href: `/dashboard/library/${programId}/lessons/${next.id}`,
            progressPct: 0,
        };
    }

    const currentLesson = lessons.find(l => l.id === last.lessonId);
    const currentTime = Math.max(0, last.currentTime ?? 0);
    const duration = Number.isFinite(currentLesson?.duration) ? (currentLesson!.duration) : 0;

    const progress = pctFrom(currentTime, duration);
    const remaining = duration > 0 ? Math.max(0, duration - currentTime) : Infinity;
    const isCompletedNow = isLessonCompleted(user, programId, last.lessonId);

    if (isCompletedNow || remaining <= NEAR_END_SECONDS || progress / 100 >= PROGRESS_HIDE_THRESHOLD) {
        const next = nextUncompletedLesson(program, user);
        if (!next) return null;
        return {
            programId,
            programName: program.name,
            programLogo: program.logo,
            lessonTitle: next.title,
            href: `/dashboard/library/${programId}/lessons/${next.id}`,
            progressPct: 0,
        };
    }

    const progressPct = Math.max(0, Math.min(99, progress));
    return {
        programId,
        programName: program.name,
        programLogo: program.logo,
        lessonTitle: currentLesson?.title ?? "",
        href: `/dashboard/library/${programId}/lessons/${currentLesson?.id}?t=${currentTime}`,
        progressPct,
    };
}