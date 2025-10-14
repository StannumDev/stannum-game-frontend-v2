'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { getMyAssistants } from '@/services';
import { errorHandler } from '@/helpers';
import { MyAssistantCard, CreateAssistantModal, LoadingScreen } from '@/components';
import type { AssistantVisibility, MyAssistantCard as MyAssistantCardType, MyAssistantsResponse } from '@/interfaces';
import { PlusIcon } from '@/icons';

export const MyAssistantsGrid = () => {
    const [assistants, setAssistants] = useState<MyAssistantCardType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [filters, setFilters] = useState<{ page: number; limit: number }>({ page: 1, limit: 20 });
    const [hasMore, setHasMore] = useState(false);

    const fetchAssistants = useCallback(async () => {
        setIsLoading(true);
        try {
            const response: MyAssistantsResponse = await getMyAssistants(filters.page, filters.limit);
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

    const handleLoadMore = () => {
        setFilters((prev) => ({
            ...prev,
            page: prev.page + 1,
        }));
    };

    const handleAssistantDeleted = (assistantId: string) => setAssistants((prev) => prev.filter((a) => a.id !== assistantId));

    const handleVisibilityChanged = (assistantId: string, newVisibility: string) => {
        setAssistants((prev) =>
            prev.map((a) =>
                a.id === assistantId ? { ...a, visibility: newVisibility as AssistantVisibility } : a
            )
        );
    };

    return (
        <>
            <div className="w-full grow flex flex-col gap-4">
                <section className="card">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="title-2">Mis Asistentes</h1>
                            <p className="subtitle-1">Administra tus asistentes de IA creados para la comunidad STANNUM</p>
                        </div>
                        <button onClick={() => setIsCreateModalOpen(true)} className="shrink-0 px-4 py-2 bg-stannum rounded-lg font-semibold hover:bg-stannum/90 text-card transition-200 flex items-center gap-2">
                            <PlusIcon className="text-lg" />
                            <span className="hidden sm:inline">Crear Asistente</span>
                        </button>
                    </div>
                </section>
                {isLoading && assistants.length === 0 && <LoadingScreen />}
                {!isLoading && assistants.length === 0 &&
                    <motion.div
                        className="card grow flex flex-col justify-center items-center text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <HiOutlineSparkles className="text-6xl text-card-lighter mb-4" />
                        <h3 className="text-xl font-bold mb-2">Aún no creaste ningún asistente</h3>
                        <p className="text-card-lightest max-w-md mb-4">Comparte tu conocimiento con la comunidad STANNUM creando asistentes especializados.</p>
                        <motion.button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-6 py-3 bg-stannum text-card rounded-lg font-semibold hover:bg-stannum/90 transition-colors flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <PlusIcon className="text-lg" />
                            Crear mi primer asistente
                        </motion.button>
                    </motion.div>
                }
                {!isLoading && assistants.length > 0 &&
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`my-assistants-${filters.page}`}
                            className="columns-1 md:columns-2 xl:columns-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {assistants.map((assistant) => (
                                <MyAssistantCard
                                    key={assistant.id}
                                    assistant={assistant}
                                    onDeleted={handleAssistantDeleted}
                                    onVisibilityChanged={handleVisibilityChanged}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                }
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
            <CreateAssistantModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={fetchAssistants}
            />
        </>
    );
};