import { achievements } from "@/config/achievements";
import { AchievementDetails } from "@/interfaces";
import { callToast } from "./callToast";

export const achievementHandler = (unlockedAchievements: Array<AchievementDetails>) => {
    unlockedAchievements.forEach(achievement => {
        const achievementDetails = achievements.find(a => a.id === achievement.achievementId);
        if(!achievementDetails) return;
        callToast({ message:{ title: achievementDetails?.title, description: '¡Logro desbloqueado!' }, type: 'achievement' });
    });
};