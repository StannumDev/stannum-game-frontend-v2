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
    experience: number;
    nextLevelExp: number;
}

export interface AchievementDetails {
    id: string;
    title: string;
    description: string;
    achievedAt: string;
}

export interface ProgramDetails {
    isPurchased: boolean;
    acquiredAt?: string;
    instructions: Array<Instruction>;
    lessonsCompleted: Array<LessonDetails>;
    lastWatchedLesson?: Array<LessonDetails>;
    tests: Array<TestDetails>;
    productKey?: string;
}

export interface InstructionDetails {
    id: string;
    title: string;
    isCompleted: boolean;
}

export interface LessonDetails {
    id: string;
    title: string;
    progress: number;
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
    tests: {
        date: string;
        // sections: any[];
        totalScore: number;
    }[];
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
    profile: {
        name: string;
        birthdate?: string;
        country?: string;
        region?: string;
        aboutMe?: string;
    };
    enterprise?: {
        name: string;
        jobPosition: string;
    };
    teams?: Array<{
        programName: string;
        teamName: string;
        role: string;
    }>;
    level?: {
        currentLevel: number;
        experienceTotal: number;
        experienceCurrentLevel: number;
        experienceNextLevel: number;
        progress: number;
    };
    achievements?: Array<{
        achievementId: string;
        progress: number;
        isCompleted: boolean;
    }>;
    programs: {
        tia: UserProgram;
        tmd: UserProgram;
    };
    preferences: UserPreferences;
}