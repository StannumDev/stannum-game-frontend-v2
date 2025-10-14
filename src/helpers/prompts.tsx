import type { IconType } from 'react-icons';
import { HiOutlineCurrencyDollar, HiOutlineLightBulb, HiOutlineMegaphone, HiOutlineRocketLaunch, HiOutlineUserGroup, HiOutlineChartBar, HiOutlineCog, HiOutlineDocumentText, HiOutlineBeaker, HiOutlineArrowTrendingUp } from 'react-icons/hi2';
import { TbSparkles, TbFlame, TbRocket } from 'react-icons/tb';
import { SiOpenai, SiGoogle, SiPerplexity } from 'react-icons/si';
import { RiRobot2Line } from 'react-icons/ri';

export const PROMPT_CATEGORIES = [ 'sales', 'productivity', 'marketing', 'innovation', 'leadership', 'strategy', 'automation', 'content', 'analysis', 'growth' ] as const;
export const PROMPT_DIFFICULTIES = ['basic', 'intermediate', 'advanced'] as const;
export const PROMPT_PLATFORMS = [ 'chatgpt', 'claude', 'gemini', 'poe', 'perplexity', 'other' ] as const;

export const categoryIcons: Record<typeof PROMPT_CATEGORIES[number], IconType> = {
    sales: HiOutlineCurrencyDollar,
    productivity: HiOutlineLightBulb,
    marketing: HiOutlineMegaphone,
    innovation: HiOutlineRocketLaunch,
    leadership: HiOutlineUserGroup,
    strategy: HiOutlineChartBar,
    automation: HiOutlineCog,
    content: HiOutlineDocumentText,
    analysis: HiOutlineBeaker,
    growth: HiOutlineArrowTrendingUp
};

export const difficultyIcons: Record<typeof PROMPT_DIFFICULTIES[number], IconType> = {
    basic: TbSparkles,
    intermediate: TbFlame,
    advanced: TbRocket
};

export const categoryOptions = [
    { value: 'sales', label: 'Ventas', icon: HiOutlineCurrencyDollar },
    { value: 'productivity', label: 'Productividad', icon: HiOutlineLightBulb },
    { value: 'marketing', label: 'Marketing', icon: HiOutlineMegaphone },
    { value: 'innovation', label: 'Innovación', icon: HiOutlineRocketLaunch },
    { value: 'leadership', label: 'Liderazgo', icon: HiOutlineUserGroup },
    { value: 'strategy', label: 'Estrategia', icon: HiOutlineChartBar },
    { value: 'automation', label: 'Automatización', icon: HiOutlineCog },
    { value: 'content', label: 'Contenido', icon: HiOutlineDocumentText },
    { value: 'analysis', label: 'Análisis', icon: HiOutlineBeaker },
    { value: 'growth', label: 'Crecimiento', icon: HiOutlineArrowTrendingUp }
];

export const difficultyOptions = [
    { value: 'basic', label: 'Básico', icon: TbSparkles },
    { value: 'intermediate', label: 'Intermedio', icon: TbFlame },
    { value: 'advanced', label: 'Avanzado', icon: TbRocket }
];

export const platformOptions = [
    { value: 'chatgpt', label: 'ChatGPT', icon: SiOpenai },
    { value: 'claude', label: 'Claude', icon: RiRobot2Line },
    { value: 'gemini', label: 'Gemini', icon: SiGoogle },
    { value: 'poe', label: 'Poe', icon: RiRobot2Line },
    { value: 'perplexity', label: 'Perplexity', icon: SiPerplexity },
    { value: 'other', label: 'Otro', icon: RiRobot2Line }
];

export const sortByOptions = [
    { value: 'popular', label: 'Más populares' },
    { value: 'newest', label: 'Más recientes' },
    { value: 'mostCopied', label: 'Más copiados' },
    { value: 'mostLiked', label: 'Más valorados' },
    { value: 'mostViewed', label: 'Más vistos' },
    { value: 'verified', label: 'Verificados' }
];