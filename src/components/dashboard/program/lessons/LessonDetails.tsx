'use client';

// import { useState } from "react";
// import { AnimatePresence, motion } from 'framer-motion';
// import { BookmarkedIcon, BookmarkIcon, CheckIcon, CrossIcon } from "@/icons";
// import { ChangeLessonsButtons } from "@/components";
import type { Lesson } from "@/interfaces";

interface Props {
    lesson: Lesson;
    completed?: boolean;
}

export const LessonDetails = ({ lesson }: Props) => {
    // const [isSaved, setIsSaved] = useState<boolean>(false);

    return (
        <div className="mt-6 w-full flex flex-col">
            <p className="subtitle-1">Pretemporada | Módulo 01</p>
            <div className="w-full flex justify-between gap-4">
                <div className="flex flex-col">
                    <h1 className="title-2">{lesson.title}</h1>
                </div>
                {/* <AnimatePresence mode="wait" initial={false}>
                    {isSaved ? (
                        <motion.button
                            key="isSaved"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: 'spring', bounce: 0.5, duration: 0.25 }}
                            type="button"
                            onClick={() => setIsSaved(false)}
                            className="size-6 flex justify-center items-center shrink-0 group"
                        >
                            <BookmarkedIcon className="size-5 text-stannum group-hover:text-stannum/75 transition-200" />
                        </motion.button>
                    ) : (
                        <motion.button
                            key="isNotSaved"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: 'spring', bounce: 0.5, duration: 0.25 }}
                            type="button"
                            onClick={() => setIsSaved(true)}
                            className="size-6 flex justify-center items-center shrink-0 group"
                        >
                            <BookmarkIcon className="size-5 text-white/75 group-hover:text-white transition-200" />
                        </motion.button>
                    )}
                </AnimatePresence> */}
            </div>
            <span className="my-4 lg:mb-6 block w-full h-px bg-card-light"></span>
            <div className="mb-4 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-0">
                <div className="col-span-1 lg:col-span-3 max-h-64 lg:max-h-none pr-4 lg:pr-0 text-sm flex flex-col gap-2 overflow-y-auto">
                    {lesson.description?.split('\n').map((p, i) => (
                        <p key={i}>{p}</p>
                    )) || (
                        <p>No hay descripción disponible para esta lección.</p>
                    )}
                </div>

                {/* <div className="hidden lg:block"></div>

                <div className="flex flex-col gap-4 lg:pl-8">
                <h2 className="title-3">Detalles</h2>
                <div className="grid grid-cols-2 lg:flex lg:flex-col gap-4">
                    <div className="flex flex-col">
                    <h2 className="subtitle-1">Estado</h2>
                    {isCompleted ? (
                        <p className="title-3 font-thin text-stannum/75 flex items-center gap-1">
                        <CheckIcon />
                        Completado
                        </p>
                    ) : (
                        <p className="title-3 font-thin text-invalid/75 flex items-center gap-1">
                        <CrossIcon className="text-sm" />
                        Pendiente
                        </p>
                    )}
                    </div>

                    <div className="flex flex-col">
                    <h2 className="subtitle-1">Recompensa</h2>
                    <p className="title-3 font-thin text-stannum/75">{rewardXP} XP</p>
                    </div>
                </div>
                </div> */}
            </div>

            {/* <ChangeLessonsButtons setIsCompleted={setIsCompleted} /> */}
        </div>
    );
};