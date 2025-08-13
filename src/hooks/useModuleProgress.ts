import { FullUserDetails, Module } from "@/interfaces";

export type ModuleStatus = "BLOCKED" | "IN_PROGRESS" | "COMPLETED";

interface ModuleProgress {
    status: ModuleStatus;
    lessonsProgress: number;
    instructionsProgress: number;
}

interface Props {
    program_module: Module;
    moduleIndex: number;
    modules: Module[];
    user: FullUserDetails;
    programId: string;
}

export const useModuleProgress = ({ program_module, moduleIndex, modules, user, programId }: Props): ModuleProgress => {
    const { lessons, instructions } = program_module;
    const userLessons = user?.programs?.[programId as keyof FullUserDetails["programs"]]?.lessonsCompleted || [];
    const userInstructions = user?.programs?.[programId as keyof FullUserDetails["programs"]]?.instructions || [];
    const totalLessons = lessons.length;
    const totalInstructions = instructions.length;

    const completedLessons = lessons.filter((lesson) => userLessons.some((ul) => ul.lessonId === lesson.id)).length;
    const completedInstructions = instructions.filter((instruction) => userInstructions.find((ui) => ui.instructionId === instruction.id && ui.status === "GRADED")).length;

    const lessonsProgress = totalLessons > 0 ? Math.floor((completedLessons / totalLessons) * 100) : 0;
    const instructionsProgress = totalInstructions > 0 ? Math.floor((completedInstructions / totalInstructions) * 100) : 0;

    const previousModuleStatus = moduleIndex > 0 ? calculateModuleStatus(modules[moduleIndex - 1], user, programId) : "COMPLETED";

    if (previousModuleStatus !== "COMPLETED") {
        return {
            status: "BLOCKED",
            lessonsProgress,
            instructionsProgress,
        };
    }

    if (lessonsProgress === 100 && instructionsProgress === 100) return { status: "COMPLETED", lessonsProgress, instructionsProgress };
    if (lessonsProgress > 0 || instructionsProgress > 0) return { status: "IN_PROGRESS", lessonsProgress, instructionsProgress };
    return { status: moduleIndex === 0 ? "IN_PROGRESS" : "BLOCKED", lessonsProgress, instructionsProgress };
};

const calculateModuleStatus = (module: Module, user: FullUserDetails, programId: string): ModuleStatus => {
    const { lessons, instructions } = module;
    const userLessons = user?.programs?.[programId as keyof FullUserDetails["programs"]]?.lessonsCompleted || [];
    const userInstructions = user?.programs?.[programId as keyof FullUserDetails["programs"]]?.instructions || [];
    const totalLessons = lessons.length;
    const totalInstructions = instructions.length;

    const completedLessons = lessons.filter((lesson) => userLessons.some((ul) => ul.lessonId === lesson.id)).length;
    const completedInstructions = instructions.filter((instruction) => userInstructions.find((ui) => ui.instructionId === instruction.id && ui.status === "GRADED")).length;

    const lessonsProgress = totalLessons > 0 ? Math.floor((completedLessons / totalLessons) * 100) : 0;
    const instructionsProgress = totalInstructions > 0 ? Math.floor((completedInstructions / totalInstructions) * 100) : 0;

    if (lessonsProgress === 100 && instructionsProgress === 100) return "COMPLETED";
    if (lessonsProgress > 0 || instructionsProgress > 0) return "IN_PROGRESS";
    return "BLOCKED";
};
