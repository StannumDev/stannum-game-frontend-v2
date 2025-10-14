'use client';

import { useState, useEffect } from 'react';
import { CrossIcon, BookmarkedIcon, SearchIcon } from '@/icons';
import { PromptFilterDropdown } from '@/components';
import { categoryOptions, difficultyOptions, platformOptions, sortByOptions } from '@/helpers/prompts';
import type { PromptFilters } from '@/interfaces';

interface Props {
    filters: PromptFilters;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onFilterChange: (key: keyof PromptFilters, value: string | number | boolean) => void;
    onClearFilters: () => void;
}

export const PromptsGridFilter = ({ filters, searchTerm, onSearchChange, onFilterChange, onClearFilters }: Props) => {
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(filters.favoritesOnly || false);
    const [showVerifiedOnly, setShowVerifiedOnly] = useState(filters.stannumVerifiedOnly || false);

    useEffect(() => {
        setShowFavoritesOnly(filters.favoritesOnly || false);
        setShowVerifiedOnly(filters.stannumVerifiedOnly || false);
    }, [filters.favoritesOnly, filters.stannumVerifiedOnly]);

    const activeFiltersCount = [
        filters.category,
        filters.difficulty,
        filters.platforms,
        filters.favoritesOnly,
        filters.stannumVerifiedOnly
    ].filter(Boolean).length;

    const handleToggleFavorites = () => {
        const newValue = !showFavoritesOnly;
        setShowFavoritesOnly(newValue);
        onFilterChange('favoritesOnly', newValue);
    };

    const handleToggleVerified = () => {
        const newValue = !showVerifiedOnly;
        setShowVerifiedOnly(newValue);
        onFilterChange('stannumVerifiedOnly', newValue);
    };

    const handleClearAll = () => {
        setShowFavoritesOnly(false);
        setShowVerifiedOnly(false);
        onClearFilters();
    };

    return (
        <section className="card space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-card-lighter size-4" />
                    <input
                        type="text"
                        placeholder="Buscar prompts..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-9 pr-3 h-10 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum transition-200"
                    />
                </div>
                <div className="shrink-0">
                    <PromptFilterDropdown
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
                <PromptFilterDropdown
                    label="Categoría"
                    placeholder="Selecciona una categoría"
                    options={categoryOptions}
                    value={filters.category || ''}
                    onChange={(v) => onFilterChange('category', v)}
                    multi={false}
                />
                <PromptFilterDropdown
                    label="Complejidad"
                    placeholder="Selecciona la complejidad"
                    options={difficultyOptions}
                    value={filters.difficulty || ''}
                    onChange={(v) => onFilterChange('difficulty', v)}
                    multi={false}
                />
                <PromptFilterDropdown
                    label="Plataformas"
                    placeholder="Selecciona una o varias"
                    options={platformOptions}
                    value={filters.platforms || ''}
                    onChange={(v) => onFilterChange('platforms', v)}
                    multi
                />
                <button
                    type='button'
                    onClick={handleToggleFavorites} 
                    className={`px-3 h-10 rounded-md border text-sm font-medium transition-all flex items-center gap-1.5 ${showFavoritesOnly ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-card-lighter'}`}
                >
                    <BookmarkedIcon />
                    Favoritos
                </button>
                <button
                    type='button'
                    onClick={handleToggleVerified} 
                    className={`px-3 h-10 rounded-md border text-sm font-medium transition-all flex items-center gap-1.5 ${showVerifiedOnly ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-card-lighter'}`}
                >
                    ✓ Verificados
                </button>
                {activeFiltersCount > 0 &&
                    <button
                        type='button'
                        onClick={handleClearAll}
                        className="ml-auto px-3 h-10 rounded-md border border-card-light text-sm font-medium hover:border-invalid hover:text-invalid transition-colors flex items-center gap-1.5"
                    >
                        <CrossIcon />
                        Limpiar ({activeFiltersCount})
                    </button>
                }
            </div>
        </section>
    );
};