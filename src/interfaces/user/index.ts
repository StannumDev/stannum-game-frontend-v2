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
    score?: number;
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

export interface UserProgram {
    isPurchased: boolean;
    hasAccessFlag: boolean;
    acquiredAt?: string | null;
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
    subscription?: Pick<SubscriptionDetails, 'status'>;
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
    level: LevelDetails;
    achievements: Array<AchievementDetails>;
    favorites: {
        prompts: number;
        assistants: number;
    };
    programs: {
        tia: UserProgram;
        tia_summer: UserProgram;
        tia_pool: UserProgram;
        tmd: UserProgram;
        trenno_ia: UserProgram;
        demo_trenno: UserProgram;
        [key: string]: UserProgram;
    };
    dailyStreak: {
        count: number;
        lastActivityLocalDate?: string;
        timezone: string;
        shields: number;
        lostCount?: number | null;
        recoveryAvailable: boolean;
        recoveryExpiresAt?: string | null;
    };
    coins: number;
    equippedCoverId?: string;
    unlockedCovers?: Array<{
        coverId: string;
        unlockedDate: string;
    }>;
    rankingPosition?: number;
    communityStats?: {
        promptsCount: number;
        assistantsCount: number;
        totalFavoritesReceived: number;
    };
    feedbackState?: {
        lastNpsAt: string | null;
        lastOnboardingFeedbackAt: string | null;
    };
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