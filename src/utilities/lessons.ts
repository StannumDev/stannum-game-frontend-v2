import type { FullUserDetails, Instruction, Module, ProgramId } from "@/interfaces";

const hasAnyProgressInModule = (user: FullUserDetails, programId: ProgramId, module: Module): boolean => {
    const userLessons = user.programs?.[programId]?.lessonsCompleted || [];
    if (userLessons.some(ul => module.lessons.some(l => l.id === ul.lessonId))) return true;

    const userInstructions = user.programs?.[programId]?.instructions || [];
    return userInstructions.some(ui => {
        if (!["SUBMITTED", "GRADED"].includes(ui.status)) return false;
        return module.instructions.some(i => i.id === ui.instructionId);
    });
};

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

    if (userLessons.includes(lessonId)) return true;
    const hasLaterCompleted = module.lessons.slice(lessonIndex + 1).some(l => userLessons.includes(l.id));
    if (hasLaterCompleted) return true;

    const previousLessons = module.lessons.slice(0, lessonIndex);
    const allPreviousCompleted = previousLessons.filter(l => !l.blocked).every(l => userLessons.includes(l.id));
    if (!allPreviousCompleted) return false;

    const userInstructions = user.programs?.[programId]?.instructions || [];

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

export const isInstructionAvailable = (user: FullUserDetails, programId: ProgramId, module: Module, instruction: Instruction, extraCompletedLessons?: string[]): boolean => {
    const userLessons = [
        ...(user.programs?.[programId]?.lessonsCompleted || []).map(l => l.lessonId),
        ...(extraCompletedLessons || []),
    ];
    const userInstructions = user.programs?.[programId]?.instructions || [];

    const ownInstr = userInstructions.find(ui => ui.instructionId === instruction.id);
    if (ownInstr && ["SUBMITTED", "GRADED"].includes(ownInstr.status)) return true;

    if (instruction.requiredActivityId) {
        const requiredInstr = userInstructions.find(ui => ui.instructionId === instruction.requiredActivityId);
        const isSubmitted = requiredInstr && ["SUBMITTED", "GRADED"].includes(requiredInstr.status);
        if (!isSubmitted) return false;
    }

    const afterLessonIndex = module.lessons.findIndex(l => l.id === instruction.afterLessonId);
    if (afterLessonIndex !== -1) {
        const hasLaterLessonCompleted = module.lessons.slice(afterLessonIndex + 1).some(l => userLessons.includes(l.id));
        if (hasLaterLessonCompleted) return true;
    }

    const lessonCompleted = userLessons.includes(instruction.afterLessonId);
    if (!lessonCompleted) return false;

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

export const hasModuleAccess = (user: FullUserDetails, programId: ProgramId, orderedModules: Module[], targetModuleId: string): boolean => {
    const targetIndex = orderedModules.findIndex(m => m.id === targetModuleId);
    if (targetIndex === -1) return false;

    for (let i = targetIndex; i < orderedModules.length; i++) {
        if (hasAnyProgressInModule(user, programId, orderedModules[i])) return true;
    }

    if (targetIndex === 0) return true;
    return isModuleComplete(user, programId, orderedModules[targetIndex - 1]);
};
