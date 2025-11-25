'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CrossIcon, BookmarkedIcon, SearchIcon, FilterIcon } from '@/icons';
import { BankFilterDropdown, STANNUMIcon } from '@/components';
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
    const [showVerifiedOnly, setShowVerifiedOnly] = useState(filters.stannumVerifiedOnly || false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

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
        <>
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
                    <div className="flex md:hidden gap-2">
                        <button
                            type="button"
                            onClick={() => setIsFiltersOpen(true)}
                            className={`flex-1 px-3 h-10 rounded-md border text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${ activeFiltersCount > 0 ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-card-lighter'}`}
                        >
                            <FilterIcon className="text-lg" />
                            Filtros
                            {activeFiltersCount > 0 && <span className="px-1.5 py-0.5 bg-stannum text-card rounded-full text-xs font-bold">{activeFiltersCount}</span>}
                        </button>
                    </div>
                    <div className="hidden md:block shrink-0">
                        <BankFilterDropdown
                            label="Ordenar por"
                            placeholder="Selecciona orden"
                            options={sortByOptions}
                            value={filters.sortBy || 'popular'}
                            onChange={(v) => onFilterChange('sortBy', v)}
                        />
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-3 flex-wrap">
                    <BankFilterDropdown
                        label="Categoría"
                        placeholder="Selecciona una categoría"
                        options={categoryOptions}
                        value={filters.category || ''}
                        onChange={(v) => onFilterChange('category', v)}
                    />
                    <BankFilterDropdown
                        label="Complejidad"
                        placeholder="Selecciona la complejidad"
                        options={difficultyOptions}
                        value={filters.difficulty || ''}
                        onChange={(v) => onFilterChange('difficulty', v)}
                    />
                    <BankFilterDropdown
                        label="Plataformas"
                        placeholder="Selecciona una o varias"
                        options={platformOptions}
                        value={filters.platforms || ''}
                        onChange={(v) => onFilterChange('platforms', v)}
                        multi
                    />
                    <button
                        type="button"
                        onClick={handleToggleVerified}
                        className={`px-3 h-10 rounded-md border text-sm font-medium transition-200 flex items-center gap-1.5 ${ showVerifiedOnly ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-card-lighter'}`}
                    >
                        <STANNUMIcon className={`size-3 ${showVerifiedOnly ? 'fill-stannum' : 'fill-white'} transition-200`} />
                        Verificados
                    </button>
                    <button
                        type="button"
                        onClick={handleToggleFavorites}
                        className={`px-3 h-10 rounded-md border text-sm font-medium transition-all flex items-center gap-1.5 ${ showFavoritesOnly ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-card-lighter'}`}
                    >
                        <BookmarkedIcon />
                        Favoritos
                    </button>
                    {activeFiltersCount > 0 &&
                        <button
                            type="button"
                            onClick={handleClearAll}
                            className="ml-auto px-3 h-10 rounded-md border border-card-light text-sm font-medium hover:border-invalid hover:text-invalid transition-colors flex items-center gap-1.5"
                        >
                            <CrossIcon />
                            Limpiar ({activeFiltersCount})
                        </button>
                    }
                </div>
            </section>
            <AnimatePresence>
                {isFiltersOpen && <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsFiltersOpen(false)}
                        className="md:hidden fixed inset-0 bg-black/60 z-[99999999] backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-card-light z-[999999999] rounded-t-2xl max-h-[85vh] overflow-y-auto"
                    >
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between pb-4 border-b border-card-light">
                                <h3 className="text-lg font-bold">Filtros</h3>
                                <button
                                    type="button"
                                    onClick={() => setIsFiltersOpen(false)}
                                    className="p-2 rounded-lg hover:bg-card-light transition-colors"
                                >
                                    <CrossIcon className="text-xl" />
                                </button>
                            </div>
                            <BankFilterDropdown
                                label="Ordenar por"
                                placeholder="Selecciona orden"
                                options={sortByOptions}
                                value={filters.sortBy || 'popular'}
                                onChange={(v) => onFilterChange('sortBy', v)}
                            />
                            <BankFilterDropdown
                                label="Categoría"
                                placeholder="Selecciona una categoría"
                                options={categoryOptions}
                                value={filters.category || ''}
                                onChange={(v) => onFilterChange('category', v)}
                            />
                            <BankFilterDropdown
                                label="Complejidad"
                                placeholder="Selecciona la complejidad"
                                options={difficultyOptions}
                                value={filters.difficulty || ''}
                                onChange={(v) => onFilterChange('difficulty', v)}
                            />
                            <BankFilterDropdown
                                label="Plataformas"
                                placeholder="Selecciona una o varias"
                                options={platformOptions}
                                value={filters.platforms || ''}
                                onChange={(v) => onFilterChange('platforms', v)}
                                multi
                            />
                            <button
                                type="button"
                                onClick={handleToggleVerified}
                                className={`w-full px-3 h-10 rounded-md border text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${ showVerifiedOnly ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-card-lighter'}`}
                            >
                                <STANNUMIcon className={`size-3 ${showVerifiedOnly ? 'fill-stannum' : 'fill-white'} transition-200`} />
                                Verificados
                            </button>
                            <button
                                type="button"
                                onClick={handleToggleFavorites}
                                className={`w-full px-3 h-10 rounded-md border text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${ showFavoritesOnly ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-card-lighter'}`}
                            >
                                <BookmarkedIcon />
                                Favoritos
                            </button>
                            <div className="flex gap-3 pt-4 border-t border-card-light">
                                {activeFiltersCount > 0 &&
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleClearAll();
                                            setIsFiltersOpen(false);
                                        }}
                                        className="flex-1 px-4 py-3 bg-card border border-card-light text-card-lightest rounded-lg text-sm font-semibold hover:bg-card-light transition-colors"
                                    >
                                        Limpiar filtros
                                    </button>
                                }
                                <button
                                    type="button"
                                    onClick={() => setIsFiltersOpen(false)}
                                    className="flex-1 px-4 py-3 bg-stannum text-card rounded-lg text-sm font-semibold hover:bg-stannum/90 transition-colors"
                                >
                                    Aplicar filtros
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </> }
            </AnimatePresence>
        </>
    );
};