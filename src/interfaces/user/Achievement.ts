import { StaticImageData } from "next/image";
import { FullUserDetails } from "@/interfaces";

export type AchievementId = "first_lesson_watched";

export interface Achievement {
    id: AchievementId;
    title: string;
    description: string;
    background: StaticImageData;
    categories: Array<"stannum"|"tmd"|"tia">;
    getProgress: (user: FullUserDetails) => number;
    xpReward: number;
}
