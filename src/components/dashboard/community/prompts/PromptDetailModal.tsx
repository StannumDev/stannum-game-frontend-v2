'use client';

import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { BookmarkIcon, BookmarkedIcon, CheckIcon, CopyIcon, ExternalLinkIcon, LikeIcon, LikedIcon, SpinnerIcon } from '@/icons';
import { getPromptById, copyPrompt, likePrompt, unlikePrompt, toggleFavoritePrompt } from '@/services';
import { Modal, STANNUMIcon } from '@/components';
import { errorHandler } from '@/helpers';
import { categoryIcons, difficultyIcons, platformOptions, categoryOptions, difficultyOptions } from '@/helpers/prompts';
import type { Prompt } from '@/interfaces';
import default_user from "@/assets/user/default_user.webp";

interface Props {
    promptId: string | null;
    selectedPromptId: boolean;
    setSelectedPromptId: Dispatch<SetStateAction<string | null>>
    onUpdate: () => void;
}

export const PromptDetailModal = ({ promptId, selectedPromptId, setSelectedPromptId, onUpdate }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [prompt, setPrompt] = useState<Prompt | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showCopiedFeedback, setShowCopiedFeedback] = useState(false);
    const [activeTab, setActiveTab] = useState<'prompt' | 'example'>('prompt');

    useEffect(() => {
        if (selectedPromptId) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [selectedPromptId]);

    useEffect(() => {
        if (!showModal && selectedPromptId) {
            setSelectedPromptId(null);
        }
    }, [showModal, setSelectedPromptId]);

    const fetchPromptDetails = useCallback(async () => {
        if (!promptId) return;
        setIsLoading(true);
        try {
            const response = await getPromptById(promptId);
            setPrompt(response.data);
        } catch (error) {
            errorHandler(error);
            setShowModal(false);
        } finally {
            setIsLoading(false);
        }
    }, [promptId]);

    useEffect(() => {
        if (promptId && selectedPromptId) {
            fetchPromptDetails();
            setActiveTab('prompt');
        }
    }, [promptId, selectedPromptId, fetchPromptDetails]);

    const handleCopy = async () => {
        if (!prompt || isProcessing) return;
        setIsProcessing(true);
        try {
            const response = await copyPrompt(prompt.id);
            await navigator.clipboard.writeText(response.content);
            
            setPrompt(prev => prev ? {
                ...prev,
                metrics: { ...prev.metrics, copiesCount: response.copiesCount }
            } : null);
            
            setShowCopiedFeedback(true);
            setTimeout(() => setShowCopiedFeedback(false), 2000);
            onUpdate();
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleLike = async () => {
        if (!prompt || isProcessing) return;
        setIsProcessing(true);
        try {
            const isLiked = prompt.userActions?.hasLiked || false;
            const response = isLiked ? await unlikePrompt(prompt.id) : await likePrompt(prompt.id);
            setPrompt(prev => prev ? {
                ...prev,
                metrics: { ...prev.metrics, likesCount: response.likesCount },
                userActions: { ...prev.userActions!, hasLiked: !isLiked }
            } : null);
            onUpdate();
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFavorite = async () => {
        if (!prompt || isProcessing) return;
        setIsProcessing(true);
        try {
            const response = await toggleFavoritePrompt(prompt.id);
            setPrompt(prev => prev ? {
                ...prev,
                metrics: { ...prev.metrics, favoritesCount: response.favoritesCount },
                userActions: { ...prev.userActions!, hasFavorited: response.isFavorited }
            } : null);
            onUpdate();
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsProcessing(false);
        }
    };

    const CategoryIcon = prompt ? categoryIcons[prompt.category] : null;
    const DifficultyIcon = prompt ? difficultyIcons[prompt.difficulty] : null;
    const categoryLabel = prompt ? categoryOptions.find(c => c.value === prompt.category)?.label : '';
    const difficultyLabel = prompt ? difficultyOptions.find(d => d.value === prompt.difficulty)?.label : '';

    return (
        <Modal showModal={showModal} setShowModal={setShowModal} className="max-w-4xl">
            {isLoading ? (
                <div className="flex items-center justify-center h-full py-20">
                    <SpinnerIcon className="w-8 h-8 animate-spin text-stannum" />
                </div>
            ) : prompt ? (
                <div className="w-full h-full overflow-y-auto px-6 py-6 space-y-6">
                    <div className="pb-4 border-b border-card-light">
                        <div className="flex items-center gap-2 mb-3">
                            {CategoryIcon && <CategoryIcon className="text-2xl text-stannum" />}
                            <span className="subtitle-1">{categoryLabel}</span>
                            <div className='grow'></div>
                            {prompt.stannumVerified.isVerified && (
                                <span className="px-2 py-0.5 subtitle-1 bg-stannum/20 border border-stannum text-stannum rounded font-bold flex items-center gap-1">
                                    <STANNUMIcon className='size-3 fill-stannum' />
                                    Verificado
                                </span>
                            )}
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{prompt.title}</h2>
                        <p className="text-sm opacity-75 leading-relaxed">{prompt.description}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="flex flex-col">
                            <span className="text-xs text-card-lightest mb-1">Complejidad</span>
                            <span className="px-2 py-1 text-xs font-semibold rounded border capitalize flex items-center gap-1 text-stannum border-stannum/50 bg-stannum/10 w-fit">
                                {DifficultyIcon && <DifficultyIcon className="text-sm" />}
                                {difficultyLabel}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-card-lightest mb-1">Copias</span>
                            <span className="font-semibold">{prompt.metrics.copiesCount}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-card-lightest mb-1">Likes</span>
                            <span className="font-semibold">{prompt.metrics.likesCount}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-card-lightest mb-1">Vistas</span>
                            <span className="font-semibold">{prompt.metrics.viewsCount}</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-xs text-card-lightest mb-2 block">Plataformas compatibles</span>
                        <div className="flex flex-wrap gap-2">
                            {prompt.platforms.map((platform, idx) => {
                                const platformData = platformOptions.find(p => p.value === platform);
                                const Icon = platformData?.icon;
                                return (
                                    <div key={idx} className="px-3 py-1.5 text-sm bg-card-light border border-card-lighter rounded flex items-center gap-2">
                                        {Icon && <Icon className="text-base" />}
                                        <span className="capitalize">{platformData?.label || platform}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {prompt.tags.length > 0 &&
                        <div>
                            <span className="text-xs text-card-lightest mb-2 block">Tags</span>
                            <div className="flex flex-wrap gap-2">
                                {prompt.tags.map((tag, idx) => <span key={idx} className="px-3 py-1 text-xs bg-card border border-card-light rounded-full text-card-lightest">#{tag}</span>)}
                            </div>
                        </div>
                    }
                    {prompt.customGptUrl &&
                        <div className="p-4 bg-stannum/10 border border-stannum/30 rounded-lg">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-semibold text-stannum mb-1">Asistente personalizado disponible</p>
                                    <p className="text-xs opacity-75">Este prompt incluye un asistente personalizado listo para usar</p>
                                </div>
                                <a
                                    href={prompt.customGptUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 px-4 py-2 bg-stannum text-card rounded-lg text-sm font-semibold hover:bg-stannum/90 transition-colors flex items-center justify-center gap-2"
                                >
                                    Abrir Asistente
                                    <ExternalLinkIcon />
                                </a>
                            </div>
                        </div>
                    }
                    <div className="border-b border-card-light">
                        <div className="flex gap-4">
                            <button 
                                type="button"
                                onClick={() => setActiveTab('prompt')} 
                                className={`pb-3 px-2 text-sm font-semibold border-b-2 transition-colors ${ activeTab === 'prompt' ? 'border-stannum text-stannum' : 'border-transparent text-card-lighter hover:text-card-lightest'}`}
                            >
                                Prompt
                            </button>
                            {prompt.exampleOutput &&
                                <button 
                                    type="button"
                                    onClick={() => setActiveTab('example')} 
                                    className={`pb-3 px-2 text-sm font-semibold border-b-2 transition-colors ${ activeTab === 'example' ? 'border-stannum text-stannum' : 'border-transparent text-card-lighter hover:text-card-lightest'}`}
                                >
                                    Ejemplo de resultado
                                </button>
                            }
                        </div>
                    </div>
                    {activeTab === 'prompt' &&
                        <div className="space-y-3">
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    disabled={isProcessing}
                                    className="px-4 py-2 bg-stannum text-card rounded-lg text-sm font-semibold hover:bg-stannum/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    {showCopiedFeedback ? <>
                                        <CheckIcon className="text-base" />
                                        ¡Copiado!
                                    </> : <>
                                        <CopyIcon className="text-base" />
                                        Copiar Prompt
                                    </>}
                                </button>
                            </div>
                            <div className="p-4 bg-card-light border border-card-lighter rounded-lg">
                                <pre className="text-sm opacity-75 whitespace-pre-wrap font-mono leading-relaxed">
                                    {prompt.content}
                                </pre>
                            </div>
                        </div>
                    }
                    {activeTab === 'example' && prompt.exampleOutput && (
                        <div className="p-4 bg-card-light border border-card-lighter rounded-lg">
                            <pre className="text-sm opacity-75 whitespace-pre-wrap font-mono leading-relaxed">
                                {prompt.exampleOutput}
                            </pre>
                        </div>
                    )}
                    <div className="pt-4 border-t border-card-light">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Image 
                                    src={prompt.author.profilePhotoUrl || default_user} 
                                    alt={`Foto de ${prompt.author.username}`} 
                                    width={40} 
                                    height={40} 
                                    className="size-10 rounded-full" 
                                />
                                <div>
                                    <p className="text-sm font-semibold">{prompt.author.username}</p>
                                    <p className="text-xs text-card-lightest">
                                        Creado el {new Date(prompt.createdAt).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleLike}
                                    disabled={isProcessing}
                                    className={`px-2 py-1 rounded-lg border text-sm font-medium transition-200 flex items-center gap-2 disabled:opacity-50 ${ prompt.userActions?.hasLiked ? 'bg-stannum/20 border-stannum text-stannum hover:opacity-50': 'bg-card border-card-light hover:border-stannum'}`}
                                >
                                    {prompt.userActions?.hasLiked ? <LikedIcon className="text-base" /> : <LikeIcon className="text-base" />}
                                    {prompt.metrics.likesCount}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleFavorite}
                                    disabled={isProcessing}
                                    className={`px-2 rounded-lg border text-sm font-medium transition-200 flex items-center gap-2 disabled:opacity-50 ${ prompt.userActions?.hasFavorited ? 'bg-stannum/20 border-stannum text-stannum hover:opacity-50' : 'bg-card border-card-light hover:border-stannum'}`}
                                >
                                    {prompt.userActions?.hasFavorited ? <BookmarkedIcon className="text-base" /> : <BookmarkIcon className="text-base" />}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-2 gap-4 p-4 bg-card-light border border-card-lighter rounded-lg">
                        <div>
                            <p className="text-xs mb-1">Score de Popularidad</p>
                            <p className="text-2xl font-bold text-stannum">{prompt.popularityScore.toFixed(0)}</p>
                        </div>
                        <div>
                            <p className="text-xs mb-1">Tasa de Engagement</p>
                            <p className="text-2xl font-bold text-stannum">{prompt.engagementRate}%</p>
                        </div>
                    </div> */}
                </div>
            ) : null}
        </Modal>
    );
};