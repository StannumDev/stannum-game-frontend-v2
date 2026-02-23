import { StaticImageData } from "next/image";
import { FullUserDetails } from "@/interfaces";

export type AchievementId =
    | "first_program_acquired"
    | "profile_completed"
    | "first_module_completed"
    | "first_lesson_completed"
    | "first_instruction_completed"
    | "module_instructions_completed"
    | "first_program_completed"
    | "level_5"
    | "level_10"
    | "level_20"
    | "level_25"
    | "streak_3_days"
    | "streak_7_days"
    | "streak_15_days"
    | "streak_30_days"
    | "perfect_score"
    | "triple_perfect"
    | "marathon_day"
    | "prompt_creator"
    | "assistant_creator"
    | "community_favorite"
    | "collector"
    | "trenno_ia_joined"
    | "trenno_ia_first_module_completed"
    | "trenno_ia_completed"
    | "trenno_ia_summer_joined"
    | "trenno_ia_summer_halfway"
    | "trenno_ia_summer_graduate";

export interface Achievement {
    id: AchievementId;
    title: string;
    description: string;
    background: StaticImageData;
    categories: Array<"stannum"|"tmd"|"tia"|"summer">;
    getProgress: (user: FullUserDetails) => number;
    xpReward: number;
    coinsReward: number;
}