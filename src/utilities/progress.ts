import type { FullUserDetails, Program, UserProgram } from "@/interfaces";

type Totals = {
    lessonsTotal: number;
    lessonsDone: number;
    instructionsTotal: number;
    instructionsDone: number;
};

export const calculateProgramTotals = (program: Program, user: FullUserDetails): Totals => {
    const userProgram:UserProgram = user.programs?.[program.id as keyof FullUserDetails["programs"]];
    const userLessons = userProgram?.lessonsCompleted ?? [];
    const userInstructions = userProgram?.instructions ?? [];
    let lessonsTotal = 0;
    let lessonsDone = 0;
    let instructionsTotal = 0;
    let instructionsDone = 0;

    for (const section of program.sections) {
        if(!section.modules) continue;
        for (const mod of section.modules) {
            lessonsTotal += mod.lessons.length;
            for (const lesson of mod.lessons) {
                if (userLessons.some((ul) => ul.lessonId === lesson.id)) lessonsDone += 1;
            }
            instructionsTotal += mod.instructions.length;
            for (const instruction of mod.instructions) {
                if (userInstructions.some((ui) => ui.instructionId === instruction.id && ui.status === "GRADED")) instructionsDone += 1;
            }
        }
    }
    return { lessonsTotal, lessonsDone, instructionsTotal, instructionsDone };
}

export const calculateProgramProgress = (program: Program, user: FullUserDetails): number => {
    const { lessonsTotal, lessonsDone, instructionsTotal, instructionsDone } = calculateProgramTotals(program, user);
    const totalItems = lessonsTotal + instructionsTotal;
    const doneItems = lessonsDone + instructionsDone;

    if (totalItems === 0) return 0;
    return Math.max(0, Math.min(100, Math.round((doneItems / totalItems) * 100)));
}
