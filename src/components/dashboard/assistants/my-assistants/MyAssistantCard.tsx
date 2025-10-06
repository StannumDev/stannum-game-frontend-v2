'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TbExternalLink } from 'react-icons/tb';
import { BiLike } from 'react-icons/bi';
import { BookmarkIcon, HidePasswordIcon, ShowPassowrdIcon, TrashIcon } from '@/icons';
import { categoryIcons, difficultyIcons, platformOptions, categoryOptions, difficultyOptions } from '@/helpers/assistants';
import { DeleteAssistantModal, VisibilityToggleMenu } from '@/components';
import type { MyAssistantCard as IMyAssistantCard, AssistantVisibility } from '@/interfaces';

interface Props {
    assistant: IMyAssistantCard;
    onDeleted: (assistantId: string) => void;
    onVisibilityChanged: (assistantId: string, newVisibility: AssistantVisibility) => void;
}

export const MyAssistantCard = ({ assistant, onDeleted, onVisibilityChanged }: Props) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const CategoryIcon = categoryIcons[assistant.category];
    const DifficultyIcon = difficultyIcons[assistant.difficulty];
    const categoryLabel = categoryOptions.find((c) => c.value === assistant.category)?.label || assistant.category;
    const difficultyLabel = difficultyOptions.find((d) => d.value === assistant.difficulty)?.label || assistant.difficulty;

    const getVisibilityBadge = () => {
        switch (assistant.visibility) {
            case 'published':
                return (
                    <span className="px-2.5 py-1 text-xs font-bold rounded bg-stannum text-card flex items-center gap-1.5">
                        <ShowPassowrdIcon className="text-sm" />
                        Publicado
                    </span>
                );
            case 'hidden':
                return (
                    <span className="px-2.5 py-1 text-xs font-semibold rounded border bg-card-light border-card-lighter text-card-lighter flex items-center gap-1.5">
                        <HidePasswordIcon className="text-sm" />
                        Oculto
                    </span>
                );
            case 'draft':
                return (
                    <span className="px-2.5 py-1 text-xs font-semibold rounded border bg-warning/10 border-warning/50 text-warning flex items-center gap-1.5">
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
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <CategoryIcon className="text-2xl text-stannum" />
                        <span className="text-xs text-card-lighter">{categoryLabel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {getVisibilityBadge()}
                        <VisibilityToggleMenu
                            assistantId={assistant.id}
                            currentVisibility={assistant.visibility}
                            onVisibilityChanged={(newVisibility) => onVisibilityChanged(assistant.id, newVisibility)}
                        />
                        <motion.button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="p-1.5 rounded-lg border border-card-light text-card-lighter hover:text-invalid hover:border-invalid transition-colors"
                            whileTap={{ scale: 0.9 }}
                        >
                            <TrashIcon className="text-base" />
                        </motion.button>
                    </div>
                </div>
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{assistant.title}</h3>
                <p className="text-sm text-card-lightest mb-3 line-clamp-3">{assistant.description}</p>
                {assistant.tags.length > 0 &&
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {assistant.tags.slice(0, 3).map((tag, idx) => <span key={idx} className="px-2 py-0.5 text-xs bg-card-light border border-card-lighter rounded-full text-card-lightest">#{tag}</span> )}
                        {assistant.tags.length > 3 && <span className="px-2 py-0.5 text-xs text-card-lighter">+{assistant.tags.length - 3}</span>}
                    </div>
                }
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-card-light">
                    {assistant.platforms.slice(0, 4).map((platform, idx) => {
                        const platformData = platformOptions.find((p) => p.value === platform);
                        const Icon = platformData?.icon;
                        return (
                            <div key={idx} className="px-2 py-1 text-xs bg-card border border-card-lighter rounded flex items-center gap-1.5">
                                {Icon && <Icon className="text-sm" />}
                                <span className="capitalize">{platformData?.label || platform}</span>
                            </div>
                        );
                    })}
                    {assistant.platforms.length > 4 && <span className="text-xs text-card-lighter">+{assistant.platforms.length - 4}</span>}
                </div>
                <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 text-xs font-semibold rounded border capitalize flex items-center gap-1 text-stannum border-stannum/50 bg-stannum/10">
                        <DifficultyIcon className="text-sm" />
                        {difficultyLabel}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-card-lighter">
                        <span className="flex items-center gap-1" title="Clicks">
                            <TbExternalLink className="text-sm" />
                            {assistant.metrics.likesCount}
                        </span>
                        <span className="flex items-center gap-1" title="Likes">
                            <BiLike className="text-sm" />
                            {assistant.metrics.likesCount}
                        </span>
                        <span className="flex items-center gap-1" title="Favoritos">
                            <BookmarkIcon className="text-sm" />
                            {assistant.metrics.favoritesCount}
                        </span>
                    </div>
                </div>
                <Link href={assistant.assistantUrl} target='_blank' className="w-full px-4 py-2 bg-stannum text-card rounded-lg text-sm font-semibold hover:bg-stannum/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    <TbExternalLink className="text-base" />
                    Abrir asistente
                </Link>
            </motion.article>
            <DeleteAssistantModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                assistantId={assistant.id}
                assistantTitle={assistant.title}
                onDeleted={() => onDeleted(assistant.id)}
            />
        </>
    );
};