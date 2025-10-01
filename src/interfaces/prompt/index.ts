export type PromptCategory = 'sales' | 'productivity' | 'marketing' | 'innovation' | 'leadership' | 'strategy' | 'automation' | 'content' | 'analysis' | 'growth';
export type PromptDifficulty = 'basic' | 'intermediate' | 'advanced';
export type PromptPlatform = 'chatgpt' | 'claude' | 'gemini' | 'notion-ai' | 'midjourney' | 'gpt-4' | 'custom-gpt' | 'other';

export interface PromptAuthor {
    id: string;
    username: string;
    name?: string;
    profilePhotoUrl?: boolean;
}

export interface PromptMetrics {
    copiesCount: number;
    likesCount: number;
    favoritesCount: number;
    viewsCount: number;
}

export interface PromptUserActions {
    hasLiked: boolean;
    hasFavorited: boolean;
}

export interface Prompt {
    id: string;
    title: string;
    description: string;
    content: string;
    category: PromptCategory;
    difficulty: PromptDifficulty;
    platforms: PromptPlatform[];
    customGptUrl?: string;
    tags: string[];
    exampleOutput?: string;
    metrics: PromptMetrics;
    author: PromptAuthor;
    createdAt: Date;
    updatedAt: Date;
    popularityScore: number;
    engagementRate: string;
    userActions?: PromptUserActions;
}

export interface PromptCard {
    id: string;
    title: string;
    description: string;
    contentPreview: string;
    category: PromptCategory;
    difficulty: PromptDifficulty;
    platforms: PromptPlatform[];
    tags: string[];
    metrics: {
        copies: number;
        likes: number;
        favorites: number;
    };
    author: {
        username: string;
        profilePhotoUrl?: boolean;
    };
    createdAt: Date;
    hasCustomGpt: boolean;
    userActions?: PromptUserActions;
}

export interface PromptFilters {
    search?: string;
    category?: string;
    difficulty?: string;
    tags?: string;
    platforms?: string;
    sortBy?: 'popular' | 'newest' | 'mostCopied' | 'mostLiked' | 'mostViewed';
    page?: number;
    limit?: number;
}

export interface CreatePromptData {
    title: string;
    description: string;
    content: string;
    category: string;
    difficulty?: string;
    platforms: string[];
    customGptUrl?: string;
    tags?: string[];
    exampleOutput?: string;
}

export interface PromptPagination {
    currentPage: number;
    totalPages: number;
    totalPrompts: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface PromptsResponse {
    success: boolean;
    data: {
        prompts: PromptCard[];
        pagination: PromptPagination;
    };
}

export interface PromptResponse {
    success: boolean;
    data: Prompt;
}

export interface CopyPromptResponse {
    success: boolean;
    message: string;
    data: {
        content: string;
        copiesCount: number;
    };
}

export interface LikePromptResponse {
    success: boolean;
    message: string;
    data: {
        likesCount: number;
    };
}

export interface ToggleFavoritePromptResponse {
    success: boolean;
    message: string;
    data: {
        isFavorited: boolean;
        favoritesCount: number;
    };
}

export interface PromptCategoryStats {
    _id: PromptCategory;
    count: number;
    totalCopies: number;
}

export interface PromptsStatsResponse {
    success: boolean;
    data: {
        overview: {
            totalPrompts: number;
            totalCopies: number;
            totalLikes: number;
            totalViews: number;
        };
        byCategory: PromptCategoryStats[];
        totalAuthors: number;
    };
}

export interface TopPromptsResponse {
    success: boolean;
    data: {
        prompts: PromptCard[];
    };
}

export interface FavoritePromptsResponse {
    success: boolean;
    data: {
        prompts: PromptCard[];
        totalFavorites: number;
    };
}