import api from "@/lib/api";
import type { AchievementDetails } from "@/interfaces";

export interface LessonCompletionResult {
    gained: number;
    streakBonus: number;
    totalGain: number;
    achievementsUnlocked: AchievementDetails[];
}

export const markLessonAsCompleted = async (programName: string, lessonId: string): Promise<LessonCompletionResult> => {
    try {
        const response = await api.post(
            `${process.env.NEXT_PUBLIC_API_LESSON_URL}/complete/${programName}/${lessonId}`, {}
        );

        if (!response?.data?.success) throw new Error("Unexpected response structure");
        const { gained = 0, streakBonus = 0, totalGain = 0, achievementsUnlocked = [] } = response.data;
        return { gained, streakBonus, totalGain, achievementsUnlocked };
    } catch (error: unknown) {
        throw error;
    }
};

export const saveLastWatchedLesson = async (programName: string, lessonId: string, currentTime: number): Promise<boolean> => {
    try {
        const response = await api.patch(
            `${process.env.NEXT_PUBLIC_API_LESSON_URL}/lastwatched/${programName}/${lessonId}`,
            { currentTime }
        );

        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error:unknown) {
        throw error;
    }
};
