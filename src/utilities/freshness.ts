import type { FullUserDetails, Instruction, Lesson, ProgramId, UserProgram } from "@/interfaces";

export type FreshnessStatus = 'new' | 'updated' | null;

const toTime = (d?: string | null): number | null => {
    if (!d) return null;
    const t = new Date(d).getTime();
    return Number.isFinite(t) ? t : null;
};

const getUserProgramStartTime = (userProgram?: UserProgram): number | null => {
    if (!userProgram) return null;

    const acquiredAt = toTime(userProgram.acquiredAt);
    if (acquiredAt !== null) return acquiredAt;

    const times: number[] = [];
    for (const l of userProgram.lessonsCompleted || []) {
        const t = toTime(l.viewedAt);
        if (t !== null) times.push(t);
    }
    for (const i of userProgram.instructions || []) {
        const t = toTime(i.startDate);
        if (t !== null) times.push(t);
    }
    return times.length > 0 ? Math.min(...times) : null;
};

export const getLessonFreshness = (user: FullUserDetails, programId: ProgramId, lesson: Lesson): FreshnessStatus => {
    const createdAt = toTime(lesson.createdAt);
    const updatedAt = toTime(lesson.updatedAt);
    if (createdAt === null && updatedAt === null) return null;

    const userProgram = user.programs?.[programId];
    const completed = userProgram?.lessonsCompleted?.find(l => l.lessonId === lesson.id);
    const viewedAt = toTime(completed?.viewedAt);

    if (viewedAt !== null) {
        if (updatedAt !== null && updatedAt > viewedAt) return 'updated';
        return null;
    }

    const startTime = getUserProgramStartTime(userProgram);
    if (startTime !== null && createdAt !== null && createdAt > startTime) return 'new';
    return null;
};

export const getInstructionFreshness = (user: FullUserDetails, programId: ProgramId, instruction: Instruction): FreshnessStatus => {
    const createdAt = toTime(instruction.createdAt);
    const updatedAt = toTime(instruction.updatedAt);
    if (createdAt === null && updatedAt === null) return null;

    const userProgram = user.programs?.[programId];
    const userInstr = userProgram?.instructions?.find(ui => ui.instructionId === instruction.id);
    const submittedAt = toTime(userInstr?.submittedAt);
    const isDone = !!userInstr && ["SUBMITTED", "GRADED"].includes(userInstr.status);

    if (isDone && submittedAt !== null) {
        if (updatedAt !== null && updatedAt > submittedAt) return 'updated';
        return null;
    }

    const startTime = getUserProgramStartTime(userProgram);
    if (startTime !== null && createdAt !== null && createdAt > startTime) return 'new';
    return null;
};
