import type { IconType } from 'react-icons';
import { AnalysisIcon, AutomationIcon, ChatGPTIcon, ClaudeIcon, ClockIcon, ContentIcon, CopyIcon, FireIcon, GoogleColourIcon, GrowthIcon, InnovationIcon, LeadershipIcon, LikeIcon, MarketingIcon, PerplexityIcon, PoeIcon, ProductivityIcon, RobotIcon, SalesIcon, ShieldCompletedIcon, ShieldEmpyIcon, ShieldHalfIcon, ShowPasswordIcon, StrategyIcon } from '@/icons';

export const PROMPT_CATEGORIES = [ 'sales', 'productivity', 'marketing', 'innovation', 'leadership', 'strategy', 'automation', 'content', 'analysis', 'growth' ] as const;
export const PROMPT_DIFFICULTIES = ['basic', 'intermediate', 'advanced'] as const;
export const PROMPT_PLATFORMS = [ 'chatgpt', 'claude', 'gemini', 'poe', 'perplexity', 'other' ] as const;

export const categoryIcons: Record<typeof PROMPT_CATEGORIES[number], IconType> = {
    sales: SalesIcon,
    productivity: ProductivityIcon,
    marketing: MarketingIcon,
    innovation: InnovationIcon,
    leadership: LeadershipIcon,
    strategy: StrategyIcon,
    automation: AutomationIcon,
    content: ContentIcon,
    analysis: AnalysisIcon,
    growth: GrowthIcon
};

export const categoryOptions = [
    { value: 'sales', label: 'Ventas', icon: SalesIcon },
    { value: 'productivity', label: 'Productividad', icon: ProductivityIcon },
    { value: 'marketing', label: 'Marketing', icon: MarketingIcon },
    { value: 'innovation', label: 'Innovación', icon: InnovationIcon },
    { value: 'leadership', label: 'Liderazgo', icon: LeadershipIcon },
    { value: 'strategy', label: 'Estrategia', icon: StrategyIcon },
    { value: 'automation', label: 'Automatización', icon: AutomationIcon },
    { value: 'content', label: 'Contenido', icon: ContentIcon },
    { value: 'analysis', label: 'Análisis', icon: AnalysisIcon },
    { value: 'growth', label: 'Crecimiento', icon: GrowthIcon }
];

export const difficultyOptions = [
    { value: 'basic', label: 'Básico', icon: ShieldEmpyIcon },
    { value: 'intermediate', label: 'Intermedio', icon: ShieldHalfIcon },
    { value: 'advanced', label: 'Avanzado', icon: ShieldCompletedIcon }
];

export const difficultyIcons: Record<typeof PROMPT_DIFFICULTIES[number], IconType> = {
    basic: ShieldEmpyIcon,
    intermediate: ShieldHalfIcon,
    advanced: ShieldCompletedIcon
};

export const platformOptions = [
    { value: 'chatgpt', label: 'ChatGPT', icon: ChatGPTIcon },
    { value: 'claude', label: 'Claude', icon: ClaudeIcon },
    { value: 'gemini', label: 'Gemini', icon: GoogleColourIcon },
    { value: 'poe', label: 'Poe', icon: PoeIcon },
    { value: 'perplexity', label: 'Perplexity', icon: PerplexityIcon },
    { value: 'other', label: 'Otro', icon: RobotIcon }
];

export const sortByOptions = [
    { value: 'popular', label: 'Más populares', icon: FireIcon },
    { value: 'newest', label: 'Más recientes', icon: ClockIcon },
    { value: 'mostCopied', label: 'Más copiados', icon: CopyIcon },
    { value: 'mostLiked', label: 'Más valorados', icon: LikeIcon },
    { value: 'mostViewed', label: 'Más vistos', icon: ShowPasswordIcon },
];