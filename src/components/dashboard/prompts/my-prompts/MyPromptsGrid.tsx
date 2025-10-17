'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { getMyPrompts } from '@/services';
import { errorHandler } from '@/helpers';
import { MyPromptCard, CreatePromptModal, LoadingScreen, GoBackButton } from '@/components';
import type { PromptVisibility, MyPromptCard as MyPromptCardType, MyPromptsResponse } from '@/interfaces';
import { PlusIcon } from '@/icons';

export const MyPromptsGrid = () => {
    const [prompts, setPrompts] = useState<MyPromptCardType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [filters, setFilters] = useState<{ page: number; limit: number }>({ page: 1, limit: 20 });
    const [hasMore, setHasMore] = useState(false);

    const fetchPrompts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response: MyPromptsResponse = await getMyPrompts(filters.page, filters.limit);
            setPrompts(response.data.prompts);
            setHasMore(response.data.pagination.hasNextPage);
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchPrompts();
    }, [fetchPrompts]);

    const handleLoadMore = () => {
        setFilters((prev) => ({
            ...prev,
            page: prev.page + 1,
        }));
    };

    const handlePromptDeleted = (promptId: string) => {
        setPrompts((prev) => prev.filter((p) => p.id !== promptId));
    };

    const handleVisibilityChanged = (promptId: string, newVisibility: string) => {
        setPrompts((prev) =>
            prev.map((p) =>
                p.id === promptId ? { ...p, visibility: newVisibility as PromptVisibility } : p
            )
        );
    };

    const handlePromptUpdated = () => {
        fetchPrompts();
    };

    return (
        <>
            <div>
                <GoBackButton />
            </div>
            <div className="w-full grow flex flex-col gap-4">
                <section className="card">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="title-2">Mis Prompts</h1>
                            <p className="subtitle-1">Administra tus prompts creados para la comunidad STANNUM</p>
                        </div>
                        <button 
                            type="button"
                            onClick={() => setIsCreateModalOpen(true)} 
                            className="shrink-0 px-4 py-2 bg-stannum rounded-lg font-semibold hover:bg-stannum/90 text-card transition-200 flex items-center gap-2"
                        >
                            <PlusIcon className="text-lg" />
                            <span className="hidden sm:inline">Añadir Prompt</span>
                        </button>
                    </div>
                </section>

                {isLoading && prompts.length === 0 && <LoadingScreen />}

                {!isLoading && prompts.length === 0 && (
                    <motion.div
                        className="card grow flex flex-col justify-center items-center text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <HiOutlineSparkles className="text-6xl text-card-lighter mb-4" />
                        <h3 className="text-xl font-bold mb-2">Aún no creaste ningún prompt</h3>
                        <p className="opacity-75 max-w-md mb-4">
                            Comparte tu conocimiento con la comunidad STANNUM creando prompts especializados.
                        </p>
                        <button
                            type="button"
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-6 py-3 bg-stannum text-card rounded-lg font-semibold hover:bg-stannum/90 transition-colors flex items-center gap-2"
                        >
                            <PlusIcon className="text-lg" />
                            Añadir mi primer prompt
                        </button>
                    </motion.div>
                )}

                {!isLoading && prompts.length > 0 && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`my-prompts-${filters.page}`}
                            className="columns-1 md:columns-2 xl:columns-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {prompts.map((prompt) => (
                                <MyPromptCard
                                    key={prompt.id}
                                    prompt={prompt}
                                    onUpdated={handlePromptUpdated}
                                    onDeleted={handlePromptDeleted}
                                    onVisibilityChanged={handleVisibilityChanged}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}

                {hasMore && !isLoading && (
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleLoadMore}
                            className="px-6 py-3 bg-stannum/20 border border-stannum text-stannum rounded-lg font-semibold hover:bg-stannum/30 transition-colors"
                        >
                            Cargar más prompts
                        </button>
                    </div>
                )}
            </div>

            <CreatePromptModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={fetchPrompts}
            />
        </>
    );
};