'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BiLike } from 'react-icons/bi';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import { BookmarkIcon, HidePasswordIcon, TrashIcon } from '@/icons';
import { categoryIcons, difficultyIcons, platformOptions, categoryOptions, difficultyOptions } from '@/helpers/prompts';
import { DeletePromptModal, MyPromptCardOptionsMenu, EditPromptModal } from '@/components';
import type { MyPromptCard as IMyPromptCard, PromptVisibility } from '@/interfaces';

interface Props {
    prompt: IMyPromptCard;
    onDeleted: (promptId: string) => void;
    onVisibilityChanged: (promptId: string, newVisibility: PromptVisibility) => void;
    onUpdated: () => void;
}

export const MyPromptCard = ({ prompt, onDeleted, onVisibilityChanged, onUpdated }: Props) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const CategoryIcon = categoryIcons[prompt.category];
    const DifficultyIcon = difficultyIcons[prompt.difficulty];
    const categoryLabel = categoryOptions.find((c) => c.value === prompt.category)?.label || prompt.category;
    const difficultyLabel = difficultyOptions.find((d) => d.value === prompt.difficulty)?.label || prompt.difficulty;

    const getVisibilityBadge = () => {
        switch (prompt.visibility) {
            case 'published':
                return null;
            case 'hidden':
                return (
                    <span className="px-2.5 py-1 text-xs font-semibold rounded border bg-card border-card-lighter text-card-lightest flex items-center gap-1.5">
                        <HidePasswordIcon className="text-sm" />
                        Oculto
                    </span>
                );
            case 'draft':
                return (
                    <span className="px-2.5 py-1 text-xs font-semibold rounded border bg-card border-invalid text-invalid flex items-center gap-1.5">
                        <TrashIcon className="text-sm" />
                        Borrador
                    </span>
                );
        }
    };

    return (
        <>
            <motion.article
                className="card group break-inside-avoid mb-4 border-card-light hover:border-stannum/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                layout
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <CategoryIcon className="text-2xl text-stannum" />
                        <span className="subtitle-1">{categoryLabel}</span>
                        {prompt.stannumVerified && (
                            <span className="px-1.5 py-0.5 text-[10px] bg-stannum/20 border border-stannum text-stannum rounded font-bold">
                                VERIFICADO
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {getVisibilityBadge()}
                        <MyPromptCardOptionsMenu
                            promptId={prompt.id}
                            currentVisibility={prompt.visibility}
                            onVisibilityChanged={(newVisibility) => onVisibilityChanged(prompt.id, newVisibility)}
                            onEdit={prompt.visibility === 'draft' ? () => setIsEditModalOpen(true) : undefined}
                        />
                        <button
                            type="button"
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="p-1.5 rounded-lg border border-card-light text-card-lighter hover:text-invalid hover:border-invalid transition-colors"
                        >
                            <TrashIcon />
                        </button>
                    </div>
                </div>

                {/* Título */}
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{prompt.title}</h3>

                {/* Descripción */}
                <p className="text-sm opacity-75 mb-3 line-clamp-3">{prompt.description}</p>

                {/* Tags */}
                {prompt.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        {prompt.tags.slice(0, 3).map((tag, idx) => (
                            <span 
                                key={idx} 
                                className="px-2 py-0.5 text-xs bg-card border border-card-light rounded-full text-card-lightest"
                            >
                                #{tag}
                            </span>
                        ))}
                        {prompt.tags.length > 3 && (
                            <span className="text-xs text-card-lighter">
                                +{prompt.tags.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Plataformas */}
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-card-light">
                    {prompt.platforms.slice(0, 4).map((platform, idx) => {
                        const platformData = platformOptions.find(p => p.value === platform);
                        const Icon = platformData?.icon;
                        return (
                            <div key={idx} className="px-2 py-1 text-xs bg-card border border-card-lighter rounded flex items-center gap-1.5">
                                {Icon && <Icon className="text-sm" />}
                                <span className="capitalize">{platformData?.label || platform}</span>
                            </div>
                        );
                    })}
                    {prompt.platforms.length > 4 && (
                        <span className="text-xs text-card-lighter">
                            +{prompt.platforms.length - 4}
                        </span>
                    )}
                </div>

                {/* Footer con métricas */}
                <div className="flex items-center justify-between">
                    <span className="px-2 py-1 text-xs font-semibold rounded border capitalize flex items-center gap-1 text-stannum border-stannum/50 bg-stannum/10">
                        <DifficultyIcon className="text-sm" />
                        {difficultyLabel}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-card-lighter">
                        <span className="flex items-center gap-1" title="Copias">
                            <HiOutlineDocumentDuplicate className="text-sm" />
                            {prompt.metrics.copiesCount}
                        </span>
                        <span className="flex items-center gap-1" title="Likes">
                            <BiLike className="text-sm" />
                            {prompt.metrics.likesCount}
                        </span>
                        <span className="flex items-center gap-1" title="Favoritos">
                            <BookmarkIcon className="text-sm" />
                            {prompt.metrics.favoritesCount}
                        </span>
                    </div>
                </div>

                {/* GPT Personalizado */}
                {prompt.hasCustomGpt && (
                    <div className="mt-3 pt-3 border-t border-card-light">
                        <span className="text-xs text-stannum font-semibold flex items-center gap-1">
                            🎯 Incluye GPT personalizado
                        </span>
                    </div>
                )}
            </motion.article>

            {/* Modales */}
            {prompt.visibility === 'draft' && (
                <EditPromptModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSuccess={async () => {
                        await onUpdated();
                        setIsEditModalOpen(false);
                    }}
                    prompt={prompt}
                />
            )}
            
            <DeletePromptModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                promptId={prompt.id}
                promptTitle={prompt.title}
                onDeleted={() => onDeleted(prompt.id)}
            />
        </>
    );
};