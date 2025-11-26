'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookmarkIcon, BookmarkedIcon, CopyIcon, LikeIcon, LikedIcon } from '@/icons';
import { copyPrompt, likePrompt, unlikePrompt, toggleFavoritePrompt } from '@/services';
import { errorHandler } from '@/helpers';
import { categoryIcons, difficultyIcons, platformOptions, categoryOptions, difficultyOptions } from '@/helpers/prompts';
import type { PromptCard as PromptCardType } from '@/interfaces';
import default_user from "@/assets/user/default_user.webp";
import Link from 'next/link';

interface Props {
    prompt: PromptCardType;
    onClick?: () => void;
}

export const PromptCard = ({ prompt, onClick }: Props) => {
    const [isLiked, setIsLiked] = useState(prompt.userActions?.hasLiked || false);
    const [isFavorited, setIsFavorited] = useState(prompt.userActions?.hasFavorited || false);
    const [likesCount, setLikesCount] = useState(prompt.metrics.likes);
    const [copiesCount, setCopiesCount] = useState(prompt.metrics.copies);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showCopiedFeedback, setShowCopiedFeedback] = useState(false);

    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldShowButton, setShouldShowButton] = useState(false);
    const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
    const [expandedHeight, setExpandedHeight] = useState<number | null>(null);

    const visibleRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);

    const CategoryIcon = categoryIcons[prompt.category];
    const DifficultyIcon = difficultyIcons[prompt.difficulty];
    const categoryLabel = categoryOptions.find(c => c.value === prompt.category)?.label || prompt.category;
    const difficultyLabel = difficultyOptions.find((d) => d.value === prompt.difficulty)?.label || prompt.difficulty;

    useEffect(() => {
        const el = visibleRef.current;
        const shadow = measureRef.current;
        if (!el || !shadow) return;

        const computeHeights = () => {
            const cs = window.getComputedStyle(el);
            const lineHeight = parseFloat(cs.lineHeight || "20");
            const lines = 4;
            const collapsed = Math.round(lineHeight * lines);
            shadow.style.width = `${el.clientWidth}px`;
            const expanded = Math.ceil(shadow.scrollHeight);
            setCollapsedHeight(collapsed);
            setExpandedHeight(expanded);
            setShouldShowButton(expanded > collapsed + 2);
        };
        computeHeights();

        const ro = new ResizeObserver(() => computeHeights());
        ro.observe(el);
        document.fonts?.ready?.then(() => computeHeights());

        return () => ro.disconnect();
    }, [prompt.description]);

    const toggleDescription = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded((v) => !v);
    };

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            const response = await copyPrompt(prompt.id);
            setCopiesCount(response.copiesCount);
            
            await navigator.clipboard.writeText(response.content);
            
            setShowCopiedFeedback(true);
            setTimeout(() => setShowCopiedFeedback(false), 2000);
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
                const response = await unlikePrompt(prompt.id);
                setLikesCount(response.likesCount);
                setIsLiked(false);
            } else {
                const response = await likePrompt(prompt.id);
                setLikesCount(response.likesCount);
                setIsLiked(true);
            }
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
            const response = await toggleFavoritePrompt(prompt.id);
            setIsFavorited(response.isFavorited);
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <motion.article
            onClick={onClick}
            className="card group cursor-pointer break-inside-avoid mb-4 hover:border-stannum/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            layout
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <CategoryIcon className="text-2xl text-stannum" />
                    <span className="subtitle-1">{categoryLabel}</span>
                    {prompt.stannumVerified.isVerified && <span className="px-1.5 py-0.5 text-xs bg-stannum/20 border border-stannum text-stannum rounded font-bold uppercase">Verificado</span>}
                </div>
                <button
                    type="button"
                    onClick={handleFavorite}
                    disabled={isProcessing}
                    className={`p-1.5 rounded-lg border ${ isFavorited ? 'bg-stannum/20 border-stannum text-stannum hover:opacity-50' : 'bg-card border-card-light text-card-lighter hover:text-stannum'} transition-200`}
                >
                    {isFavorited ? <BookmarkedIcon /> : <BookmarkIcon />}
                </button>
            </div>
            <h3 className="text-lg font-bold group-hover:text-stannum transition-colors">{prompt.title}</h3>
            <div className="mt-2 mb-4">
                <motion.div
                    ref={visibleRef}
                    animate={{ 
                        height: isExpanded ? (expandedHeight ?? "auto") : "auto",
                        maxHeight: isExpanded ? (expandedHeight ?? "none") : (collapsedHeight ?? "none")
                    }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                >
                    <p className="text-sm opacity-75">{prompt.description}</p>
                </motion.div>
                <div ref={measureRef} aria-hidden="true" className="invisible absolute -z-10 w-full pointer-events-none">
                    <p className="text-sm opacity-75">{prompt.description}</p>
                </div>
                {shouldShowButton &&
                    <button 
                        type="button" 
                        onClick={toggleDescription} 
                        className="mt-1.5 text-xs text-stannum hover:text-stannum/80 font-semibold transition-colors"
                    >
                        {isExpanded ? "Mostrar menos" : "Mostrar más"}
                    </button>
                }
            </div>
            {prompt.tags.length > 0 &&
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {prompt.tags.map((tag, idx) => <span key={idx} className="px-2 py-0.5 text-xs bg-card border border-card-light rounded-full text-card-lightest">#{tag}</span>)}
                    {/* {prompt.tags.length > 3 && <span className="text-xs text-card-lighter">+{prompt.tags.length - 3}</span>} */}
                </div>
            }
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
                {prompt.platforms.length > 4 && <span className="text-xs text-card-lighter">+{prompt.platforms.length - 4}</span>}
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded border capitalize flex items-center gap-1 text-stannum border-stannum/50 bg-stannum/10">
                        <DifficultyIcon className="text-sm" />
                        {difficultyLabel}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-card-lighter">
                        <button
                            type="button"
                            onClick={handleCopy}
                            disabled={isProcessing}
                            className={`flex items-center gap-1 relative ${ showCopiedFeedback ? 'text-stannum' : 'text-card-lighter hover:text-stannum'} transition-200`}
                        >
                            <CopyIcon className="text-sm" />
                            {copiesCount}
                            {showCopiedFeedback &&
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute -top-6 left-0 text-xs bg-stannum text-card px-2 py-0.5 rounded font-bold whitespace-nowrap"
                                >
                                    ¡Copiado!
                                </motion.span>
                            }
                        </button>
                        <button
                            type="button"
                            onClick={handleLike}
                            disabled={isProcessing}
                            className={`flex items-center gap-1 ${ isLiked ? 'text-stannum hover:opacity-50' : 'text-card-lighter hover:text-stannum'} transition-200`}
                        >
                            {isLiked ? <LikedIcon className="text-sm" /> : <LikeIcon className="text-sm" />}
                            {likesCount}
                        </button>
                    </div>
                </div>
                <Link href={`/dashboard/profile/${prompt.author.username}`} className="flex items-center gap-2 text-xs group/author" onClick={(e) => e.stopPropagation()}>
                    <Image src={prompt.author.profilePhotoUrl || default_user} alt={`Foto de ${prompt.author.username}`} width={24} height={24} className="size-6 rounded-full" />
                    <span className="font-semibold text-card-lightest group-hover/author:text-stannum transition-200">{prompt.author.username}</span>
                </Link>
            </div>
            {prompt.hasCustomGpt && 
                <div className="mt-3 pt-3 border-t border-card-light">
                    <span className="text-xs text-stannum font-semibold flex items-center gap-1">Incluye Asistente personalizado</span>
                </div>
            }
        </motion.article>
    );
};