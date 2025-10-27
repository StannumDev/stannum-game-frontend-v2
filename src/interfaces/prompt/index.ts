import { StannumVerification } from "@/interfaces";

export type PromptCategory = 'sales' | 'productivity' | 'marketing' | 'innovation' | 'leadership' | 'strategy' | 'automation' | 'content' | 'analysis' | 'growth';
export type PromptDifficulty = 'basic' | 'intermediate' | 'advanced';
export type PromptPlatform = 'chatgpt' | 'claude' | 'gemini' | 'poe' | 'perplexity' | 'other';
export type PromptVisibility = 'published' | 'draft' | 'hidden';
export type PromptSortBy = 'popular' | 'newest' | 'mostCopied' | 'mostLiked' | 'mostViewed' | 'verified';

export interface PromptAuthor {
    id: string;
    username: string;
    name?: string;
    profilePhotoUrl?: string;
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
    visibility: PromptVisibility;
    stannumVerified: StannumVerification;
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
        profilePhotoUrl?: string;
    };
    stannumVerified: StannumVerification;
    createdAt: Date;
    hasCustomGpt: boolean;
    userActions?: PromptUserActions;
}

export interface PromptFilters {
    search?: string;
    category?: PromptCategory;
    difficulty?: PromptDifficulty;
    tags?: string;
    platforms?: string;
    sortBy?: PromptSortBy;
    favoritesOnly?: boolean;
    stannumVerifiedOnly?: boolean;
    page?: number;
    limit?: number;
}

export interface PromptPagination {
    currentPage: number;
    totalPages: number;
    totalPrompts: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface CreatePromptData {
    title: string;
    description: string;
    content: string;
    category: PromptCategory;
    difficulty?: PromptDifficulty;
    platforms: PromptPlatform[];
    customGptUrl?: string;
    tags?: string[];
    exampleOutput?: string;
    visibility?: PromptVisibility;
}

export interface UpdatePromptData {
    title: string;
    description: string;
    content: string;
    category: PromptCategory;
    difficulty?: PromptDifficulty;
    platforms: PromptPlatform[];
    customGptUrl?: string;
    tags?: string[];
    exampleOutput?: string;
    visibility?: PromptVisibility;
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

export interface MyPromptCard {
    id: string;
    title: string;
    description: string;
    content: string;
    category: PromptCategory;
    difficulty: PromptDifficulty;
    platforms: PromptPlatform[];
    tags: string[];
    visibility: PromptVisibility;
    stannumVerified: StannumVerification;
    hasCustomGpt: boolean;
    customGptUrl?: string;
    exampleOutput?: string;
    useCases?: string;
    metrics: {
        copiesCount: number;
        likesCount: number;
        favoritesCount: number;
        viewsCount: number;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MyPromptsResponse {
    success: boolean;
    data: {
        prompts: MyPromptCard[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalPrompts: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    };
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

export interface ToggleVisibilityPromptResponse {
    success: boolean;
    message: string;
    data: {
        visibility: PromptVisibility;
    };
}

export interface FavoritePromptsResponse {
    success: boolean;
    data: {
        prompts: PromptCard[];
        totalFavorites: number;
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