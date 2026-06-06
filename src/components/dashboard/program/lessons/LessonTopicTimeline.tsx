'use client';

import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { getLessonChapters, type LessonChapter } from '@/services/trainer';

interface Props {
    programId: string;
    lessonId: string;
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s) % 60).padStart(2, '0')}`;

/**
 * Línea de tiempo por topics: capítulos del video (topic + minuto) que saltan al momento.
 * Reusa el evento `trainer:seek` que ya escucha LessonVideoPlayer (mismo lessonId → seek).
 */
export const LessonTopicTimeline = ({ programId, lessonId }: Props) => {
    const [chapters, setChapters] = useState<LessonChapter[] | null>(null); // null = cargando

    // Refetch por lección: con el layout compartido el player no remonta entre lecciones.
    useEffect(() => {
        let active = true;
        setChapters(null);
        getLessonChapters(programId, lessonId)
            .then((ch) => { if (active) setChapters(ch); })
            .catch(() => { if (active) setChapters([]); });
        return () => { active = false; };
    }, [programId, lessonId]);

    const seek = (startSec: number) => {
        window.dispatchEvent(new CustomEvent('trainer:seek', { detail: { lessonId, time: startSec } }));
    };

    // Cargando: skeleton. Vacío o error: no renderiza nada.
    if (chapters === null) {
        return (
            <section className="mt-8 w-full flex flex-col gap-2">
                <p className="subtitle-1">En este video</p>
                <div className="flex flex-col gap-1.5">
                    {[0, 1, 2, 3].map((i) => <div key={i} className="h-9 rounded-lg bg-card-light animate-pulse" />)}
                </div>
            </section>
        );
    }
    if (!chapters.length) return null;

    return (
        <section className="mt-8 w-full flex flex-col gap-2">
            <p className="subtitle-1">En este video</p>
            <ul className="flex flex-col gap-1">
                {chapters.map((c, i) => (
                    <li key={`${c.startSec}-${i}`}>
                        <button
                            onClick={() => seek(c.startSec)}
                            className="group w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg bg-card-light/50 hover:bg-card-light border border-transparent hover:border-stannum/30 transition-150"
                        >
                            <span className="shrink-0 w-14 flex items-center gap-1.5 text-[11px] font-mono tabular-nums text-stannum">
                                <Play className="size-3 shrink-0 fill-current" />
                                {fmt(c.startSec)}
                            </span>
                            <span className="text-sm text-white/70 group-hover:text-white leading-snug">{c.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};
