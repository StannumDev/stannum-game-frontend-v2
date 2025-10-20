'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CrossIcon, SpinnerIcon, CheckIcon, EditIcon } from '@/icons';
import { createPrompt } from '@/services';
import { errorHandler } from '@/helpers';
import { categoryOptions, difficultyOptions, platformOptions, PROMPT_PLATFORMS, PROMPT_CATEGORIES, PROMPT_DIFFICULTIES } from '@/helpers/prompts';
import { FormErrorMessage } from '@/components';
import { PromptDifficulty, PromptPlatform } from '@/interfaces';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => Promise<void>;
}

const schema = z.object({
    title: z.string().min(5, 'El título debe tener al menos 5 caracteres').max(80, 'Debe contener menos de 80 caracteres').trim(),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres').max(500, 'Debe contener menos de 500 caracteres').trim(),
    content: z.string().min(10, 'El prompt debe tener al menos 10 caracteres').max(8000, 'El prompt no puede exceder 8000 caracteres').trim(),
    category: z.enum(PROMPT_CATEGORIES, { errorMap: () => ({ message: 'Debes seleccionar una categoría' }) }),
    difficulty: z.enum(PROMPT_DIFFICULTIES).default('basic'),
    platforms: z.array(z.enum(PROMPT_PLATFORMS)).min(1, 'Debes seleccionar al menos una plataforma'),
    tags: z.array(z.string().min(2, 'Cada tag debe tener al menos 2 caracteres').max(30, 'Cada tag no puede exceder 30 caracteres').regex(/^[a-záéíóúüñ0-9\s\-_.]+$/, 'Solo se permiten letras, números, guiones, guiones bajos, puntos y espacios')).max(10, 'No puedes añadir más de 10 tags').default([]),
    customGptUrl: z.union([z.literal(''), z.string().url('Debe ser una URL válida')]).optional(),
    exampleOutput: z.union([z.literal(''), z.string().max(2000, 'El ejemplo no puede exceder 2000 caracteres')]).optional(),
});

type Schema = z.infer<typeof schema>;

export const CreatePromptModal = ({ isOpen, onClose, onSuccess }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tagInput, setTagInput] = useState('');

    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<Schema>({ 
        resolver: zodResolver(schema), 
        defaultValues: { 
            difficulty: 'basic', 
            platforms: [], 
            tags: [],
            customGptUrl: '',
            exampleOutput: ''
        } 
    });

    const watchedPlatforms = watch('platforms') || [];
    const watchedTags = watch('tags') || [];
    const watchedCategory = watch('category');
    const watchedDifficulty = watch('difficulty');

    const handleClose = () => {
        reset();
        setTagInput('');
        onClose();
    };

    const submitPrompt = async (data: Schema, visibility: 'published' | 'draft') => {
        setIsLoading(true);
        try {
            console.log(data, visibility)
            await createPrompt({
                title: data.title,
                description: data.description,
                content: data.content,
                category: data.category,
                difficulty: data.difficulty,
                platforms: data.platforms,
                customGptUrl: data.customGptUrl || undefined,
                tags: data.tags,
                exampleOutput: data.exampleOutput || undefined,
                visibility,
            });
            await onSuccess();
            handleClose();
        } catch (error: unknown) {
            console.log(error)
            errorHandler(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onPublish: SubmitHandler<Schema> = (data) => submitPrompt(data, 'published');
    const onSaveDraft: SubmitHandler<Schema> = (data) => submitPrompt(data, 'draft');

    const togglePlatform = (platform: typeof PROMPT_PLATFORMS[number]) => {
        const current = watchedPlatforms;
        const newPlatforms = current.includes(platform) ? current.filter((p) => p !== platform) : [...current, platform];
        setValue('platforms', newPlatforms, { shouldValidate: true });
    };

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
                    onClick={handleClose}
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
                                <h2 className="text-2xl font-bold">Añadir un Prompt</h2>
                                <p className="subtitle-1 mt-1">Comparte tu prompt de IA con la comunidad STANNUM</p>
                            </div>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="p-2 rounded-lg hover:bg-card-light transition-colors"
                                disabled={isLoading}
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
                                        placeholder="Ej: Asistente de Redacción de Emails Comerciales"
                                        disabled={isLoading}
                                        className="w-full px-4 py-2.5 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum disabled:opacity-50 transition-colors"
                                    />
                                </div>
                                <FormErrorMessage condition={errors.title} message={errors?.title?.message} className="mt-2"/>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex flex-col gap-1">
                                    <label htmlFor="description" className="text-sm font-semibold required">Descripción</label>
                                    <textarea
                                        {...register('description')}
                                        id="description"
                                        rows={3}
                                        maxLength={500}
                                        placeholder="Describe brevemente qué hace tu prompt y para quién es útil..."
                                        disabled={isLoading}
                                        className="w-full px-4 py-2.5 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum disabled:opacity-50 resize-none transition-colors"
                                    />
                                </div>
                                <FormErrorMessage condition={errors.description} message={errors?.description?.message} className="mt-2"/>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex flex-col gap-1">
                                    <label htmlFor="content" className="text-sm font-semibold required">Prompt Completo</label>
                                    <textarea
                                        {...register('content')}
                                        id="content"
                                        rows={8}
                                        maxLength={8000}
                                        placeholder="Pega aquí el prompt completo que quieres compartir..."
                                        disabled={isLoading}
                                        className="w-full px-4 py-2.5 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum disabled:opacity-50 resize-none transition-colors font-mono"
                                    />
                                </div>
                                <FormErrorMessage condition={errors.content} message={errors?.content?.message} className="mt-2"/>
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
                                                onClick={() => setValue('category', cat.value as "sales" | "productivity" | "marketing" | "innovation" | "leadership" | "strategy" | "automation" | "content" | "analysis" | "growth", { shouldValidate: true })}
                                                disabled={isLoading}
                                                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50 ${ isSelected ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-card-lighter'}`}
                                            >
                                                <Icon className="text-base" />
                                                {cat.label}
                                            </button>
                                        );
                                    })}
                                </div>
                                <FormErrorMessage condition={errors.category} message={errors?.category?.message} className="mt-2"/>
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
                                                onClick={() => setValue('difficulty', diff.value as PromptDifficulty)}
                                                disabled={isLoading}
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
                                <label className="block text-sm font-semibold mb-2 required">Plataformas</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {platformOptions.map((platform) => {
                                        const isSelected = watchedPlatforms.includes(platform.value as PromptPlatform);
                                        const Icon = platform.icon;
                                        return (
                                            <button
                                                key={platform.value}
                                                type="button"
                                                onClick={() => togglePlatform(platform.value as PromptPlatform)}
                                                disabled={isLoading}
                                                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all disabled:opacity-50 flex items-center gap-2 ${ isSelected ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-card-lighter'}`}
                                            >
                                                {Icon && <Icon className="text-base" />}
                                                {platform.label}
                                                {isSelected && <CheckIcon className="inline ml-1 text-xs" />}
                                            </button>
                                        );
                                    })}
                                </div>
                                <FormErrorMessage condition={!!errors.platforms} message={errors?.platforms?.message} className="mt-2"/>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex flex-col gap-1">
                                    <label htmlFor="customGptUrl" className="text-sm font-semibold">URL de GPT Personalizado (opcional)</label>
                                    <input
                                        {...register('customGptUrl')}
                                        type="url"
                                        id="customGptUrl"
                                        enterKeyHint="next"
                                        placeholder="https://chat.openai.com/g/g-..."
                                        disabled={isLoading}
                                        className="w-full px-4 py-2.5 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum disabled:opacity-50 transition-colors"
                                    />
                                </div>
                                <FormErrorMessage condition={errors.customGptUrl} message={errors?.customGptUrl?.message} className="mt-2"/>
                            </div>
                            <div className="w-full">
                                <label className="text-sm font-semibold">Tags (máx. 10)</label>
                                <div className="my-2 flex gap-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        placeholder="Escribe un tag y presiona Enter"
                                        disabled={isLoading || watchedTags.length >= 10}
                                        className="flex-1 px-4 py-2 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum disabled:opacity-50 transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={addTag}
                                        disabled={isLoading || watchedTags.length >= 10}
                                        className="px-4 py-2 bg-stannum/20 border border-stannum text-stannum rounded-lg text-sm font-semibold disabled:opacity-50"
                                    >
                                        Añadir
                                    </button>
                                </div>
                                {watchedTags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {watchedTags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-1 bg-card-light border border-card-lighter rounded-full text-xs flex items-center gap-1.5"
                                            >
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
                                )}
                                <FormErrorMessage condition={!!errors.tags} message={errors?.tags?.message} className="mt-2"/>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex flex-col gap-1">
                                    <label htmlFor="exampleOutput" className="text-sm font-semibold">Ejemplo de Resultado (opcional)</label>
                                    <textarea
                                        {...register('exampleOutput')}
                                        id="exampleOutput"
                                        rows={4}
                                        maxLength={2000}
                                        placeholder="Muestra un ejemplo del tipo de respuesta que genera este prompt..."
                                        disabled={isLoading}
                                        className="w-full px-4 py-2.5 bg-card border border-card-light rounded-lg text-sm focus:outline-none focus:border-stannum disabled:opacity-50 resize-none transition-colors"
                                    />
                                </div>
                                <FormErrorMessage condition={errors.exampleOutput} message={errors?.exampleOutput?.message} className="mt-2"/>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4 border-t border-card-light">
                            <button
                                type="button"
                                onClick={handleSubmit(onSaveDraft)}
                                disabled={isLoading}
                                className="flex-1 px-6 py-3 bg-card border border-stannum text-stannum rounded-lg font-semibold hover:bg-stannum/10 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isLoading ? <SpinnerIcon className="animate-spin" /> : (
                                    <>
                                        <EditIcon className="text-base" />
                                        Guardar Borrador
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit(onPublish)}
                                disabled={isLoading}
                                className="flex-1 px-6 py-3 bg-stannum text-card rounded-lg font-semibold hover:bg-stannum/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isLoading ? <SpinnerIcon className="animate-spin" /> : 'Publicar Prompt'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </> }
        </AnimatePresence>
    );
};