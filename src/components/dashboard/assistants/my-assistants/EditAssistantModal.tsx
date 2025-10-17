'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import { CrossIcon, SpinnerIcon } from '@/icons';
import { updateAssistant } from '@/services';
import { errorHandler } from '@/helpers';
import { categoryOptions, difficultyOptions, platformOptions, ASSISTANT_PLATFORMS, ASSISTANT_CATEGORIES, ASSISTANT_DIFFICULTIES } from '@/helpers/assistants';
import { AssistantDifficulty, AssistantPlatform } from '@/interfaces';
import type { MyAssistantCard } from '@/interfaces';
import { FormErrorMessage } from '@/components';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => Promise<void>;
    assistant: MyAssistantCard;
}

const schema = z.object({
    title: z.string().min(1, 'Campo requerido').max(80, 'Debe contener menos de 80 caracteres').trim(),
    description: z.string().min(10, 'Campo requerido').max(500, 'Debe contener menos de 500 caracteres').trim(),
    assistantUrl: z.string().min(1, 'Campo requerido').url('Debe ser una URL válida').trim(),
    category: z.enum(ASSISTANT_CATEGORIES, { errorMap: () => ({ message: 'Debes seleccionar una categoría' }) }),
    difficulty: z.enum(ASSISTANT_DIFFICULTIES).default('basic'),
    platform: z.enum(ASSISTANT_PLATFORMS, { errorMap: () => ({ message: 'Debes seleccionar una plataforma' }) }),
    tags: z.array(z.string().min(2, 'Cada tag debe tener al menos 2 caracteres').max(30, 'Cada tag no puede exceder 30 caracteres').regex(/^[a-záéíóúüñ0-9\s\-_.]+$/, 'Solo se permiten letras minúsculas, números, guiones, guiones bajos, puntos y espacios')).max(10, 'No puedes añadir más de 10 tags').default([]),
    useCases: z.string().max(1000, 'Debe contener menos de 1000 caracteres').trim().optional(),
});

type Schema = z.infer<typeof schema>;

export const EditAssistantModal = ({ isOpen, onClose, onSuccess, assistant }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tagInput, setTagInput] = useState('');

    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<Schema>({ resolver: zodResolver(schema),
        defaultValues: { 
            title: assistant.title,
            description: assistant.description,
            assistantUrl: assistant.assistantUrl,
            category: assistant.category,
            difficulty: assistant.difficulty,
            platform: assistant.platform,
            tags: assistant.tags,
            useCases: assistant.useCases || '',
        } 
    });

    const watchedPlatform = watch('platform');
    const watchedTags = watch('tags') || [];
    const watchedCategory = watch('category');
    const watchedDifficulty = watch('difficulty');

    useEffect(() => {
        if (assistant && isOpen) {
            reset({
                title: assistant.title,
                description: assistant.description,
                assistantUrl: assistant.assistantUrl,
                category: assistant.category,
                difficulty: assistant.difficulty,
                platform: assistant.platform,
                tags: assistant.tags,
                useCases: assistant.useCases || '',
            });
            setTagInput('');
        }
    }, [assistant, isOpen, reset]);

    const submitAssistant = async (data: Schema, visibility: 'published' | 'draft') => {
        setIsLoading(true);
        try {
            await updateAssistant(assistant.id, {
                ...data,
                visibility,
            });
            await onSuccess();
            onClose();
        } catch (error: unknown) {
            errorHandler(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onPublish: SubmitHandler<Schema> = (data) => submitAssistant(data, 'published');
    const onSaveDraft: SubmitHandler<Schema> = (data) => submitAssistant(data, 'draft');

    const addTag = () => {
        const trimmed = tagInput.trim().toLowerCase();
        if (trimmed.includes(',')) {
            const newTags = trimmed.split(',').map(tag => tag.trim()).filter(tag => tag.length >= 2 && !watchedTags.includes(tag));
            const tagsToAdd = newTags.slice(0, 10 - watchedTags.length);
            if (tagsToAdd.length > 0) {
                setValue('tags', [...watchedTags, ...tagsToAdd], { shouldValidate: true });
                setTagInput('');
            }
        } else if (trimmed && !watchedTags.includes(trimmed) && watchedTags.length < 10) {
            setValue('tags', [...watchedTags, trimmed], { shouldValidate: true });
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => setValue('tags', watchedTags.filter((t) => t !== tag), { shouldValidate: true });
    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-card border-l border-card-light z-50 overflow-y-auto"
                >
                    <form className="p-6 space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-card-light">
                            <div>
                                <h2 className="text-2xl font-bold">Editar Asistente</h2>
                                <p className="subtitle-1 mt-1">Modifica tu asistente borrador antes de publicarlo</p>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isLoading}
                                className="p-2 rounded-lg hover:bg-card-light transition-colors"
                            >
                                <CrossIcon className="text-xl" />
                            </button>
                        </div>
                        <div className="w-full grid grid-cols-1 gap-4">
                            <div className="w-full">
                                <div className="w-full flex flex-col gap-1">
                                    <label htmlFor="title" className="text-sm font-semibold required">Título</label>
                                    <input
                                        {...register('title')}
                                        type="text"
                                        id="title"
                                        enterKeyHint="next"
                                        maxLength={80}
                                        placeholder="Ej: Asistente de Ventas B2B"
                                        disabled={isLoading}
                                        className="w-full px-4 py-2.5 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum disabled:opacity-50 transition-colors"
                                    />
                                </div>
                                <FormErrorMessage condition={errors?.title} message={errors?.title?.message} className="mt-2"/>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex flex-col gap-1">
                                    <label htmlFor="description" className="text-sm font-semibold required">Descripción</label>
                                    <textarea
                                        {...register('description')}
                                        id="description"
                                        rows={3}
                                        minLength={10}
                                        maxLength={500}
                                        placeholder="Describe brevemente qué hace tu asistente y para quién es útil..."
                                        disabled={isLoading}
                                        className="w-full px-4 py-2.5 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum disabled:opacity-50 resize-none transition-colors"
                                    />
                                </div>
                                <FormErrorMessage condition={errors?.description} message={errors?.description?.message} className="mt-2"/>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex flex-col gap-1">
                                    <label htmlFor="assistantUrl" className="text-sm font-semibold required">URL del Asistente</label>
                                    <input
                                        {...register('assistantUrl')}
                                        type="url"
                                        id="assistantUrl"
                                        enterKeyHint="next"
                                        placeholder="https://chat.openai.com/g/g-..."
                                        disabled={isLoading}
                                        className="w-full px-4 py-2.5 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum disabled:opacity-50 transition-colors"
                                    />
                                </div>
                                <FormErrorMessage condition={errors?.assistantUrl} message={errors?.assistantUrl?.message} className="mt-2"/>
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-semibold mb-2 required">Categoría</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {categoryOptions.map((cat) => {
                                        const Icon = cat.icon!;
                                        const isSelected = watchedCategory === cat.value;
                                        return (
                                            <button
                                                key={cat.value}
                                                type="button"
                                                disabled={isLoading}
                                                onClick={() => setValue('category', cat.value as typeof ASSISTANT_CATEGORIES[number], { shouldValidate: true })}
                                                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50 ${ isSelected ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-card-lighter'}`}
                                            >
                                                <Icon className="text-base" />
                                                {cat.label}
                                            </button>
                                        );
                                    })}
                                </div>
                                <FormErrorMessage condition={errors?.category} message={errors?.category?.message} className="mt-2"/>
                            </div>
                            <div className="w-full">
                                <label className="text-sm font-semibold required">Complejidad</label>
                                <div className="mt-2 grid grid-cols-3 gap-2">
                                    {difficultyOptions.map((diff) => {
                                        const Icon = diff.icon!;
                                        const isSelected = watchedDifficulty === diff.value;
                                        return (
                                            <button
                                                key={diff.value}
                                                type="button"
                                                disabled={isLoading}
                                                onClick={() => setValue('difficulty', diff.value as AssistantDifficulty)}
                                                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 justify-center disabled:opacity-50 ${ isSelected ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-card-lighter'}`}
                                            >
                                                <Icon className="text-base" />
                                                {diff.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-semibold mb-2 required">Plataforma</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {platformOptions.map((platform) => {
                                        const isSelected = watchedPlatform === platform.value;
                                        const Icon = platform.icon;
                                        const isDisabled = platform.disabled || isLoading;
                                        return (
                                            <button
                                                key={platform.value}
                                                type="button"
                                                disabled={isDisabled}
                                                onClick={() => !platform.disabled && setValue('platform', platform.value as AssistantPlatform, { shouldValidate: true })}
                                                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 relative ${ isSelected ? 'bg-stannum/20 border-stannum text-stannum' : platform.disabled ? 'bg-card-light/50 border-card-lighter text-card-lighter' : 'bg-card border-card-light hover:border-card-lighter'}`}
                                            >
                                                {Icon && <Icon className="text-base" />}
                                                {platform.label}
                                                {platform.disabled && <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-card-lighter text-card text-[9px] rounded-full font-bold">PRÓX</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                                <FormErrorMessage condition={errors?.platform} message={errors?.platform?.message} className="mt-2"/>
                            </div>
                            <div className="w-full">
                                <label className="text-sm font-semibold">Tags (máx. 10)</label>
                                <div className="my-2 flex gap-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        disabled={isLoading || watchedTags.length >= 10}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        placeholder="Escribe un tag y presiona Enter"
                                        className="flex-1 px-4 py-2 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum disabled:opacity-50 transition-colors"
                                    />
                                    <button
                                        type="button"
                                        disabled={isLoading || watchedTags.length >= 10}
                                        onClick={addTag}
                                        className="px-4 py-2 bg-stannum/20 border border-stannum text-stannum rounded-lg text-sm font-semibold disabled:opacity-50"
                                    >
                                        Añadir
                                    </button>
                                </div>
                                {watchedTags.length > 0 &&
                                    <div className="flex flex-wrap gap-1.5">
                                        {watchedTags.map((tag) => (
                                            <span key={tag} className="px-2.5 py-1 bg-card-light border border-card-lighter rounded-full text-xs flex items-center gap-1.5">
                                                #{tag}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag(tag)}
                                                    disabled={isLoading}
                                                    className="hover:text-invalid transition-colors disabled:opacity-50"
                                                >
                                                    <CrossIcon className="text-xs" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                }
                                <FormErrorMessage condition={!!errors?.tags} message={errors?.tags?.message} className="mt-2"/>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex flex-col gap-1">
                                    <label htmlFor="useCases" className="text-sm font-semibold">Casos de Uso</label>
                                    <textarea
                                        {...register('useCases')}
                                        id="useCases"
                                        rows={4}
                                        maxLength={1000}
                                        placeholder="Describe casos de uso específicos, ejemplos de aplicación, o para qué tipo de usuario es ideal..."
                                        disabled={isLoading}
                                        className="w-full px-4 py-2.5 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum disabled:opacity-50 resize-none transition-colors"
                                    />
                                </div>
                                <FormErrorMessage condition={errors?.useCases} message={errors?.useCases?.message} className="mt-2"/>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4 border-t border-card-light">
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={handleSubmit(onSaveDraft)}
                                className="flex-1 px-6 py-3 bg-card border border-stannum text-stannum rounded-lg font-semibold hover:bg-stannum/10 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isLoading ? <SpinnerIcon className="animate-spin" /> : (
                                    <>
                                        <HiOutlineDocumentDuplicate className="text-base" />
                                        Guardar Borrador
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={handleSubmit(onPublish)}
                                className="flex-1 px-6 py-3 bg-stannum text-card rounded-lg font-semibold hover:bg-stannum/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isLoading ? <SpinnerIcon className="animate-spin" /> : 'Publicar asistente'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </> }
        </AnimatePresence>
    );
};