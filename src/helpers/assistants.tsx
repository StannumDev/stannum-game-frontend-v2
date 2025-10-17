import type { IconType } from 'react-icons';
import { MdOutlineAttachMoney, MdSpeed, MdCampaign, MdLightbulb, MdGroups, MdOutlineTimer, MdShowChart, MdTrendingUp } from 'react-icons/md';
import { HiOutlineSparkles, HiOutlineDocumentText } from 'react-icons/hi2';
import { IoShieldCheckmark, IoShieldHalfSharp, IoShield } from 'react-icons/io5';
import { TbFlame, TbClock, TbThumbUp, TbExternalLink } from 'react-icons/tb';
import { SiOpenai, SiClaude, SiPerplexity, SiPoe } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';

export interface FilterOption {
    value: string;
    label: string;
    icon?: IconType;
    disabled?: boolean;
}

export const ASSISTANT_CATEGORIES = ['sales', 'productivity', 'marketing', 'innovation', 'leadership', 'strategy', 'automation', 'content', 'analysis', 'growth'] as const;

export const categoryOptions: Array<FilterOption> = [
    { value: 'analysis', label: 'Análisis', icon: MdShowChart },
    { value: 'automation', label: 'Automatización', icon: MdOutlineTimer },
    { value: 'content', label: 'Contenido', icon: HiOutlineDocumentText },
    { value: 'growth', label: 'Crecimiento', icon: MdTrendingUp },
    { value: 'strategy', label: 'Estrategia', icon: HiOutlineSparkles },
    { value: 'innovation', label: 'Innovación', icon: MdLightbulb },
    { value: 'leadership', label: 'Liderazgo', icon: MdGroups },
    { value: 'marketing', label: 'Marketing', icon: MdCampaign },
    { value: 'productivity', label: 'Productividad', icon: MdSpeed },
    { value: 'sales', label: 'Ventas', icon: MdOutlineAttachMoney },
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

export const difficultyOptions: Array<FilterOption> = [
    { value: 'basic', label: 'Básico', icon: IoShield },
    { value: 'intermediate', label: 'Intermedio', icon: IoShieldHalfSharp },
    { value: 'advanced', label: 'Avanzado', icon: IoShieldCheckmark },
];

export const difficultyIcons: Record<string, IconType> = {
    basic: IoShield,
    intermediate: IoShieldHalfSharp,
    advanced: IoShieldCheckmark,
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
    { value: 'chatgpt', label: 'ChatGPT', icon: SiOpenai },
    { value: 'poe', label: 'Poe', icon: SiPoe },
    { value: 'claude', label: 'Claude', icon: SiClaude, disabled: true },
    { value: 'gemini', label: 'Gemini', icon: FcGoogle, disabled: true },
    { value: 'perplexity', label: 'Perplexity', icon: SiPerplexity, disabled: true },
    { value: 'other', label: 'Otro', icon: HiOutlineSparkles },
];

export const ASSISTANT_SORT_OPTIONS = ['popular', 'newest', 'mostUsed', 'mostLiked', 'mostViewed'] as const;

export const sortByOptions: Array<FilterOption> = [
    { value: 'popular', label: 'Más populares', icon: TbFlame },
    { value: 'newest', label: 'Más recientes', icon: TbClock },
    { value: 'mostUsed', label: 'Más usados', icon: TbExternalLink },
    { value: 'mostLiked', label: 'Más valorados', icon: TbThumbUp },
];