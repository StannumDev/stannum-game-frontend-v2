import { Instruction } from "../programs";

export interface BaseUser {
    id: string;
    username: string;
    profilePhoto?: string;
}

export interface UserProfile {
    name: string;
    birthdate?: string;
    country?: string;
    region?: string;
    aboutMe?: string;
}

export interface EnterpriseDetails {
    name: string;
    jobPosition: string;
}

export interface TeamDetails {
    id: string;
    name: string;
    position?: string;
}

export interface LevelDetails {
    currentLevel: number;
    experienceTotal: number;
    experienceCurrentLevel: number;
    experienceNextLevel: number;
    progress: number;
}

export interface AchievementDetails {
    achievementId: string;
    unlockedAt: Date;
    xpReward: number
}

export interface ProgramDetails {
    isPurchased: boolean;
    acquiredAt?: string;
    instructions: Array<Instruction>;
    lessonsCompleted: Array<LessonDetails>;
    lastWatchedLesson?: Array<LessonDetails>;
    // tests: Array<TestDetails>;
    productKey?: string;
}

export interface InstructionDetails {
    instructionId: string;
    startDate: string;
    submittedAt?: string;
    reviewedAt?: string;
    score?: number;
    xpGrantedAt?: string;
    estimatedTimeSec?: number;
    observations?: string;
    status: "PENDING" | "IN_PROCESS" | "SUBMITTED" | "GRADED";
}

export interface LessonDetails {
    id: string;
    title: string;
}

export interface TestDetails {
    id: string;
    title: string;
    score?: number;
    status: "pending" | "completed";
}

export interface UserSidebarDetails extends Pick<BaseUser, "id" | "username" | "profilePhoto"> {}

export interface RankingUserDetails extends Pick<BaseUser, "id" | "username" | "profilePhoto"> {
    team: string | null;
    currentLevel: number;
}

export interface UserSearchResult extends BaseUser {
    name: string;
    enterprise?: string;
    jobPosition?: string;
}

export interface UserProgram {
    isPurchased: boolean;
    acquiredAt?: string;
    instructions: {
        instructionId: string;
        startDate: string;
        submittedAt?: string;
        reviewedAt?: string;
        score?: number;
        observations?: string;
        xpGrantedAt?: string;
        estimatedTimeSec?: number;
        status: "PENDING" | "IN_PROCESS" | "SUBMITTED" | "GRADED";
    }[];
    lessonsCompleted: {
        lessonId: string;
        viewedAt: string;
    }[];
    lastWatchedLesson?: {
        lessonId: string;
        viewedAt: string;
        currentTime?: number;
    };
    // tests: {
    //     date: string;
    //     sections?: any[];
    //     totalScore: number;
    // }[];
    productKey?: string;
}

export interface UserPreferences {
    tutorials: {
        name: string;
        isCompleted: boolean;
        completedAt?: string;
    }[];
    notificationsEnabled: boolean;
    hasProfilePhoto: boolean;
    isGoogleAccount: boolean;
    allowPasswordLogin: boolean;
}

export interface FullUserDetails {
    id: string;
    username: string;
    profilePhoto?: string;
    profile: UserProfile;
    enterprise: EnterpriseDetails;
    teams?: Array<{
        programName: string;
        teamName: string;
        role: string;
    }>;
    level: LevelDetails;
    achievements: Array<AchievementDetails>;
    programs: {
        tia: UserProgram;
        tmd: UserProgram;
    };
    preferences: UserPreferences;
    dailyStreak: {
        count: number;
        lastActivityLocalDate?: string;
        timezone: string;
    };
    xpHistory: Array<{
        type: "LESSON_COMPLETED" | "INSTRUCTION_GRADED" | "DAILY_STREAK_BONUS";
        xp: number;
        date: string;
        // meta?: string;
    }>;
    unlockedCovers?: Array<{
        coverId: string;
        unlockedDate: string;
    }>;
}