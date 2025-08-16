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
    | "streak_3_days"
    | "streak_7_days"
    | "streak_30_days"
    | "trenno_ia_joined"
    | "trenno_ia_first_module_completed"
    | "trenno_ia_completed";

export interface Achievement {
    id: AchievementId;
    title: string;
    description: string;
    background: StaticImageData;
    categories: Array<"stannum"|"tmd"|"tia">;
    getProgress: (user: FullUserDetails) => number;
    xpReward: number;
}