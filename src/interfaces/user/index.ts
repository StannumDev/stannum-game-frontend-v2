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
    instructions: Array<InstructionDetails>;
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

export interface FullUserDetails extends BaseUser {
    profile: UserProfile;
    enterprise?: EnterpriseDetails;
    teams?: Array<TeamDetails>;
    level?: LevelDetails;
    achievements?: Array<AchievementDetails>;
}