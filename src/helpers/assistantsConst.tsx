import type { IconType } from 'react-icons';
import { MdOutlineAttachMoney, MdSpeed, MdCampaign, MdLightbulb, MdGroups, MdOutlineTimer, MdShowChart, MdTrendingUp } from 'react-icons/md';
import { HiOutlineSparkles, HiOutlineDocumentText } from 'react-icons/hi2';
import { IoShieldCheckmark, IoShieldHalfSharp, IoShield } from 'react-icons/io5';
import { TbFlame, TbClock, TbThumbUp, TbExternalLink } from 'react-icons/tb';
import { SiOpenai, SiClaude, SiPerplexity } from 'react-icons/si';

export interface FilterOption {
    value: string;
    label: string;
    icon?: IconType;
}

export const ASSISTANT_CATEGORIES = ['sales', 'productivity', 'marketing', 'innovation', 'leadership', 'strategy', 'automation', 'content', 'analysis', 'growth'] as const;

export const categoryOptions: FilterOption[] = [
    { value: 'sales', label: 'Ventas', icon: MdOutlineAttachMoney },
    { value: 'productivity', label: 'Productividad', icon: MdSpeed },
    { value: 'marketing', label: 'Marketing', icon: MdCampaign },
    { value: 'innovation', label: 'Innovación', icon: MdLightbulb },
    { value: 'leadership', label: 'Liderazgo', icon: MdGroups },
    { value: 'strategy', label: 'Estrategia', icon: HiOutlineSparkles },
    { value: 'automation', label: 'Automatización', icon: MdOutlineTimer },
    { value: 'content', label: 'Contenido', icon: HiOutlineDocumentText },
    { value: 'analysis', label: 'Análisis', icon: MdShowChart },
    { value: 'growth', label: 'Crecimiento', icon: MdTrendingUp },
];

export const categoryIcons: Record<string, IconType> = {
    sales: MdOutlineAttachMoney,
    productivity: MdSpeed,
    marketing: MdCampaign,
    innovation: MdLightbulb,
    leadership: MdGroups,
    strategy: HiOutlineSparkles,
    automation: MdOutlineTimer,
    content: HiOutlineDocumentText,
    analysis: MdShowChart,
    growth: MdTrendingUp,
};

export const ASSISTANT_DIFFICULTIES = ['basic', 'intermediate', 'advanced'] as const;

export const difficultyOptions: FilterOption[] = [
    { value: 'basic', label: 'Básico', icon: IoShield },
    { value: 'intermediate', label: 'Intermedio', icon: IoShieldHalfSharp },
    { value: 'advanced', label: 'Avanzado', icon: IoShieldCheckmark },
];

export const difficultyIcons: Record<string, IconType> = {
    basic: IoShield,
    intermediate: IoShieldHalfSharp,
    advanced: IoShieldCheckmark,
};

export const difficultyColors: Record<string, string> = {
    basic: 'text-green-400 border-green-400/50 bg-green-400/10',
    intermediate: 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10',
    advanced: 'text-stannum border-stannum/50 bg-stannum/10',
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
    { value: 'chatgpt', label: 'ChatGPT' },
    { value: 'claude', label: 'Claude' },
    { value: 'gemini', label: 'Gemini' },
    { value: 'perplexity', label: 'Perplexity' },
    { value: 'poe', label: 'Poe' },
    { value: 'other', label: 'Otro' },
];

export const platformIcons: Record<string, IconType | null> = {
    chatgpt: SiOpenai,
    claude: SiClaude,
    perplexity: SiPerplexity,
    gemini: null,
    poe: null,
    'notion-ai': null,
    midjourney: null,
    'gpt-4': SiOpenai,
    'custom-gpt': SiOpenai,
    other: null,
};

export const ASSISTANT_SORT_OPTIONS = ['popular', 'newest', 'mostUsed', 'mostLiked', 'mostViewed'] as const;

export const sortByOptions: FilterOption[] = [
    { value: 'popular', label: 'Más populares', icon: TbFlame },
    { value: 'newest', label: 'Más recientes', icon: TbClock },
    { value: 'mostUsed', label: 'Más usados', icon: TbExternalLink },
    { value: 'mostLiked', label: 'Más valorados', icon: TbThumbUp },
];

export const getCategoryIcon = (category: string): IconType | undefined => categoryIcons[category];
export const getDifficultyIcon = (difficulty: string): IconType | undefined => difficultyIcons[difficulty];
export const getDifficultyColor = (difficulty: string): string => difficultyColors[difficulty] || '';
export const getPlatformIcon = (platform: string): IconType | null => platformIcons[platform] || null;