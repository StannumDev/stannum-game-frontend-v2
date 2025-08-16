import achievementBackground1 from '@/assets/profile/achievement_background_1.webp';
import type { Achievement } from "@/interfaces";

export const achievements: Array<Achievement> = [
    {
        id: "first_lesson_watched",
        title: "Primera lección",
        description: "Has visto tu primera lección en cualquier programa.",
        background: achievementBackground1,
        categories: ["stannum"],
        xpReward: 50,
        getProgress: (user) => {
            const total = Object.values(user.programs).flatMap(p => p.lessonsCompleted || []).length;
            return total >= 1 ? 100 : 0;
        }
    }
];