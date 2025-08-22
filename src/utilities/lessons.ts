import type { FullUserDetails, Module } from "@/interfaces";

export const isLessonAvailable = (user: FullUserDetails, module: Module, lessonId: string): boolean => {
    const userLessons = Object.values(user.programs).flatMap(p => p.lessonsCompleted || []).map(l => l.lessonId);

    const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) return false;
    if (lessonIndex === 0) return true;
    const previousLessons = module.lessons.slice(0, lessonIndex);
    return previousLessons.every(l => userLessons.includes(l.id));
};
