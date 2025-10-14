'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { TbCopy, TbCheck } from 'react-icons/tb';
import { BookmarkIcon, BookmarkedIcon, SpinnerIcon } from '@/icons';
import { getPromptById, copyPrompt, likePrompt, unlikePrompt, toggleFavoritePrompt } from '@/services';
import { Modal } from '@/components';
import { errorHandler } from '@/helpers';
import { categoryIcons, difficultyIcons, platformOptions, categoryOptions } from '@/helpers/prompts';
import type { Prompt } from '@/interfaces';
import default_user from "@/assets/user/default_user.webp";

interface Props {
    promptId: string | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

export const PromptDetailModal = ({ promptId, isOpen, onClose, onUpdate }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [prompt, setPrompt] = useState<Prompt | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showCopiedFeedback, setShowCopiedFeedback] = useState(false);
    const [activeTab, setActiveTab] = useState<'prompt' | 'example'>('prompt');

    useEffect(() => {
        if (isOpen) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!showModal && isOpen) {
            onClose();
        }
    }, [showModal]);

    useEffect(() => {
        if (promptId && isOpen) {
            fetchPromptDetails();
            setActiveTab('prompt');
        }
    }, [promptId, isOpen]);

    const fetchPromptDetails = async () => {
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
    };

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

    return (
        <Modal showModal={showModal} setShowModal={setShowModal} className="max-w-4xl">
            {isLoading ? 
                <div className="flex items-center justify-center h-full py-20">
                    <SpinnerIcon className="w-8 h-8 animate-spin text-stannum" />
                </div>
            : prompt ?
                <div className="w-full h-full overflow-y-auto px-6 py-6 space-y-6">
                    <div className="pb-4 border-b border-card-light">
                        <div className="flex items-center gap-2 mb-3">
                            {CategoryIcon && <CategoryIcon className="text-2xl text-stannum" />}
                            <span className="text-sm text-card-lighter">{categoryLabel}</span>
                            {prompt.stannumVerified.isVerified && <span className="px-2 py-0.5 text-[10px] bg-stannum/20 border border-stannum text-stannum rounded font-bold">✓ VERIFICADO</span>}
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{prompt.title}</h2>
                        <p className="text-card-lightest text-sm leading-relaxed">{prompt.description}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="flex flex-col">
                            <span className="text-xs text-card-lighter mb-1">Complejidad</span>
                            <span className="px-2 py-1 text-xs font-semibold rounded border capitalize flex items-center gap-1 text-stannum border-stannum/50 bg-stannum/10 w-fit">
                                {DifficultyIcon && <DifficultyIcon className="text-sm" />}
                                {prompt.difficulty}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-card-lighter mb-1">Copias</span>
                            <span className="text-card-lightest font-semibold">{prompt.metrics.copiesCount}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-card-lighter mb-1">Likes</span>
                            <span className="text-card-lightest font-semibold">{prompt.metrics.likesCount}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-card-lighter mb-1">Vistas</span>
                            <span className="text-card-lightest font-semibold">{prompt.metrics.viewsCount}</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-xs text-card-lighter mb-2 block">Plataformas compatibles</span>
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
                            <span className="text-xs text-card-lighter mb-2 block">Tags</span>
                            <div className="flex flex-wrap gap-2">
                                {prompt.tags.map((tag, idx) => <span key={idx} className="px-3 py-1 text-xs bg-card-light border border-card-lighter rounded-full text-card-lightest">#{tag}</span>)}
                            </div>
                        </div>
                    }
                    {prompt.customGptUrl &&
                        <div className="p-4 bg-stannum/10 border border-stannum/30 rounded-lg">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-semibold text-stannum mb-1">🎯 GPT Personalizado Disponible</p>
                                    <p className="text-xs text-card-lightest">Este prompt incluye un GPT personalizado listo para usar</p>
                                </div>
                                <a
                                    href={prompt.customGptUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 px-4 py-2 bg-stannum text-card rounded-lg text-sm font-semibold hover:bg-stannum/90 transition-colors flex items-center justify-center gap-2"
                                >
                                    Abrir GPT
                                    <HiOutlineExternalLink />
                                </a>
                            </div>
                        </div>
                    }
                    <div className="border-b border-card-light">
                        <div className="flex gap-4">
                            <button onClick={() => setActiveTab('prompt')} className={`pb-3 px-2 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'prompt' ? 'border-stannum text-stannum' : 'border-transparent text-card-lighter hover:text-card-lightest'}`}>
                                Prompt Completo
                            </button>
                            {prompt.exampleOutput &&
                                <button onClick={() => setActiveTab('example')} className={`pb-3 px-2 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'example' ? 'border-stannum text-stannum' : 'border-transparent text-card-lighter hover:text-card-lightest'}`}>
                                    Ejemplo de Output
                                </button>
                            }
                        </div>
                    </div>
                    {activeTab === 'prompt' &&
                        <div className="space-y-3">
                            <div className="flex justify-end">
                                <button
                                    type='button'
                                    onClick={handleCopy}
                                    disabled={isProcessing}
                                    className="px-4 py-2 bg-stannum text-card rounded-lg text-sm font-semibold hover:bg-stannum/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    {showCopiedFeedback ?
                                        <>
                                            <TbCheck className="text-base" />
                                            ¡Copiado!
                                        </>
                                    :
                                        <>
                                            <TbCopy className="text-base" />
                                            Copiar Prompt
                                        </>
                                    }
                                </button>
                            </div>
                            <div className="p-4 bg-card-light border border-card-lighter rounded-lg">
                                <pre className="text-sm text-card-lightest whitespace-pre-wrap font-mono leading-relaxed">
                                    {prompt.content}
                                </pre>
                            </div>
                        </div>
                    }
                    {activeTab === 'example' && prompt.exampleOutput &&
                        <div className="p-4 bg-card-light border border-card-lighter rounded-lg">
                            <pre className="text-sm text-card-lightest whitespace-pre-wrap font-mono leading-relaxed">
                                {prompt.exampleOutput}
                            </pre>
                        </div>
                    }
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
                                    <p className="text-sm font-semibold text-card-lightest">{prompt.author.username}</p>
                                    <p className="text-xs text-card-lighter">
                                        Creado el {new Date(prompt.createdAt).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type='button'
                                    onClick={handleLike}
                                    disabled={isProcessing}
                                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50 ${ prompt.userActions?.hasLiked ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-stannum' }`}
                                >
                                    {prompt.userActions?.hasLiked ? <BiSolidLike className="text-base" /> : <BiLike className="text-base" />}
                                    {prompt.metrics.likesCount}
                                </button>
                                <button
                                    type='button'
                                    onClick={handleFavorite}
                                    disabled={isProcessing}
                                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50 ${prompt.userActions?.hasFavorited ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-stannum'}`}
                                >
                                    {prompt.userActions?.hasFavorited ? <BookmarkedIcon className="text-base" /> : <BookmarkIcon className="text-base" />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 p-4 bg-card-light border border-card-lighter rounded-lg">
                        <div>
                            <p className="text-xs text-card-lighter mb-1">Score de Popularidad</p>
                            <p className="text-2xl font-bold text-stannum">{prompt.popularityScore.toFixed(0)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-card-lighter mb-1">Tasa de Engagement</p>
                            <p className="text-2xl font-bold text-stannum">{prompt.engagementRate}%</p>
                        </div>
                    </div>
                </div>
            : null}
        </Modal>
    );
};