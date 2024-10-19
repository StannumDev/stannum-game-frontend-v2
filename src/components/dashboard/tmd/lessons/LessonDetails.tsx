'use client'

import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { BookmarkedIcon, BookmarkIcon, CheckIcon, CrossIcon } from "@/icons";
import { ChangeLessonsButtons } from "@/components";

export const LessonDetails = () => {

    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    return (
        <div className="w-full card flex flex-col">
            <p className="subtitle-1">Pretemporada | Módulo 01</p>
            <div className="w-full flex justify-between gap-4">
                <div className="flex flex-col">
                    <h1 className="title-2">Organización digital</h1>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                    { isSaved ?
                        <motion.button
                            key={'isNotSaved'}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 1 }}
                            transition={{ type: 'spring', bounce: 0.5, duration: 0.25 }}
                            type="button"
                            onClick={() => setIsSaved(!isSaved)}
                            className="size-6 flex justify-center items-center shrink-0 group"
                        >
                            <BookmarkedIcon className="size-5 text-white/75 group-hover:text-white transition-200"/>
                        </motion.button>
                    :
                        <motion.button
                            key={'isSaved'}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 1 }}
                            transition={{ type: 'spring', bounce: 0.5, duration: 0.25 }}
                            type="button"
                            onClick={() => setIsSaved(!isSaved)}
                            className="size-6 flex justify-center items-center shrink-0 group"
                        >
                                <BookmarkIcon className="size-5 text-stannum group-hover:text-stannum/75 transition-200"/>
                        </motion.button>
                    }
                </AnimatePresence>
            </div>
            <span className="my-4 lg:mb-6 block w-full h-px bg-card-light"></span>
            <div className="mb-4 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-0">
                <div className="col-span-1 lg:col-span-3 max-h-64 lg:max-h-none pr-4 lg:pr-0 text-sm flex flex-col gap-2 overflow-y-auto">
                    <p>El gran paso entre una organización personal y una organización a nivel empresa es el tamaño, pasamos de ser lo únicos miembros a compartir un espacio de trabajo con un numero de personas mucho mas grande, es por eso que consideramos importante trabajar este pilar el cual consideramos fundamental.</p>
                    <p>En esta lección aprenderás la importancia de la organización digital, en que consiste, porque es relevante en la actualidad tener un mando centralizado en la nube, cuales son sus beneficios y sobre todo cual es la forma mas eficiente de poder llevar la organización digital en una empresa.</p>
                    <p>El gran paso entre una organización personal y una organización a nivel empresa es el tamaño, pasamos de ser lo únicos miembros a compartir un espacio de trabajo con un numero de personas mucho mas grande, es por eso que consideramos importante trabajar este pilar el cual consideramos fundamental.</p>
                    <p>En esta lección aprenderás la importancia de la organización digital, en que consiste, porque es relevante en la actualidad tener un mando centralizado en la nube, cuales son sus beneficios y sobre todo cual es la forma mas eficiente de poder llevar la organización digital en una empresa.</p>
                    <p>El gran paso entre una organización personal y una organización a nivel empresa es el tamaño, pasamos de ser lo únicos miembros a compartir un espacio de trabajo con un numero de personas mucho mas grande, es por eso que consideramos importante trabajar este pilar el cual consideramos fundamental.</p>
                    <p>En esta lección aprenderás la importancia de la organización digital, en que consiste, porque es relevante en la actualidad tener un mando centralizado en la nube, cuales son sus beneficios y sobre todo cual es la forma mas eficiente de poder llevar la organización digital en una empresa.</p>
                </div>
                <div className="hidden lg:block"></div>
                <div className="flex flex-col gap-4 lg:pl-8">
                    <h2 className="title-3">Detalles</h2>
                    <div className="grid grid-cols-2 lg:flex lg:flex-col gap-4">
                        <div className="flex flex-col">
                            <h2 className="subtitle-1">Estado</h2>
                            { isCompleted ?
                                <p className="title-3 font-thin text-stannum/75 flex items-center gap-1">
                                    <CheckIcon/>
                                    Completado
                                </p>
                            :
                                <p className="title-3 font-thin text-invalid/75 flex items-center gap-1">
                                    <CrossIcon className="text-sm"/>
                                    Pendiente
                                </p>
                            }

                        </div>
                        <div className="flex flex-col">
                            <h2 className="subtitle-1">Recompensa</h2>
                            <p className="title-3 font-thin text-stannum/75">250 XP</p>
                        </div>
                    </div>
                </div>
            </div>
            <ChangeLessonsButtons setIsCompleted={setIsCompleted}/>
        </div>
    )
}
