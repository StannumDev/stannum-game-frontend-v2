'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineFolder, HiOutlineSparkles, HiPlus } from 'react-icons/hi2';
import { getAllAssistants } from '@/services';
import { errorHandler } from '@/helpers';
import type { AssistantCard as AssistantCardType, AssistantFilters, AssistantsResponse } from '@/interfaces';
import { AssistantCard, AssistantsGridFilter, CreateAssistantModal, LoadingScreen } from '@/components';
import Link from 'next/link';

export const AssistantsGrid = () => {
    const [assistants, setAssistants] = useState<AssistantCardType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [filters, setFilters] = useState<AssistantFilters>({
        sortBy: 'popular',
        page: 1,
        limit: 20,
    });
    const [hasMore, setHasMore] = useState(false);

    const fetchAssistants = useCallback(async () => {
        setIsLoading(true);
        try {
            const response: AssistantsResponse = await getAllAssistants(filters);
            console.log(response.data.assistants)
            setAssistants(response.data.assistants);
            setHasMore(response.data.pagination.hasNextPage);
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchAssistants();
    }, [fetchAssistants]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilters((prev) => {
                const newFilters = { ...prev, page: 1 };
                if (searchTerm.trim().length >= 2) {
                    newFilters.search = searchTerm.trim();
                } else {
                    delete newFilters.search;
                }
                
                return newFilters;
            });
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const handleFilterChange = (key: keyof AssistantFilters, value: string | number | boolean) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
            page: 1,
        }));
    };

    const handleClearFilters = () => {
        setSearchTerm('');
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
        <>
            <div className="w-full grow flex flex-col gap-4">
                <section className="card">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="title-2">Banco de Asistentes</h1>
                            <p className="subtitle-1">Descubre y utiliza asistentes personalizados creados por la comunidad STANNUM</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href="/dashboard/community/assistants/my-assistants">
                                <button className="shrink-0 px-4 py-2 bg-card border border-card-light rounded-lg font-semibold hover:bg-card-light text-card-lightest transition-200 flex items-center gap-2">
                                    <HiOutlineFolder className="text-lg"/>
                                    <span className="hidden sm:inline">Mis Asistentes</span>
                                </button>
                            </Link>
                            <button onClick={() => setIsCreateModalOpen(true)} className="shrink-0 px-4 py-2 bg-stannum rounded-lg font-semibold hover:bg-stannum/90 text-card transition-200 flex items-center gap-2">
                                <HiPlus className="text-lg"/>
                                <span className="hidden sm:inline">Cargar Asistente</span>
                            </button>
                        </div>
                    </div>
                </section>
                <AssistantsGridFilter
                    filters={filters}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                />
                {isLoading && assistants.length === 0 && <LoadingScreen />}
                {!isLoading && assistants.length === 0 &&
                    <motion.div
                        className="card grow flex flex-col justify-center items-center text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <HiOutlineSparkles className="text-6xl text-card-lighter mb-4" />
                        <h3 className="text-xl font-bold mb-2">No se encontraron asistentes</h3>
                        <p className="text-card-lightest max-w-md mb-4">Prueba ajustando los filtros o sé el primero en crear un asistente para la comunidad.</p>
                        <motion.button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-6 py-3 bg-stannum text-card rounded-lg font-semibold hover:bg-stannum/90 transition-colors flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <HiPlus className="text-lg" />
                            Cargar asistente
                        </motion.button>
                    </motion.div>
                }
                {!isLoading && assistants.length > 0 &&
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`assistants-${filters.page}-${filters.sortBy}`}
                            className="columns-1 md:columns-2 xl:columns-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {assistants.map((assistant) => (
                                <AssistantCard
                                    key={assistant.id}
                                    assistant={assistant}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                }
                {hasMore && !isLoading &&
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
                }
            </div>
            <CreateAssistantModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={fetchAssistants}
            />
        </>
    );
};