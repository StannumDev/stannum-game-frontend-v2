import type { FullUserDetails, Instruction, Module, ProgramId } from "@/interfaces";

export const isLessonAvailable = (user: FullUserDetails, programId: ProgramId, module: Module, lessonId: string): boolean => {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (!lesson) return false;
    if (lesson.blocked) return false;

    const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === 0) return true;

    const userLessons = (user.programs?.[programId]?.lessonsCompleted || []).map(l => l.lessonId);
    const previousLessons = module.lessons.slice(0, lessonIndex);
    const allPreviousCompleted = previousLessons.filter(l => !l.blocked).every(l => userLessons.includes(l.id));
    if (!allPreviousCompleted) return false;

    const userProgram = user.programs?.[programId];
    const userInstructions = userProgram?.instructions || [];

    for (const instr of module.instructions) {
        const afterIndex = module.lessons.findIndex(l => l.id === instr.afterLessonId);
        if (afterIndex === -1) continue;

        if (lessonIndex > afterIndex) {
            const userInstr = userInstructions.find(ui => ui.instructionId === instr.id);
            const isSubmitted = userInstr && ["SUBMITTED", "GRADED"].includes(userInstr.status);
            if (!isSubmitted) return false;
        }
    }

    return true;
};

export const isInstructionAvailable = (user: FullUserDetails, programId: ProgramId, instruction: Instruction): boolean => {
    const userLessons = user.programs?.[programId]?.lessonsCompleted || [];
    return userLessons.some(l => l.lessonId === instruction.afterLessonId);
};