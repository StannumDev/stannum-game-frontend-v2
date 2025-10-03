export type AssistantCategory = 'sales' | 'productivity' | 'marketing' | 'innovation' | 'leadership' | 'strategy' | 'automation' | 'content' | 'analysis' | 'growth';
export type AssistantDifficulty = 'basic' | 'intermediate' | 'advanced';
export type AssistantPlatform = 'chatgpt' | 'claude' | 'gemini' | 'poe' | 'perplexity' | 'other';

export interface AssistantAuthor {
    id: string;
    username: string;
    name?: string;
    profilePhotoUrl?: string;
}

export interface AssistantMetrics {
    clicksCount: number;
    likesCount: number;
    favoritesCount: number;
    viewsCount: number;
}

export interface AssistantUserActions {
    hasLiked: boolean;
    hasFavorited: boolean;
}

export interface Assistant {
    id: string;
    title: string;
    description: string;
    assistantUrl: string;
    category: AssistantCategory;
    difficulty: AssistantDifficulty;
    platforms: AssistantPlatform[];
    tags: string[];
    useCases?: string;
    metrics: AssistantMetrics;
    author: AssistantAuthor;
    createdAt: Date;
    updatedAt: Date;
    popularityScore: number;
    engagementRate: string;
    userActions?: AssistantUserActions;
}

export interface AssistantCard {
    id: string;
    title: string;
    description: string;
    assistantUrl: string;
    category: AssistantCategory;
    difficulty: AssistantDifficulty;
    platforms: AssistantPlatform[];
    tags: string[];
    metrics: {
        clicks: number;
        likes: number;
        favorites: number;
    };
    author: {
        username: string;
        profilePhotoUrl?: string;
    };
    createdAt: Date;
    userActions?: AssistantUserActions;
}

export interface AssistantFilters {
    search?: string;
    category?: string;
    difficulty?: string;
    tags?: string;
    platforms?: string;
    sortBy?: 'popular' | 'newest' | 'mostUsed' | 'mostLiked' | 'mostViewed';
    favoritesOnly?: boolean;
    page?: number;
    limit?: number;
}

export interface CreateAssistantData {
    title: string;
    description: string;
    assistantUrl: string;
    category: string;
    difficulty?: string;
    platforms: string[];
    tags?: string[];
    useCases?: string;
}

export interface AssistantPagination {
    currentPage: number;
    totalPages: number;
    totalAssistants: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface AssistantsResponse {
    success: boolean;
    data: {
        assistants: AssistantCard[];
        pagination: AssistantPagination;
    };
}

export interface AssistantResponse {
    success: boolean;
    data: Assistant;
}

export interface ClickAssistantResponse {
    success: boolean;
    message: string;
    data: {
        assistantUrl: string;
        clicksCount: number;
    };
}

export interface LikeAssistantResponse {
    success: boolean;
    message: string;
    data: {
        likesCount: number;
    };
}

export interface ToggleFavoriteAssistantResponse {
    success: boolean;
    message: string;
    data: {
        isFavorited: boolean;
        favoritesCount: number;
    };
}

export interface AssistantCategoryStats {
    _id: AssistantCategory;
    count: number;
    totalClicks: number;
}

export interface AssistantsStatsResponse {
    success: boolean;
    data: {
        overview: {
            totalAssistants: number;
            totalClicks: number;
            totalLikes: number;
            totalViews: number;
        };
        byCategory: AssistantCategoryStats[];
        totalAuthors: number;
    };
}

export interface TopAssistantsResponse {
    success: boolean;
    data: {
        assistants: AssistantCard[];
    };
}

export interface FavoriteAssistantsResponse {
    success: boolean;
    data: {
        assistants: AssistantCard[];
        totalFavorites: number;
    };
}