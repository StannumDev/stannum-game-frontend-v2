'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllAssistants } from '@/services';
import { errorHandler } from '@/helpers';
import type { AssistantCard, AssistantFilters, AssistantsResponse } from '@/interfaces';
import { AssistantCard as AssistantCardComponent } from './AssistantCard';
import { AssistantsGridFilter } from './AssistantGridFilter';
import { SpinnerIcon, SearchIcon } from '@/icons';
import { 
    IoSparkles,
    IoFlame,
    IoTrendingUp,
    IoThumbsUp 
} from 'react-icons/io5';
import { 
    HiOutlineSparkles 
} from 'react-icons/hi2';

// 🎯 MOCK DATA - Tres asistentes hardcodeados (uno por dificultad)
const MOCK_ASSISTANTS: AssistantCard[] = [
    {
        id: 'mock-1',
        title: 'Asistente de Ventas B2B',
        description: 'Tu copiloto para cerrar más deals. Genera scripts de venta, maneja objeciones y crea seguimientos personalizados que convierten.',
        assistantUrl: 'https://chat.openai.com/g/g-example-sales',
        category: 'sales',
        difficulty: 'basic',
        platforms: ['chatgpt', 'claude'],
        tags: ['ventas', 'b2b', 'scripts', 'objeciones'],
        metrics: {
            clicks: 156,
            likes: 42,
            favorites: 28,
        },
        author: {
            username: 'martinmerlini',
            profilePhotoUrl: true,
        },
        createdAt: new Date('2025-09-15'),
        userActions: {
            hasLiked: false,
            hasFavorited: false,
        },
    },
    {
        id: 'mock-2',
        title: 'Growth Hacker Estratégico',
        description: 'Diseña experimentos de crecimiento, analiza métricas clave y te ayuda a escalar tu producto con estrategias data-driven. Ideal para founders y growth leads.',
        assistantUrl: 'https://claude.ai/chat/example-growth',
        category: 'growth',
        difficulty: 'intermediate',
        platforms: ['claude', 'gemini'],
        tags: ['growth', 'experimentos', 'métricas', 'scaling', 'producto'],
        metrics: {
            clicks: 89,
            likes: 67,
            favorites: 34,
        },
        author: {
            username: 'nicodarelli',
            profilePhotoUrl: false,
        },
        createdAt: new Date('2025-09-20'),
        userActions: {
            hasLiked: false,
            hasFavorited: false,
        },
    },
    {
        id: 'mock-3',
        title: 'AI Strategy Architect',
        description: 'Consultor experto en implementación de IA empresarial. Evalúa casos de uso, diseña arquitecturas técnicas, calcula ROI y arma roadmaps de adopción para equipos enterprise.',
        assistantUrl: 'https://poe.com/example-strategy',
        category: 'strategy',
        difficulty: 'advanced',
        platforms: ['chatgpt', 'claude', 'gemini', 'poe'],
        tags: ['ia', 'estrategia', 'enterprise', 'roi', 'transformación digital', 'arquitectura'],
        metrics: {
            clicks: 234,
            likes: 128,
            favorites: 92,
        },
        author: {
            username: 'aledelazerda',
            profilePhotoUrl: true,
        },
        createdAt: new Date('2025-09-10'),
        userActions: {
            hasLiked: true,
            hasFavorited: true,
        },
    },
];

export const AssistantsGrid = () => {
    const [assistants, setAssistants] = useState<AssistantCard[]>(MOCK_ASSISTANTS);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState<AssistantFilters>({
        sortBy: 'popular',
        page: 1,
        limit: 20,
    });
    const [hasMore, setHasMore] = useState(false);

    const fetchAssistants = useCallback(async () => {
        // 🎯 MODO MOCK: Comentado hasta que conectes con el backend real
        // setIsLoading(true);
        // try {
        //     const response: AssistantsResponse = await getAllAssistants(filters);
        //     setAssistants(response.data.assistants);
        //     setHasMore(response.data.pagination.hasNextPage);
        // } catch (error) {
        //     errorHandler(error);
        // } finally {
        //     setIsLoading(false);
        // }
        
        // Simulación de carga para testing
        setIsLoading(true);
        setTimeout(() => {
            setAssistants(MOCK_ASSISTANTS);
            setIsLoading(false);
        }, 500);
    }, [filters]);

    useEffect(() => {
        fetchAssistants();
    }, [fetchAssistants]);

    const handleFilterChange = (key: keyof AssistantFilters, value: string | number) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
            page: 1, // Reset page cuando cambia un filtro
        }));
    };

    const handleClearFilters = () => {
        setFilters({
            sortBy: 'popular',
            page: 1,
            limit: 20,
        });
    };

    const handleLoadMore = () => {
        setFilters((prev) => ({
            ...prev,
            page: (prev.page || 1) + 1,
        }));
    };

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Header + Buscador */}
            <section className="card">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="title-2 mb-2 flex items-center gap-2">
                            <HiOutlineSparkles className="text-stannum" />
                            Arsenal de Asistentes IA
                        </h1>
                        <p className="text-sm text-card-lightest">
                            Descubre y utiliza asistentes personalizados creados por la comunidad STANNUM
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            value={filters.sortBy}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            className="px-3 py-2 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum transition-colors"
                        >
                            <option value="popular">
                                <IoFlame /> Más populares
                            </option>
                            <option value="newest">
                                <IoSparkles /> Más recientes
                            </option>
                            <option value="mostUsed">
                                <IoTrendingUp /> Más usados
                            </option>
                            <option value="mostLiked">
                                <IoThumbsUp /> Más valorados
                            </option>
                        </select>
                    </div>
                </div>

                {/* Buscador simple */}
                <div className="mt-4 relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-card-lighter text-lg" />
                    <input
                        type="text"
                        placeholder="Buscar asistentes..."
                        className="w-full pl-10 pr-4 py-2.5 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum transition-colors"
                        onChange={(e) => {
                            const value = e.target.value;
                            // Debounce simple con timeout
                            const timeoutId = setTimeout(() => {
                                handleFilterChange('search', value);
                            }, 500);
                            return () => clearTimeout(timeoutId);
                        }}
                    />
                </div>
            </section>

            {/* Filtros Avanzados */}
            <AssistantsGridFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
            />

            {/* Loading State */}
            {isLoading && assistants.length === 0 && (
                <div className="min-h-96 flex justify-center items-center">
                    <SpinnerIcon className="animate-spin size-8 text-stannum" />
                </div>
            )}

            {/* Empty State */}
            {!isLoading && assistants.length === 0 && (
                <motion.div
                    className="card min-h-96 flex flex-col justify-center items-center text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <HiOutlineSparkles className="text-6xl text-card-lighter mb-4" />
                    <h3 className="text-xl font-bold mb-2">No se encontraron asistentes</h3>
                    <p className="text-card-lightest max-w-md">
                        Prueba ajustando los filtros o sé el primero en crear un asistente para la comunidad.
                    </p>
                </motion.div>
            )}

            {/* Masonry Grid con Tailwind columns */}
            {!isLoading && assistants.length > 0 && (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`assistants-${filters.page}-${filters.sortBy}`}
                        className="columns-1 md:columns-2 xl:columns-3 gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {assistants.map((assistant) => (
                            <AssistantCardComponent
                                key={assistant.id}
                                assistant={assistant}
                                onUpdate={fetchAssistants}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            )}

            {/* Load More */}
            {hasMore && !isLoading && (
                <div className="flex justify-center">
                    <motion.button
                        onClick={handleLoadMore}
                        className="px-6 py-3 bg-stannum/20 border border-stannum text-stannum rounded-lg font-semibold hover:bg-stannum/30 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Cargar más asistentes
                    </motion.button>
                </div>
            )}
        </div>
    );
};