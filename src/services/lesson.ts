import api from "@/lib/api";
import type { AchievementDetails } from "@/interfaces";

export interface LessonCompletionResult {
    gained: number;
    streakBonus: number;
    totalGain: number;
    coinsGained: number;
    achievementsUnlocked: AchievementDetails[];
}

export const markLessonAsCompleted = async (programName: string, lessonId: string): Promise<LessonCompletionResult> => {
    try {
        const response = await api.post(
            `${process.env.NEXT_PUBLIC_API_LESSON_URL}/complete/${programName}/${lessonId}`, {}
        );

        if (!response?.data?.success) throw new Error("Unexpected response structure");
        const { gained = 0, streakBonus = 0, totalGain = 0, coinsGained = 0, achievementsUnlocked = [] } = response.data;
        return { gained, streakBonus, totalGain, coinsGained, achievementsUnlocked };
    } catch (error: unknown) {
        throw error;
    }
};

export const getPlaybackId = async (programName: string, lessonId: string): Promise<string | null> => {
    try {
        const response = await api.get(
            `${process.env.NEXT_PUBLIC_API_LESSON_URL}/playback/${programName}/${lessonId}`
        );
        if (!response?.data?.success) return null;
        return response.data.playbackId ?? null;
    } catch {
        return null;
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
