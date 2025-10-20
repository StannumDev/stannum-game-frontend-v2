import type { IconType } from 'react-icons';
import { AnalysisIcon, AutomationIcon, ChatGPTIcon, ClaudeIcon, ClockIcon, ContentIcon, ExternalLinkIcon, FireIcon, GoogleColourIcon, GrowthIcon, InnovationIcon, LeadershipIcon, LikeIcon, MarketingIcon, PerplexityIcon, PoeIcon, ProductivityIcon, RobotIcon, SalesIcon, ShieldCompletedIcon, ShieldEmpyIcon, ShieldHalfIcon, StrategyIcon } from '@/icons';

export interface FilterOption {
    value: string;
    label: string;
    icon?: IconType;
    disabled?: boolean;
}

export const ASSISTANT_CATEGORIES = ['sales', 'productivity', 'marketing', 'innovation', 'leadership', 'strategy', 'automation', 'content', 'analysis', 'growth'] as const;

export const categoryOptions: Array<FilterOption> = [
    { value: 'analysis', label: 'Análisis', icon: AnalysisIcon },
    { value: 'automation', label: 'Automatización', icon: AutomationIcon },
    { value: 'content', label: 'Contenido', icon: ContentIcon },
    { value: 'growth', label: 'Crecimiento', icon: GrowthIcon },
    { value: 'strategy', label: 'Estrategia', icon: StrategyIcon },
    { value: 'innovation', label: 'Innovación', icon: InnovationIcon },
    { value: 'leadership', label: 'Liderazgo', icon: LeadershipIcon },
    { value: 'marketing', label: 'Marketing', icon: MarketingIcon },
    { value: 'productivity', label: 'Productividad', icon: ProductivityIcon },
    { value: 'sales', label: 'Ventas', icon: SalesIcon },
];

export const categoryIcons: Record<string, IconType> = {
    sales: SalesIcon,
    productivity: ProductivityIcon,
    marketing: MarketingIcon,
    innovation: InnovationIcon,
    leadership: LeadershipIcon,
    strategy: StrategyIcon,
    automation: AutomationIcon,
    content: ContentIcon,
    analysis: AnalysisIcon,
    growth: GrowthIcon,
};

export const ASSISTANT_DIFFICULTIES = ['basic', 'intermediate', 'advanced'] as const;

export const difficultyOptions: Array<FilterOption> = [
    { value: 'basic', label: 'Básico', icon: ShieldEmpyIcon },
    { value: 'intermediate', label: 'Intermedio', icon: ShieldHalfIcon },
    { value: 'advanced', label: 'Avanzado', icon: ShieldCompletedIcon },
];

export const difficultyIcons: Record<string, IconType> = {
    basic: ShieldEmpyIcon,
    intermediate: ShieldHalfIcon,
    advanced: ShieldCompletedIcon,
};

export const ASSISTANT_PLATFORMS = [
    'chatgpt',
    'claude',
    'gemini',
    'poe',
    'perplexity',
    'other'
] as const;

export const platformOptions: FilterOption[] = [
    { value: 'chatgpt', label: 'ChatGPT', icon: ChatGPTIcon },
    { value: 'poe', label: 'Poe', icon: PoeIcon },
    { value: 'claude', label: 'Claude', icon: ClaudeIcon, disabled: true },
    { value: 'gemini', label: 'Gemini', icon: GoogleColourIcon, disabled: true },
    { value: 'perplexity', label: 'Perplexity', icon: PerplexityIcon, disabled: true },
    { value: 'other', label: 'Otro', icon: RobotIcon },
];

export const ASSISTANT_SORT_OPTIONS = ['popular', 'newest', 'mostUsed', 'mostLiked', 'mostViewed'] as const;

export const sortByOptions: Array<FilterOption> = [
    { value: 'popular', label: 'Más populares', icon: FireIcon },
    { value: 'newest', label: 'Más recientes', icon: ClockIcon },
    { value: 'mostUsed', label: 'Más usados', icon: ExternalLinkIcon },
    { value: 'mostLiked', label: 'Más valorados', icon: LikeIcon },
];