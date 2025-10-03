'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { TbExternalLink } from 'react-icons/tb';
import { BookmarkIcon, BookmarkedIcon } from '@/icons';
import { clickAssistant, likeAssistant, unlikeAssistant, toggleFavoriteAssistant } from '@/services';
import { errorHandler } from '@/helpers';
import { categoryIcons, difficultyIcons, difficultyColors, platformIcons, categoryOptions } from '@/helpers/assistantsConst';
import type { AssistantCard as IAssistantCard } from '@/interfaces';
import default_user from "@/assets/user/default_user.webp";

interface Props {
    assistant: IAssistantCard;
    onUpdate?: () => void;
}

export const AssistantCard = ({ assistant, onUpdate }: Props) => {
    const [isLiked, setIsLiked] = useState(assistant.userActions?.hasLiked || false);
    const [isFavorited, setIsFavorited] = useState(assistant.userActions?.hasFavorited || false);
    const [likesCount, setLikesCount] = useState(assistant.metrics.likes);
    const [clicksCount, setClicksCount] = useState(assistant.metrics.clicks);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldShowButton, setShouldShowButton] = useState(false);

    const CategoryIcon = categoryIcons[assistant.category];
    const DifficultyIcon = difficultyIcons[assistant.difficulty];
    const categoryLabel = categoryOptions.find(c => c.value === assistant.category)?.label || assistant.category;

    useEffect(() => {
        const checkTextOverflow = () => {
            const estimatedLines = assistant.description.length / 50;
            setShouldShowButton(estimatedLines > 3);
        };
        checkTextOverflow();
    }, [assistant.description]);

    const handleClick = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            const response = await clickAssistant(assistant.id);
            setClicksCount(response.clicksCount);
            window.open(response.assistantUrl, '_blank', 'noopener,noreferrer');
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            if (isLiked) {
                const response = await unlikeAssistant(assistant.id);
                setLikesCount(response.likesCount);
                setIsLiked(false);
            } else {
                const response = await likeAssistant(assistant.id);
                setLikesCount(response.likesCount);
                setIsLiked(true);
            }
            onUpdate?.();
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            const response = await toggleFavoriteAssistant(assistant.id);
            setIsFavorited(response.isFavorited);
            onUpdate?.();
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsProcessing(false);
        }
    };

    const toggleDescription = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <motion.article
            className="card group cursor-pointer break-inside-avoid mb-4 hover:border-stannum/50 transition-all duration-300"
            onClick={handleClick}
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
                <motion.button
                    onClick={handleFavorite}
                    className={`p-1.5 rounded-lg border transition-colors ${isFavorited ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light text-card-lighter hover:text-stannum'}`}
                    whileTap={{ scale: 0.9 }}
                    disabled={isProcessing}
                >
                    {isFavorited ? <BookmarkedIcon className="text-base" /> : <BookmarkIcon className="text-base" />}
                </motion.button>
            </div>
            <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-stannum transition-colors">{assistant.title}</h3>
            <div className="mb-3">
                <motion.p 
                    className={`text-sm text-card-lightest ${!isExpanded && 'line-clamp-3'}`}
                    animate={{ height: isExpanded ? 'auto' : undefined }}
                    transition={{ duration: 0.3 }}
                >
                    {assistant.description}
                </motion.p>
                {shouldShowButton &&
                    <button onClick={toggleDescription} className="mt-1.5 text-xs text-stannum hover:text-stannum/80 font-semibold transition-colors">
                        {isExpanded ? 'Mostrar menos' : 'Mostrar más'}
                    </button>
                }
            </div>
            {assistant.tags.length > 0 &&
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {assistant.tags.slice(0, 3).map((tag, idx) => <span key={idx} className="px-2 py-0.5 text-xs bg-card-light border border-card-lighter rounded-full text-card-lightest">#{tag}</span>)}
                    {assistant.tags.length > 3 && <span className="px-2 py-0.5 text-xs text-card-lighter">+{assistant.tags.length - 3}</span>}
                </div>
            }
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-card-light">
                {assistant.platforms.slice(0, 4).map((platform, idx) => {
                    const PlatformIcon = platformIcons[platform];
                    return (
                        <div key={idx} className="px-2 py-1 text-xs bg-card border border-card-lighter rounded flex items-center gap-1.5">
                            {PlatformIcon && <PlatformIcon className="text-sm" />}
                            <span className="capitalize">{platform}</span>
                        </div>
                    );
                })}
                {assistant.platforms.length > 4 && <span className="text-xs text-card-lighter">+{assistant.platforms.length - 4}</span>}
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded border capitalize flex items-center gap-1 ${difficultyColors[assistant.difficulty]}`}>
                        <DifficultyIcon className="text-sm" />
                        {assistant.difficulty}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-card-lighter">
                        <span className="flex items-center gap-1">
                            <TbExternalLink className="text-sm" />
                            {clicksCount}
                        </span>
                        <motion.button
                            onClick={handleLike}
                            className={`flex items-center gap-1 ${isLiked && 'text-stannum'}`}
                            whileTap={{ scale: 0.95 }}
                            disabled={isProcessing}
                        >
                            {isLiked ? <BiSolidLike className="text-sm" /> : <BiLike className="text-sm" />}
                            {likesCount}
                        </motion.button>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-card-lighter">
                    <Image src={assistant.author.profilePhotoUrl || default_user} alt={`Foto de ${assistant.author.username}`} width={24} height={24} className="size-6 rounded-full" />
                    <span className="font-semibold text-card-lightest">{assistant.author.username}</span>
                </div>
            </div>
        </motion.article>
    );
};