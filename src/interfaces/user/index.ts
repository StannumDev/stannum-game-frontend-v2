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
    socialLinks?: {
        platform: "LinkedIn" | "Instagram" | "Twitter" | "TikTok" | "Facebook" | "YouTube" | "GitHub" | "Website" | "Otra";
        url: string;
    }[];
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
    xpReward: number;
    coinsReward: number;
}

export type SubscriptionStatus = 'pending' | 'active' | 'paused' | 'cancelled' | 'expired' | null;

export interface SubscriptionDetails {
    status: SubscriptionStatus;
    priceARS: number | null;
    currentPeriodEnd: string | null;
    subscribedAt: string | null;
    cancelledAt: string | null;
    lastPaymentAt: string | null;
}

export interface ProgramDetails {
    isPurchased: boolean;
    hasAccessFlag: boolean;
    acquiredAt?: string;
    instructions: Array<InstructionDetails>;
    lessonsCompleted: Array<LessonDetails>;
    lastWatchedLesson?: { lessonId: string; currentTime: number };
    subscription?: SubscriptionDetails;
    productKey?: string;
}

export interface InstructionDetails {
    instructionId: string;
    startDate: string;
    submittedAt?: string;
    reviewedAt?: string;
    score?: number;
    xpGrantedAt?: string;
    xpGained?: number;
    estimatedTimeSec?: number;
    observations?: string;
    referencedLessons?: string[];
    status: "PENDING" | "IN_PROCESS" | "SUBMITTED" | "GRADED" | "ERROR";
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

export interface UserSidebarDetails extends Pick<BaseUser, "id" | "username" | "profilePhoto"> {
    currentLevel: number;
    coins: number;
}

export interface RankingUserDetails extends Pick<BaseUser, "id" | "username" | "profilePhoto"> {
    team: string | null;
    currentLevel: number;
}

export interface UserSearchResult extends BaseUser {
    name: string;
    enterprise?: string;
    jobPosition?: string;
}

export interface UserFavorites {
    prompts: string[];
    assistants: string[];
}

export interface UserProgram {
    isPurchased: boolean;
    hasAccessFlag: boolean;
    acquiredAt?: string;
    instructions: Array<InstructionDetails>;
    lessonsCompleted: {
        lessonId: string;
        viewedAt: string;
    }[];
    chestsOpened?: {
        chestId: string;
        openedAt: string;
    }[];
    lastWatchedLesson?: {
        lessonId: string;
        viewedAt: string;
        currentTime?: number;
    };
    subscription?: SubscriptionDetails;
    productKey?: string;
    coinsRewardedModules?: string[];
    coinsRewardedProgram?: boolean;
    totalXp?: number;
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

export type CoverRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface StoreCoverItem {
    id: string;
    name: string;
    description: string;
    price: number;
    rarity: CoverRarity;
    imageKey: string;
    owned: boolean;
    equipped: boolean;
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
    favorites: UserFavorites;
    programs: {
        tia: UserProgram;
        tia_summer: UserProgram;
        tmd: UserProgram;
        trenno_ia: UserProgram;
    };
    preferences: UserPreferences;
    dailyStreak: {
        count: number;
        lastActivityLocalDate?: string;
        timezone: string;
        shields: number;
        shieldCoveredDate?: string | null;
        lostCount?: number | null;
        lostAt?: string | null;
        recoveryAvailable: boolean;
    };
    coins: number;
    xpHistory: Array<{
        type: "LESSON_COMPLETED" | "INSTRUCTION_GRADED" | "DAILY_STREAK_BONUS" | "ACHIEVEMENT_UNLOCKED" | "CHEST_OPENED";
        xp: number;
        date: string;
        // meta?: string;
    }>;
    coinsHistory: Array<{
        type: "LESSON_COMPLETED" | "INSTRUCTION_GRADED" | "DAILY_STREAK" | "STREAK_BONUS" | "ACHIEVEMENT_UNLOCKED" | "MODULE_COMPLETED" | "PROGRAM_COMPLETED" | "FAVORITE_RECEIVED" | "STORE_PURCHASE" | "CHEST_OPENED" | "STREAK_SHIELD_PURCHASE" | "STREAK_RECOVERY";
        coins: number;
        date: string;
    }>;
    equippedCoverId?: string;
    unlockedCovers?: Array<{
        coverId: string;
        unlockedDate: string;
    }>;
    rankingPosition?: number;
}

export type ProfileStatus = 'complete' | 'needs_username' | 'needs_profile';

export interface AuthUserResponse {
  success: boolean;
  achievementsUnlocked: AchievementDetails[];
  profileStatus?: ProfileStatus;
}

export interface UpdateUsernameResponse {
  success: boolean;
  profileStatus: ProfileStatus;
}