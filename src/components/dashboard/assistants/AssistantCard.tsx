'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { TbExternalLink } from 'react-icons/tb';
import { BookmarkIcon, BookmarkedIcon } from '@/icons';
import { clickAssistant, likeAssistant, unlikeAssistant, toggleFavoriteAssistant } from '@/services';
import { errorHandler } from '@/helpers';
import { categoryIcons, difficultyIcons, platformOptions, categoryOptions, difficultyOptions } from '@/helpers/assistants';
import type { AssistantCard as IAssistantCard } from '@/interfaces';
import default_user from "@/assets/user/default_user.webp";

interface Props {
    assistant: IAssistantCard;
}

export const AssistantCard = ({ assistant }: Props) => {
    const [isLiked, setIsLiked] = useState(assistant.userActions?.hasLiked || false);
    const [isFavorited, setIsFavorited] = useState(assistant.userActions?.hasFavorited || false);
    const [likesCount, setLikesCount] = useState(assistant.metrics.likesCount);
    const [clicksCount, setClicksCount] = useState(assistant.metrics.clicksCount);
    const [isProcessing, setIsProcessing] = useState(false);

    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldShowButton, setShouldShowButton] = useState(false);
    const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
    const [expandedHeight, setExpandedHeight] = useState<number | null>(null);

    const visibleRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);

    const CategoryIcon = categoryIcons[assistant.category];
    const DifficultyIcon = difficultyIcons[assistant.difficulty];
    const categoryLabel = categoryOptions.find(c => c.value === assistant.category)?.label || assistant.category;
    const difficultyLabel = difficultyOptions.find((d) => d.value === assistant.difficulty)?.label || assistant.difficulty;
    const platformData = platformOptions.find(p => p.value === assistant.platform);
    const Icon = platformData?.icon;

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
    }, [assistant.description]);

    const toggleDescription = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded((v) => !v);
    };

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
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsProcessing(false);
        }
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
                    <span className="subtitle-1">{categoryLabel}</span>
                </div>
                <button
                    type='button'
                    disabled={isProcessing}
                    onClick={handleFavorite}
                    className={`p-1.5 rounded-lg border ${isFavorited ? 'bg-stannum/20 border-stannum text-stannum hover:opacity-50' : 'bg-card border-card-light text-card-lighter hover:text-stannum'} transition-200`}
                >
                    {isFavorited ? <BookmarkedIcon /> : <BookmarkIcon />}
                </button>
            </div>
            <h3 className="text-lg font-bold group-hover:text-stannum transition-colors">{assistant.title}</h3>
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
                    <p className="text-sm opacity-75">{assistant.description}</p>
                </motion.div>
                <div ref={measureRef} aria-hidden="true" className="invisible absolute -z-10 w-full pointer-events-none">
                    <p className="text-sm opacity-75">{assistant.description}</p>
                </div>
                { shouldShowButton &&
                    <button type='button' onClick={toggleDescription} className="mt-1.5 text-xs text-stannum hover:text-stannum/80 font-semibold transition-colors" >
                        {isExpanded ? "Mostrar menos" : "Mostrar más"}
                    </button>
                }
            </div>
            {assistant.tags.length > 0 &&
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {assistant.tags.slice(0, 3).map((tag, idx) => <span key={idx} className="px-2 py-0.5 text-xs bg-card border border-card-light rounded-full text-card-lightest">#{tag}</span>)}
                    {assistant.tags.length > 3 && <span className="text-xs text-card-lighter">+{assistant.tags.length - 3}</span>}
                </div>
            }
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-card-light">
                <div className="px-2 py-1 text-xs bg-card border border-card-lighter rounded flex items-center gap-1.5">
                    {Icon && <Icon className="text-sm" />}
                    <span className="capitalize">{platformData?.label || assistant.platform}</span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded border capitalize flex items-center gap-1 text-stannum border-stannum/50 bg-stannum/10">
                        <DifficultyIcon className="text-sm" />
                        {difficultyLabel}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-card-lighter">
                        <span className="flex items-center gap-1">
                            <TbExternalLink className="text-sm" />
                            {clicksCount}
                        </span>
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-1 ${isLiked ? 'text-stannum hover:opacity-50' : 'text-card-lighter hover:text-stannum'} transition-200`}
                            disabled={isProcessing}
                        >
                            {isLiked ? <BiSolidLike className="text-sm" /> : <BiLike className="text-sm" />}
                            {likesCount}
                        </button>
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