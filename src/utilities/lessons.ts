import type { FullUserDetails, Instruction, Module, ProgramId } from "@/interfaces";

export const isLessonAvailable = (user: FullUserDetails, programId: ProgramId, module: Module, lessonId: string, extraCompletedLessons?: string[]): boolean => {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (!lesson) return false;
    if (lesson.blocked) return false;

    const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === 0) return true;

    const userLessons = [
        ...(user.programs?.[programId]?.lessonsCompleted || []).map(l => l.lessonId),
        ...(extraCompletedLessons || []),
    ];
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

export const isInstructionAvailable = (user: FullUserDetails, programId: ProgramId, instruction: Instruction, extraCompletedLessons?: string[]): boolean => {
    const userLessons = [
        ...(user.programs?.[programId]?.lessonsCompleted || []).map(l => l.lessonId),
        ...(extraCompletedLessons || []),
    ];
    const lessonCompleted = userLessons.includes(instruction.afterLessonId);
    if (!lessonCompleted) return false;

    if (instruction.requiredActivityId) {
        const userInstructions = user.programs?.[programId]?.instructions || [];
        const requiredInstr = userInstructions.find(ui => ui.instructionId === instruction.requiredActivityId);
        const isSubmitted = requiredInstr && ["SUBMITTED", "GRADED"].includes(requiredInstr.status);
        if (!isSubmitted) return false;
    }

    return true;
};

export const isModuleComplete = (user: FullUserDetails, programId: ProgramId, module: Module, extraCompletedLessons?: string[]): boolean => {
    const userLessons = [
        ...(user.programs?.[programId]?.lessonsCompleted || []).map(l => l.lessonId),
        ...(extraCompletedLessons || []),
    ];
    const userInstructions = user.programs?.[programId]?.instructions || [];

    const allLessonsComplete = module.lessons
        .filter(l => !l.blocked)
        .every(l => userLessons.includes(l.id));
    if (!allLessonsComplete) return false;

    const allInstructionsComplete = module.instructions.every(instr => {
        const userInstr = userInstructions.find(ui => ui.instructionId === instr.id);
        return userInstr && ["SUBMITTED", "GRADED"].includes(userInstr.status);
    });

    return allInstructionsComplete;
};