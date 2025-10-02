'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { AssistantCard as IAssistantCard } from '@/interfaces';
import { clickAssistant, likeAssistant, unlikeAssistant, toggleFavoriteAssistant } from '@/services';
import { errorHandler } from '@/helpers';
import { StarIcon, BookmarkIcon, BookmarkedIcon } from '@/icons';
import { 
    MdOutlineAttachMoney,
    MdSpeed,
    MdCampaign,
    MdLightbulb,
    MdGroups,
    MdOutlineTimer,
    MdShowChart,
    MdTrendingUp
} from 'react-icons/md';
import { 
    HiOutlineSparkles,
    HiOutlineDocumentText
} from 'react-icons/hi2';
import { 
    BiLike,
    BiSolidLike
} from 'react-icons/bi';
import { 
    SiOpenai,
    SiClaude,
    SiPerplexity
} from 'react-icons/si';
import { 
    IoShieldCheckmark,
    IoShieldHalfSharp,
    IoShield
} from 'react-icons/io5';
import { 
    TbExternalLink 
} from 'react-icons/tb';
import type { IconType } from 'react-icons';

interface Props {
    assistant: IAssistantCard;
    onUpdate?: () => void;
}

// Mapeo de categorías a iconos
const categoryIcons: Record<string, IconType> = {
    sales: MdOutlineAttachMoney,
    productivity: MdSpeed,
    marketing: MdCampaign,
    innovation: MdLightbulb,
    leadership: MdGroups,
    strategy: HiOutlineSparkles,
    automation: MdOutlineTimer,
    content: HiOutlineDocumentText,
    analysis: MdShowChart,
    growth: MdTrendingUp,
};

// Mapeo de plataformas a iconos
const platformIcons: Record<string, IconType | null> = {
    chatgpt: SiOpenai,
    claude: SiClaude,
    perplexity: SiPerplexity,
    gemini: null, // No hay icono específico en react-icons
    poe: null,
    'notion-ai': null,
    midjourney: null,
    'gpt-4': SiOpenai,
    'custom-gpt': SiOpenai,
    other: null,
};

// Mapeo de dificultad a iconos
const difficultyIcons: Record<string, IconType> = {
    basic: IoShield,
    intermediate: IoShieldHalfSharp,
    advanced: IoShieldCheckmark,
};

const difficultyColors: Record<string, string> = {
    basic: 'text-green-400 border-green-400/50 bg-green-400/10',
    intermediate: 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10',
    advanced: 'text-stannum border-stannum/50 bg-stannum/10',
};

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

    // Detectar si el texto realmente necesita line-clamp
    useEffect(() => {
        const checkTextOverflow = () => {
            // Estimación: ~150 caracteres = 3 líneas aprox
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
            layout // Esto ayuda a que Framer Motion maneje los cambios de tamaño
        >
            {/* Header: Categoría + Favorito */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <CategoryIcon className="text-2xl text-stannum" />
                    <span className="text-xs text-card-lighter capitalize">
                        {assistant.category}
                    </span>
                </div>
                <motion.button
                    onClick={handleFavorite}
                    className={`p-1.5 rounded-lg border transition-colors ${
                        isFavorited
                            ? 'bg-stannum/20 border-stannum text-stannum'
                            : 'bg-card border-card-light text-card-lighter hover:text-stannum'
                    }`}
                    whileTap={{ scale: 0.9 }}
                    disabled={isProcessing}
                >
                    {isFavorited ? (
                        <BookmarkedIcon className="text-base" />
                    ) : (
                        <BookmarkIcon className="text-base" />
                    )}
                </motion.button>
            </div>

            {/* Título */}
            <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-stannum transition-colors">
                {assistant.title}
            </h3>

            {/* Descripción con line-clamp + "Mostrar más" */}
            <div className="mb-3">
                <motion.p 
                    className={`text-sm text-card-lightest ${isExpanded ? '' : 'line-clamp-3'}`}
                    animate={{ height: isExpanded ? 'auto' : undefined }}
                    transition={{ duration: 0.3 }}
                >
                    {assistant.description}
                </motion.p>
                {shouldShowButton && (
                    <button
                        onClick={toggleDescription}
                        className="mt-1.5 text-xs text-stannum hover:text-stannum/80 font-semibold transition-colors"
                    >
                        {isExpanded ? 'Mostrar menos' : 'Mostrar más'}
                    </button>
                )}
            </div>

            {/* Tags */}
            {assistant.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {assistant.tags.slice(0, 3).map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-0.5 text-xs bg-card-light border border-card-lighter rounded-full text-card-lightest"
                        >
                            #{tag}
                        </span>
                    ))}
                    {assistant.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-xs text-card-lighter">
                            +{assistant.tags.length - 3}
                        </span>
                    )}
                </div>
            )}

            {/* Plataformas */}
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-card-light">
                {assistant.platforms.slice(0, 4).map((platform, idx) => {
                    const PlatformIcon = platformIcons[platform];
                    return (
                        <div
                            key={idx}
                            className="px-2 py-1 text-xs bg-card border border-card-lighter rounded flex items-center gap-1.5"
                        >
                            {PlatformIcon && <PlatformIcon className="text-sm" />}
                            <span className="capitalize">{platform}</span>
                        </div>
                    );
                })}
                {assistant.platforms.length > 4 && (
                    <span className="text-xs text-card-lighter">
                        +{assistant.platforms.length - 4}
                    </span>
                )}
            </div>

            {/* Footer: Dificultad + Métricas + Autor */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Dificultad */}
                    <span
                        className={`px-2 py-1 text-xs font-semibold rounded border capitalize flex items-center gap-1 ${
                            difficultyColors[assistant.difficulty]
                        }`}
                    >
                        <DifficultyIcon className="text-sm" />
                        {assistant.difficulty}
                    </span>

                    {/* Métricas */}
                    <div className="flex items-center gap-3 text-xs text-card-lighter">
                        <span className="flex items-center gap-1">
                            <TbExternalLink className="text-sm" />
                            {clicksCount}
                        </span>
                        <motion.button
                            onClick={handleLike}
                            className={`flex items-center gap-1 ${isLiked ? 'text-stannum' : ''}`}
                            whileTap={{ scale: 0.9 }}
                            disabled={isProcessing}
                        >
                            {isLiked ? (
                                <BiSolidLike className="text-sm" />
                            ) : (
                                <BiLike className="text-sm" />
                            )}
                            {likesCount}
                        </motion.button>
                    </div>
                </div>

                {/* Autor */}
                <div className="flex items-center gap-1.5 text-xs text-card-lighter">
                    <span>por</span>
                    <span className="font-semibold text-card-lightest">
                        @{assistant.author.username}
                    </span>
                </div>
            </div>
        </motion.article>
    );
};