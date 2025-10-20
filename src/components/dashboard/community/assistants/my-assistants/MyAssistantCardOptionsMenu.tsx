'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toggleVisibility } from '@/services';
import { errorHandler } from '@/helpers';
import type { AssistantVisibility } from '@/interfaces';
import { EditIcon, HidePasswordIcon, OptionsIcon, ShowPasswordIcon } from '@/icons';

interface Props {
    assistantId: string;
    currentVisibility: AssistantVisibility;
    onVisibilityChanged: (newVisibility: AssistantVisibility) => void;
    onEdit?: () => void;
}

export const MyAssistantCardOptionsMenu = ({ assistantId, currentVisibility, onVisibilityChanged, onEdit }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleToggle = async (newVisibility: AssistantVisibility) => {
        if (isProcessing || newVisibility === currentVisibility) return;
        setIsProcessing(true);
        try {
            await toggleVisibility(assistantId, newVisibility);
            onVisibilityChanged(newVisibility);
            setIsOpen(false);
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit();
            setIsOpen(false);
        }
    };

    const getAvailableOptions = () => {
        const options = [];
        if (currentVisibility === 'draft') {
            options.push({ 
                value: 'edit', 
                label: 'Editar', 
                icon: EditIcon, 
                action: handleEdit 
            });
            options.push({ 
                value: 'published' as AssistantVisibility, 
                label: 'Publicar', 
                icon: ShowPasswordIcon, 
                action: () => handleToggle('published') 
            });
        }
        if (currentVisibility === 'published') {
            options.push({ 
                value: 'hidden' as AssistantVisibility, 
                label: 'Ocultar', 
                icon: HidePasswordIcon, 
                action: () => handleToggle('hidden') 
            });
        }
        if (currentVisibility === 'hidden') {
            options.push({ 
                value: 'published' as AssistantVisibility, 
                label: 'Publicar', 
                icon: ShowPasswordIcon, 
                action: () => handleToggle('published') 
            });
        }
        return options;
    };

    const availableOptions = getAvailableOptions();
    if (availableOptions.length === 0) return null;

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-lg border border-card-light hover:border-card-lighter transition-colors"
                aria-haspopup="menu"
                aria-expanded={isOpen}
            >
                <OptionsIcon className="text-base" />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                        className="absolute top-full right-0 mt-2 bg-card border border-card-light rounded-lg shadow-lg p-2 z-20 min-w-[180px]"
                        role="menu"
                    >
                        <div className="flex items-center justify-between px-2 pb-1">
                            <span className="text-[11px] text-card-lighter font-semibold">Opciones</span>
                        </div>
                        <ul className="w-full space-y-1">
                            {availableOptions.map((option) => {
                                const Icon = option.icon;
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={option.action}
                                        disabled={isProcessing}
                                        className="w-full px-3 py-2 rounded-md text-xs font-medium transition-all text-left flex items-center gap-2 hover:bg-card-light disabled:opacity-50"
                                        role="menuitem"
                                    >
                                        <Icon className="text-sm shrink-0" />
                                        <span>{option.label}</span>
                                    </button>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};