'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CrossIcon, BookmarkedIcon, SearchIcon } from '@/icons';
import { AssistantFilterDropdown } from '@/components';
import { categoryOptions, difficultyOptions, platformOptions, sortByOptions } from '@/helpers/assistants';
import type { AssistantFilters } from '@/interfaces';

interface Props {
    filters: AssistantFilters;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onFilterChange: (key: keyof AssistantFilters, value: string | number | boolean) => void;
    onClearFilters: () => void;
}

export const AssistantsGridFilter = ({ filters, searchTerm, onSearchChange, onFilterChange, onClearFilters }: Props) => {
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(filters.favoritesOnly || false);

    useEffect(() => {
        setShowFavoritesOnly(filters.favoritesOnly || false);
    }, [filters.favoritesOnly]);

    const activeFiltersCount = [
        filters.category,
        filters.difficulty,
        filters.platforms,
        filters.favoritesOnly
    ].filter(Boolean).length;

    const handleToggleFavorites = () => {
        const newValue = !showFavoritesOnly;
        setShowFavoritesOnly(newValue);
        onFilterChange('favoritesOnly', newValue);
    };

    const handleClearAll = () => {
        setShowFavoritesOnly(false);
        onClearFilters();
    };

    return (
        <section className="card space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-card-lighter size-4" />
                    <input
                        type="text"
                        placeholder="Buscar asistentes..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-9 pr-3 h-10 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum transition-200"
                    />
                </div>
                <div className="shrink-0">
                    <AssistantFilterDropdown
                        label="Ordenar por"
                        placeholder="Selecciona orden"
                        options={sortByOptions}
                        value={filters.sortBy || 'popular'}
                        onChange={(v) => onFilterChange('sortBy', v)}
                        multi={false}
                    />
                </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
                <AssistantFilterDropdown
                    label="Categoría"
                    placeholder="Selecciona una categoría"
                    options={categoryOptions}
                    value={filters.category || ''}
                    onChange={(v) => onFilterChange('category', v)}
                    multi={false}
                />
                <AssistantFilterDropdown
                    label="Complejidad"
                    placeholder="Selecciona la complejidad"
                    options={difficultyOptions}
                    value={filters.difficulty || ''}
                    onChange={(v) => onFilterChange('difficulty', v)}
                    multi={false}
                />
                <AssistantFilterDropdown
                    label="Plataformas"
                    placeholder="Selecciona una o varias"
                    options={platformOptions}
                    value={filters.platforms || ''}
                    onChange={(v) => onFilterChange('platforms', v)}
                    multi
                />
                <button onClick={handleToggleFavorites} className={`px-3 h-10 rounded-md border text-sm font-medium transition-all flex items-center gap-1.5 ${showFavoritesOnly ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-card-lighter'}`}>
                    <BookmarkedIcon />
                    Favoritos
                </button>
                {activeFiltersCount > 0 &&
                    <motion.button
                        onClick={handleClearAll}
                        className="ml-auto px-3 h-10 rounded-md border border-card-light text-sm font-medium hover:border-invalid hover:text-invalid transition-colors flex items-center gap-1.5"
                        whileTap={{ scale: 0.95 }}
                    >
                        <CrossIcon />
                        Limpiar ({activeFiltersCount})
                    </motion.button>
                }
            </div>
        </section>
    );
};