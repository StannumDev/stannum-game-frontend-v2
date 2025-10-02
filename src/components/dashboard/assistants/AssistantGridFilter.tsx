'use client';

import { motion } from 'framer-motion';
import type { AssistantFilters } from '@/interfaces';
import { CrossIcon, BookmarkedIcon, ArrowDownIcon } from '@/icons';
import {
    MdOutlineAttachMoney,
    MdSpeed,
    MdCampaign,
    MdLightbulb,
    MdGroups,
    MdOutlineTimer,
    MdShowChart,
    MdTrendingUp
} from 'react-icons/md';
import {
    HiOutlineSparkles,
    HiOutlineDocumentText
} from 'react-icons/hi2';
import {
    IoShieldCheckmark,
    IoShieldHalfSharp,
    IoShield
} from 'react-icons/io5';
import type { IconType } from 'react-icons';
import { useState } from 'react';

interface Props {
    filters: AssistantFilters;
    onFilterChange: (key: keyof AssistantFilters, value: string) => void;
    onClearFilters: () => void;
}

interface FilterOption {
    value: string;
    label: string;
    icon: IconType;
}

const categories: FilterOption[] = [
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

const difficulties: FilterOption[] = [
    { value: 'basic', label: 'Básico', icon: IoShield },
    { value: 'intermediate', label: 'Intermedio', icon: IoShieldHalfSharp },
    { value: 'advanced', label: 'Avanzado', icon: IoShieldCheckmark },
];

const platforms = [
    { value: 'chatgpt', label: 'ChatGPT' },
    { value: 'claude', label: 'Claude' },
    { value: 'gemini', label: 'Gemini' },
    { value: 'perplexity', label: 'Perplexity' },
    { value: 'poe', label: 'Poe' },
];

export const AssistantsGridFilter = ({ filters, onFilterChange, onClearFilters }: Props) => {
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [isPlatformsOpen, setIsPlatformsOpen] = useState(false);

    const activeFiltersCount = [
        filters.category,
        filters.difficulty,
        filters.platforms,
        showFavoritesOnly,
    ].filter(Boolean).length;

    const toggleFilter = (key: keyof AssistantFilters, value: string) => {
        const currentValue = filters[key] as string | undefined;
        
        if (key === 'platforms') {
            const currentPlatforms = currentValue ? currentValue.split(',') : [];
            const newPlatforms = currentPlatforms.includes(value)
                ? currentPlatforms.filter(p => p !== value)
                : [...currentPlatforms, value];
            onFilterChange(key, newPlatforms.join(','));
        } else {
            onFilterChange(key, currentValue === value ? '' : value);
        }
    };

    const isFilterActive = (key: keyof AssistantFilters, value: string): boolean => {
        const currentValue = filters[key] as string | undefined;
        if (!currentValue) return false;
        
        if (key === 'platforms') {
            return currentValue.split(',').includes(value);
        }
        return currentValue === value;
    };

    const selectedPlatformsCount = filters.platforms 
        ? filters.platforms.split(',').filter(Boolean).length 
        : 0;

    return (
        <section className="card">
            {/* Fila 1: Categorías */}
            <div className="flex items-center gap-2 pb-3 border-b border-card-light">
                <span className="text-xs text-card-lighter font-semibold shrink-0">Categoría:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = isFilterActive('category', cat.value);
                        return (
                            <motion.button
                                key={cat.value}
                                onClick={() => toggleFilter('category', cat.value)}
                                className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-all flex items-center gap-1.5 ${
                                    isActive
                                        ? 'bg-stannum/20 border-stannum text-stannum'
                                        : 'bg-card border-card-light hover:border-card-lighter'
                                }`}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Icon className="text-sm" />
                                {cat.label}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Fila 2: Dificultad + Plataformas + Favoritos + Limpiar */}
            <div className="flex items-center gap-4 pt-3 flex-wrap">
                {/* Dificultad */}
                <div className="flex items-center gap-2">
                    <span className="text-xs text-card-lighter font-semibold shrink-0">Dificultad:</span>
                    <div className="flex items-center gap-1.5">
                        {difficulties.map((diff) => {
                            const Icon = diff.icon;
                            const isActive = isFilterActive('difficulty', diff.value);
                            return (
                                <motion.button
                                    key={diff.value}
                                    onClick={() => toggleFilter('difficulty', diff.value)}
                                    className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-all flex items-center gap-1.5 ${
                                        isActive
                                            ? 'bg-stannum/20 border-stannum text-stannum'
                                            : 'bg-card border-card-light hover:border-card-lighter'
                                    }`}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon className="text-sm" />
                                    {diff.label}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Plataformas (Dropdown) */}
                <div className="relative">
                    <motion.button
                        onClick={() => setIsPlatformsOpen(!isPlatformsOpen)}
                        className={`px-3 py-1 rounded-md border text-xs font-medium transition-all flex items-center gap-2 ${
                            selectedPlatformsCount > 0
                                ? 'bg-stannum/20 border-stannum text-stannum'
                                : 'bg-card border-card-light hover:border-card-lighter'
                        }`}
                        whileTap={{ scale: 0.95 }}
                    >
                        Plataformas
                        {selectedPlatformsCount > 0 && (
                            <span className="px-1.5 py-0.5 bg-stannum text-card rounded-full text-xs font-bold">
                                {selectedPlatformsCount}
                            </span>
                        )}
                        <ArrowDownIcon className={`text-xs transition-transform ${isPlatformsOpen ? 'rotate-180' : ''}`} />
                    </motion.button>

                    {isPlatformsOpen && (
                        <>
                            <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setIsPlatformsOpen(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-full left-0 mt-2 bg-card border border-card-light rounded-lg shadow-lg p-2 z-20 min-w-[160px]"
                            >
                                {platforms.map((platform) => {
                                    const isActive = isFilterActive('platforms', platform.value);
                                    return (
                                        <button
                                            key={platform.value}
                                            onClick={() => toggleFilter('platforms', platform.value)}
                                            className={`w-full px-3 py-2 rounded-md text-xs font-medium transition-all text-left ${
                                                isActive
                                                    ? 'bg-stannum/20 text-stannum'
                                                    : 'hover:bg-card-light'
                                            }`}
                                        >
                                            {platform.label}
                                        </button>
                                    );
                                })}
                            </motion.div>
                        </>
                    )}
                </div>

                {/* Favoritos */}
                <motion.button
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className={`px-3 py-1 rounded-md border text-xs font-medium transition-all flex items-center gap-1.5 ${
                        showFavoritesOnly
                            ? 'bg-stannum/20 border-stannum text-stannum'
                            : 'bg-card border-card-light hover:border-card-lighter'
                    }`}
                    whileTap={{ scale: 0.95 }}
                >
                    <BookmarkedIcon />
                    Favoritos
                </motion.button>

                {/* Limpiar filtros */}
                {activeFiltersCount > 0 && (
                    <motion.button
                        onClick={() => {
                            setShowFavoritesOnly(false);
                            onClearFilters();
                        }}
                        className="ml-auto px-3 py-1 rounded-md border border-card-light text-xs font-medium hover:border-invalid hover:text-invalid transition-colors flex items-center gap-1.5"
                        whileTap={{ scale: 0.95 }}
                    >
                        <CrossIcon />
                        Limpiar ({activeFiltersCount})
                    </motion.button>
                )}
            </div>
        </section>
    );
};