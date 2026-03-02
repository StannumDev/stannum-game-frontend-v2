import type { FullUserDetails, Program, Lesson, Instruction, ContinueEntry, ProgramId } from "@/interfaces";
import { isLessonAvailable, isInstructionAvailable } from "./lessons";
import { calculateProgramProgress } from "./progress";
import { hasAccess } from "./access";

const PROGRESS_HIDE_THRESHOLD = 0.95;
const NEAR_END_SECONDS = 10;

const flattenLessons = (program: Program): Lesson[] => program.sections.flatMap(s => s.modules?.flatMap(m => m.lessons)||[]);

const isLessonCompleted = (user: FullUserDetails, programId: string, lessonId: string) => !!user.programs?.[programId as keyof FullUserDetails["programs"]]?.lessonsCompleted?.some(l => l.lessonId === lessonId);

type NextActivity =
    | { type: 'lesson'; lesson: Lesson }
    | { type: 'instruction'; instruction: Instruction }
    | null;

const nextUncompletedActivity = (program: Program, user: FullUserDetails): NextActivity => {
    const programId = program.id as ProgramId;
    const userInstructions = user.programs?.[programId]?.instructions || [];

    for (const section of program.sections) {
        for (const mod of section.modules || []) {
            for (const lesson of mod.lessons) {
                if (isLessonCompleted(user, program.id, lesson.id)) {
                    const pendingInstructions = mod.instructions.filter(inst => inst.afterLessonId === lesson.id);
                    for (const inst of pendingInstructions) {
                        if (!isInstructionAvailable(user, programId, inst)) continue;
                        const userInstr = userInstructions.find(ui => ui.instructionId === inst.id);
                        const isDone = userInstr && ["SUBMITTED", "GRADED"].includes(userInstr.status);
                        if (!isDone) return { type: 'instruction', instruction: inst };
                    }
                    continue;
                }

                if (isLessonAvailable(user, programId, mod, lesson.id)) {
                    return { type: 'lesson', lesson };
                }

                for (const inst of mod.instructions) {
                    if (!isInstructionAvailable(user, programId, inst)) continue;
                    const userInstr = userInstructions.find(ui => ui.instructionId === inst.id);
                    const isDone = userInstr && ["SUBMITTED", "GRADED"].includes(userInstr.status);
                    if (!isDone) return { type: 'instruction', instruction: inst };
                }

                return null;
            }
        }
    }
    return null;
};

const pctFrom = (current: number, total: number) => {
    if (!(Number.isFinite(current) && Number.isFinite(total) && total > 0)) return 0;
    return Math.round((current / total) * 100);
};

export const buildContinueEntryForProgram = (program: Program, user: FullUserDetails): ContinueEntry | null => {
    const programId = program.id as ProgramId;
    const state = user.programs?.[programId];

    if (!hasAccess(state)) return null;

    const programProgress = calculateProgramProgress(program, user);
    const last = state.lastWatchedLesson;
    const lessons = flattenLessons(program);

    const userInstructions = state.instructions || [];

    const buildFromActivity = (next: NextActivity): ContinueEntry | null => {
        if (!next) return null;
        if (next.type === 'instruction') {
            const userInstr = userInstructions.find(ui => ui.instructionId === next.instruction.id);
            const label = userInstr?.status === 'IN_PROCESS' ? 'Instrucción en proceso' : 'Instrucción pendiente';
            return {
                programId,
                programName: program.name,
                programLogo: program.logo,
                activityTitle: next.instruction.title,
                href: `/dashboard/library/${programId}/instructions/${next.instruction.id}`,
                progressPct: 0,
                type: 'instruction',
                activityLabel: label,
                programProgress,
            };
        }
        return {
            programId,
            programName: program.name,
            programLogo: program.logo,
            activityTitle: next.lesson.title,
            href: `/dashboard/library/${programId}/lessons/${next.lesson.id}`,
            progressPct: 0,
            type: 'lesson',
            activityLabel: 'Siguiente lección',
            programProgress,
        };
    };

    if (!last?.lessonId) {
        return buildFromActivity(nextUncompletedActivity(program, user));
    }

    const currentLesson = lessons.find(l => l.id === last.lessonId);
    if (!currentLesson) {
        return buildFromActivity(nextUncompletedActivity(program, user));
    }

    const currentTime = Math.max(0, last.currentTime ?? 0);
    const duration = Number.isFinite(currentLesson.duration) ? currentLesson.duration : 0;

    const progress = pctFrom(currentTime, duration);
    const remaining = duration > 0 ? Math.max(0, duration - currentTime) : Infinity;
    const isCompletedNow = isLessonCompleted(user, programId, last.lessonId);

    if (isCompletedNow || remaining <= NEAR_END_SECONDS || progress / 100 >= PROGRESS_HIDE_THRESHOLD) {
        return buildFromActivity(nextUncompletedActivity(program, user));
    }

    const progressPct = Math.max(0, Math.min(99, progress));
    return {
        programId,
        programName: program.name,
        programLogo: program.logo,
        activityTitle: currentLesson?.title ?? "",
        href: `/dashboard/library/${programId}/lessons/${currentLesson?.id}?t=${currentTime}`,
        progressPct,
        type: 'lesson',
        activityLabel: 'Lección en progreso',
        programProgress,
    };
}
