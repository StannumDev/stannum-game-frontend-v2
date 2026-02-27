'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Module } from '@/interfaces';
import { ArrowDownIcon, PlayIcon, CompassIcon, ChestIcon } from '@/icons';

interface Props {
    module: Module;
    index: number;
    defaultOpen?: boolean;
}

export const ProgramModulePreview = ({ module, index, defaultOpen = false }: Props) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);


    return (
        <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0, delay: index * 0.05 }}
            className="w-full rounded-lg overflow-hidden border border-card"
        >
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex justify-between items-center p-4 transition-200 ${isOpen ? 'bg-card-light/50' : 'hover:bg-card-light/25'}`}
            >
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-card-light flex justify-center items-center shrink-0 text-sm font-black text-white/60">
                        {index < 10 ? `0${index}` : index}
                    </div>
                    <div className="flex flex-col items-start gap-0.5">
                        <span className="font-semibold text-sm text-start">{module.name}</span>
                        <div className="flex items-center gap-2 text-xs text-white/40">
                            <span className="flex items-center gap-1">
                                <PlayIcon className="size-3" />
                                {module.lessons.length} lecciones
                            </span>
                            {module.instructions.length > 0 && (
                                <span className="flex items-center gap-1">
                                    <CompassIcon className="size-3" />
                                    {module.instructions.length} {module.instructions.length === 1 ? 'instrucción' : 'instrucciones'}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <m.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', bounce: 0 }}
                >
                    <ArrowDownIcon className="size-4 text-white/50" />
                </m.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 flex flex-col gap-1">
                            {module.description && (
                                <p className="text-xs text-white/40 mb-2 pl-11">
                                    {module.description}
                                </p>
                            )}

                            {module.lessons.map((lesson, i) => (
                                <m.div
                                    key={lesson.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ type: 'spring', bounce: 0, delay: i * 0.03 }}
                                    className="flex items-center gap-3 py-1.5 px-2 rounded-md"
                                >
                                    <div className="size-6 rounded-full bg-card-light/50 flex justify-center items-center shrink-0">
                                        <PlayIcon className="size-3 text-white/40" />
                                    </div>
                                    <span className="text-sm truncate grow">{lesson.title}</span>
                                </m.div>
                            ))}

                            {module.instructions.length > 0 && (
                                <>
                                    <div className="my-2 flex items-center gap-2">
                                        <div className="h-px grow bg-card-light" />
                                        <span className="text-[10px] uppercase tracking-widest text-card-lightest">Instrucciones</span>
                                        <div className="h-px grow bg-card-light" />
                                    </div>
                                    {module.instructions.map((instruction, i) => (
                                        <m.div
                                            key={instruction.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ type: 'spring', bounce: 0, delay: (module.lessons.length + i) * 0.03 }}
                                            className="flex items-center gap-3 py-1.5 px-2 rounded-md"
                                        >
                                            <div className="size-6 rounded-full bg-stannum/10 flex justify-center items-center shrink-0">
                                                <CompassIcon className="size-3 text-stannum/60" />
                                            </div>
                                            <span className="text-sm text-white/70 truncate grow">{instruction.title}</span>
                                        </m.div>
                                    ))}
                                </>
                            )}

                            <m.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'spring', bounce: 0, delay: 0.2 }}
                                className="mt-2 p-2.5 rounded-lg border border-dashed border-amber-400/30 bg-amber-400/[0.04] flex items-center gap-3"
                            >
                                <div className="size-6 rounded-full bg-amber-400/15 flex justify-center items-center shrink-0">
                                    <ChestIcon className="size-3 text-amber-400" />
                                </div>
                                <span className="text-[11px] text-amber-400/80 font-semibold">
                                    Cofres de recompensa durante el modulo
                                </span>
                            </m.div>

                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </m.div>
    );
};
