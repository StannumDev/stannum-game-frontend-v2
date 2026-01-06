import type { FullUserDetails, Module } from "@/interfaces";

export const isLessonAvailable = (user: FullUserDetails, module: Module, lessonId: string): boolean => {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (!lesson) return false;
    if (lesson.blocked) return false;
    const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === 0) return true;
    const userLessons = Object.values(user.programs).flatMap(p => p.lessonsCompleted || []).map(l => l.lessonId);
    const previousLessons = module.lessons.slice(0, lessonIndex);
    return previousLessons.filter(l => !l.blocked).every(l => userLessons.includes(l.id));
};