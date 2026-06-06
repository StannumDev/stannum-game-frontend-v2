'use client';

import { forwardRef, memo, useEffect, useRef, useState, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { X, Send, Play, ThumbsUp, ThumbsDown, Square, SquarePen } from 'lucide-react';
import { useTrainerFloatStore } from '@/stores/trainerFloatStore';
import { useTrainerChatStore, type ChatMessage } from '@/stores/trainerChatStore';
import { useUserStore } from '@/stores/userStore';
import type { TrainerCitation } from '@/services/trainer';
import stanImg from '@/assets/home/stan_help.webp';

// Saludo hardcodeado (por hora/día y según modo lección vs general) — sin llamada a la API.
function getGreeting(name?: string | null, general?: boolean): string {
    const h = new Date().getHours();
    const d = new Date().getDay(); // 0=dom, 6=sáb
    const isWeekend = d === 0 || d === 6;
    const n = name ? `, ${name.split(' ')[0]}` : '';

    if (general) {
        const opts = [
            `Hola${n}, soy STAN, tu entrenador. ¿En qué te ayudo con STANNUM hoy?`,
            `Acá estoy${n}. Preguntame lo que necesites de la plataforma o de tu entrenamiento.`,
            `Buenas${n}. ¿Qué querés saber? Dudas de la plataforma, tus programas, por dónde empezar, lo que sea.`,
        ];
        return opts[new Date().getDate() % opts.length];
    }
    if (isWeekend) {
        const opts = [
            `Bueno, entrenamos igual en finde. Preguntame lo que necesitás${n}.`,
            `Los campeones no descansan. ¿En qué te ayudo${n}?`,
            `Finde activo. Estoy acá para lo que necesités${n}.`,
        ];
        return opts[new Date().getDate() % opts.length];
    }
    if (h < 12) {
        const opts = [
            `Buen día${n}. Empezamos fuertes. ¿Qué dudas traés de esta lección?`,
            `Arrancamos${n}. ¿Qué te quedó poco claro?`,
            `Buenos días${n}. Estoy acá para lo que necesités.`,
        ];
        return opts[h % opts.length];
    }
    if (h < 19) {
        const opts = [
            `Buenas tardes${n}. ¿En qué te ayudo con esta lección?`,
            `Acá estoy${n}. ¿Qué querés revisar?`,
            `¿Qué parte de la lección te generó dudas${n}?`,
        ];
        return opts[h % opts.length];
    }
    const opts = [
        `Buenas noches${n}. Seguimos entrenando. ¿Qué necesitás?`,
        `Noche de estudio${n}. ¿En qué te ayudo?`,
        `Tarde, pero acá estoy${n}. ¿Qué dudas tenés?`,
    ];
    return opts[h % opts.length];
}

const fmtTime = (sec: number) => {
    const s = Math.max(0, Math.round(sec));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

// ---- Markdown liviano y TOLERANTE A PARCIALES (clave durante el streaming) ----
// Construye nodos React (sin innerHTML). Sintaxis sin cerrar (** huérfano, fence
// abierto, link a medias) se muestra como texto plano hasta que llega el cierre.

// Inline: **negrita**, *itálica*/_em_, `código`, [txt](url). Solo pares cerrados.
function renderInline(text: string, keyPrefix: string): ReactNode[] {
    const nodes: ReactNode[] = [];
    const re = /(\*\*([^*\n]+)\*\*)|(`([^`\n]+)`)|(\[([^\]\n]+)\]\(([^)\s]+)\))|(\*([^*\n]+)\*)|(_([^_\n]+)_)/g;
    let last = 0;
    let i = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
        if (m.index > last) nodes.push(text.slice(last, m.index));
        const key = `${keyPrefix}-${i++}`;
        if (m[2] != null) nodes.push(<strong key={key} className="font-bold">{m[2]}</strong>);
        else if (m[4] != null) nodes.push(<code key={key} className="px-1 py-0.5 rounded bg-black/30 text-[0.85em] font-mono">{m[4]}</code>);
        else if (m[6] != null) nodes.push(<a key={key} href={m[7]} target="_blank" rel="noopener noreferrer" className="text-stannum underline underline-offset-2 break-all">{m[6]}</a>);
        else if (m[9] != null) nodes.push(<em key={key} className="italic">{m[9]}</em>);
        else if (m[11] != null) nodes.push(<em key={key} className="italic">{m[11]}</em>);
        last = m.index + m[0].length;
    }
    if (last < text.length) nodes.push(text.slice(last));
    return nodes;
}

// Separa por fences ```; un fence final SIN cerrar se trata como texto (no abre un <pre> que se trague todo).
function splitFences(text: string): Array<{ type: 'text' | 'code'; content: string }> {
    const parts = text.split('```');
    const out: Array<{ type: 'text' | 'code'; content: string }> = [];
    for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) out.push({ type: 'text', content: parts[i] });
        else if (i === parts.length - 1) out.push({ type: 'text', content: '```' + parts[i] }); // fence abierto → plano
        else out.push({ type: 'code', content: parts[i] });
    }
    return out;
}

// Bloque de texto: agrupa viñetas/numeradas en listas; el resto en párrafos (saltos simples → <br>).
function TextBlock({ text, kp }: { text: string; kp: string }) {
    const lines = text.split('\n');
    const out: ReactNode[] = [];
    let para: ReactNode[] = [];
    let list: { ordered: boolean; items: string[] } | null = null;
    let k = 0;

    const flushPara = () => {
        if (para.length) { out.push(<p key={`${kp}-p${k++}`}>{para}</p>); para = []; }
    };
    const flushList = () => {
        if (!list) return;
        const items = list.items.map((it, j) => <li key={j}>{renderInline(it, `${kp}-li${k}-${j}`)}</li>);
        out.push(list.ordered
            ? <ol key={`${kp}-ol${k++}`} className="list-decimal pl-5 my-1 space-y-0.5">{items}</ol>
            : <ul key={`${kp}-ul${k++}`} className="list-disc pl-5 my-1 space-y-0.5">{items}</ul>);
        list = null;
    };

    for (const line of lines) {
        const bullet = line.match(/^\s*[-*]\s+(.*)$/);
        const ordered = line.match(/^\s*\d+\.\s+(.*)$/);
        if (bullet) {
            flushPara();
            if (!list || list.ordered) { flushList(); list = { ordered: false, items: [] }; }
            list.items.push(bullet[1]);
        } else if (ordered) {
            flushPara();
            if (!list || !list.ordered) { flushList(); list = { ordered: true, items: [] }; }
            list.items.push(ordered[1]);
        } else if (line.trim() === '') {
            flushList(); flushPara();
        } else {
            flushList();
            if (para.length) para.push(<br key={`${kp}-br${k++}`} />);
            para.push(...renderInline(line, `${kp}-l${k++}`));
        }
    }
    flushList();
    flushPara();
    return <>{out}</>;
}

function Markdown({ text }: { text: string }) {
    const blocks = splitFences(text);
    return (
        <>
            {blocks.map((b, i) =>
                b.type === 'code'
                    ? <pre key={i} className="my-1.5 p-2.5 rounded-lg bg-black/40 overflow-x-auto text-[0.8rem] font-mono whitespace-pre">{b.content.replace(/^\n/, '').replace(/\n$/, '')}</pre>
                    : <TextBlock key={i} text={b.content} kp={`b${i}`} />,
            )}
        </>
    );
}

const EMPTY_MESSAGES: ChatMessage[] = [];

const THREAD = 'stan'; // hilo único y continuo (STAN general); el contexto va por mensaje

const SUGGESTIONS_LESSON = [
    'Explicámelo más simple',
    'Dame un ejemplo práctico',
    'Qué tengo que recordar de esta lección',
];
const SUGGESTIONS_GENERAL = [
    '¿Por dónde empiezo?',
    '¿Cómo gano XP y subo de nivel?',
    '¿Para qué sirven las Tins?',
];

// Avatar de STAN reutilizable
const StanAvatar = ({ className = 'size-8' }: { className?: string }) => (
    <span className={`relative block ${className} shrink-0 rounded-full overflow-hidden bg-card-light ring-1 ring-white/10`}>
        <Image src={stanImg} alt="STAN" fill sizes="80px" className="object-cover object-top" />
    </span>
);

// Botón flotante que abre el chat (forwardRef para devolverle el foco al cerrar el panel).
// hasUnread: un stream completó con el panel cerrado → badge de notificación + label distinto.
const FloatButton = forwardRef<HTMLButtonElement, { onClick: () => void; hasUnread?: boolean }>(function FloatButton({ onClick, hasUnread }, ref) {
    return (
        <button
            ref={ref}
            onClick={onClick}
            aria-label={hasUnread ? 'STAN te respondió. Abrir chat' : 'Abrir chat con STAN'}
            className={`fixed bottom-5 right-5 z-[200] flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-stannum text-black font-bold shadow-lg shadow-black/40 active:scale-95 transition-150 ${hasUnread ? 'animate-in zoom-in-95 duration-300' : ''}`}
        >
            <span className="relative shrink-0">
                <StanAvatar className="size-9" />
                {hasUnread && (
                    <span className="absolute -top-0.5 -right-0.5 flex size-3">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-invalid opacity-75" />
                        <span className="relative inline-flex size-3 rounded-full bg-invalid ring-2 ring-stannum" />
                    </span>
                )}
            </span>
            <span className="text-sm">{hasUnread ? 'STAN te respondió' : 'Preguntale a STAN'}</span>
        </button>
    );
});

// Deriva el contexto del pathname: dentro de una lección → modo lección; si no → modo general.
const LESSON_PATH_RE = /\/dashboard\/library\/([^/?#]+)\/lessons\/([^/?#]+)/;
// Rutas donde NO mostramos el FAB (no distraer del pago). Mismas que oculta el Sidebar.
const HIDDEN_PREFIXES = ['/dashboard/checkout', '/dashboard/subscription/checkout', '/dashboard/subscription/result'];

export const TrainerChatFloat = () => {
    const { isOpen, open, close, hasUnread } = useTrainerFloatStore();
    const router = useRouter();
    const pathname = usePathname() || '';
    const lessonMatch = pathname.match(LESSON_PATH_RE);
    const programId = lessonMatch ? lessonMatch[1].toLowerCase() : null;
    const lessonId = lessonMatch ? lessonMatch[2] : null;
    const hidden = HIDDEN_PREFIXES.some((p) => pathname.startsWith(p));
    const fabRef = useRef<HTMLButtonElement | null>(null);
    const wasOpenRef = useRef(false);

    // Drag-to-dismiss (mobile): arrastrar el handle hacia abajo cierra.
    const [dragY, setDragY] = useState(0);
    const [dragging, setDragging] = useState(false);
    const dragStartY = useRef<number | null>(null);

    // Escape cierra + lock de scroll del body en mobile mientras está abierto.
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
        window.addEventListener('keydown', onKey);
        const isMobile = window.matchMedia('(max-width: 1023px)').matches;
        const prevOverflow = document.body.style.overflow;
        if (isMobile) document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow; // restaurar siempre (robusto ante rotación)
        };
    }, [isOpen, close]);

    // Al cerrar, devolver el foco al FAB (a11y).
    useEffect(() => {
        if (!isOpen && wasOpenRef.current) fabRef.current?.focus();
        wasOpenRef.current = isOpen;
    }, [isOpen]);

    if (hidden) return null;
    // key cambia al pasar a "sin leer" → remonta y dispara el pop de entrada una sola vez.
    if (!isOpen) return <FloatButton key={hasUnread ? 'unread' : 'idle'} ref={fabRef} onClick={open} hasUnread={hasUnread} />;

    const onHandleTouchStart = (e: React.TouchEvent) => { dragStartY.current = e.touches[0].clientY; setDragging(true); };
    const onHandleTouchMove = (e: React.TouchEvent) => {
        if (dragStartY.current == null) return;
        const dy = e.touches[0].clientY - dragStartY.current;
        setDragY(dy > 0 ? dy : 0);
    };
    const onHandleTouchEnd = () => {
        if (dragY > 100) close();
        dragStartY.current = null;
        setDragging(false);
        setDragY(0);
    };

    return (
        <>
            {/* Backdrop (solo mobile) */}
            <div className="fixed inset-0 z-[199] bg-black/60 backdrop-blur-sm lg:hidden" onClick={close} />

            {/* Panel flotante */}
            <div
                role="dialog"
                aria-label="Chat con STAN"
                style={{ transform: dragY ? `translateY(${dragY}px)` : undefined, transition: dragging ? 'none' : 'transform 0.2s ease' }}
                className="
                    fixed z-[200] bg-card border border-card-light overflow-hidden flex flex-col
                    bottom-0 left-0 right-0 h-[88vh] rounded-t-2xl
                    animate-in slide-in-from-bottom duration-300
                    lg:bottom-4 lg:right-4 lg:left-auto lg:w-[380px] lg:h-[calc(100vh-5rem)]
                    lg:rounded-xl lg:slide-in-from-bottom-0
                "
            >
                {/* Handle de arrastre (mobile) */}
                <div
                    className="shrink-0 flex justify-center pt-2.5 pb-1 cursor-grab active:cursor-grabbing lg:hidden touch-none"
                    onTouchStart={onHandleTouchStart}
                    onTouchMove={onHandleTouchMove}
                    onTouchEnd={onHandleTouchEnd}
                >
                    <span className="h-1 w-10 rounded-full bg-card-lighter" />
                </div>

                <ChatContent programId={programId} lessonId={lessonId} onClose={close} router={router} />
            </div>
        </>
    );
};

// Contenido del chat. Separado para que el panel pueda cambiar de lessonId sin desmontar.
function ChatContent({
    programId,
    lessonId: currentLessonId,
    onClose,
    router,
}: {
    programId: string | null;
    lessonId: string | null;
    onClose: () => void;
    router: ReturnType<typeof useRouter>;
}) {
    // Un solo hilo continuo ("stan") que sigue al usuario; programId/lessonId van por mensaje como contexto.
    const messages = useTrainerChatStore((s) => s.messagesByLesson[THREAD]) ?? EMPTY_MESSAGES;
    const loading = useTrainerChatStore((s) => s.loadingByLesson[THREAD] || false);
    const send = useTrainerChatStore((s) => s.send);
    const cancel = useTrainerChatStore((s) => s.cancel);
    const clear = useTrainerChatStore((s) => s.clear);
    const setFeedback = useTrainerChatStore((s) => s.setFeedback);
    const userName = useUserStore((s) => s.user?.profile?.name ?? null);
    const isLesson = !!currentLessonId;
    const greeting = getGreeting(userName, !isLesson);
    const suggestions = isLesson ? SUGGESTIONS_LESSON : SUGGESTIONS_GENERAL;

    const [input, setInput] = useState('');
    const [confirmingNew, setConfirmingNew] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const taRef = useRef<HTMLTextAreaElement | null>(null);

    const last = messages[messages.length - 1];
    const showTyping = loading && (!last || last.role === 'user');
    const streamingId = loading && last?.role === 'assistant' ? last.id : null;

    // Foco al input al abrir (solo desktop: en mobile evitamos abrir el teclado de golpe).
    useEffect(() => {
        if (window.matchMedia('(min-width: 1024px)').matches) taRef.current?.focus();
    }, []);

    useEffect(() => {
        // Instantáneo durante el stream (evita encolar smooth-scrolls por token); suave al cerrar el turno.
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: loading ? 'auto' : 'smooth' });
    }, [messages, loading]);

    useEffect(() => {
        const ta = taRef.current;
        if (!ta) return;
        ta.style.height = 'auto';
        ta.style.height = `${Math.min(ta.scrollHeight, 128)}px`;
    }, [input]);

    const submit = (text?: string) => {
        const q = (text ?? input).trim();
        if (!q || loading) return;
        send({ programId, lessonId: currentLessonId, question: q, threadKey: THREAD });
        setInput('');
    };

    const startNew = () => {
        cancel(THREAD); // corta un stream en curso antes de vaciar (evita un bot huérfano)
        clear(THREAD);
        setConfirmingNew(false);
        setInput('');
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    };

    const goToCitation = (c: TrainerCitation) => {
        if (currentLessonId && c.lessonId === currentLessonId) {
            window.dispatchEvent(new CustomEvent('trainer:seek', { detail: { lessonId: c.lessonId, time: c.startSec } }));
        } else if (programId) {
            // Lección distinta (siempre anterior, ya desbloqueada): navegar. El chat persiste (overlay fijo).
            router.push(`/dashboard/library/${programId}/lessons/${c.lessonId}?t=${Math.round(c.startSec)}`);
        }
    };

    return (
        <>
            {/* Header */}
            <header className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-card-light">
                <StanAvatar className="size-10" />
                <div className="flex flex-col leading-tight min-w-0 flex-1">
                    <span className="text-sm font-black tracking-tight text-white">STAN</span>
                    <span className="flex items-center gap-1.5 text-[11px] text-white/55">
                        <span className={`size-1.5 rounded-full ${loading ? 'bg-stannum animate-pulse' : 'bg-stannum'}`} />
                        {loading ? 'Pensando' : 'Tu entrenador personal'}
                    </span>
                </div>
                {messages.length > 0 && (
                    <button
                        onClick={() => setConfirmingNew((v) => !v)}
                        aria-label="Nueva conversación"
                        title="Nueva conversación"
                        className="shrink-0 size-8 grid place-items-center rounded-full bg-card-light text-white/60 hover:text-white transition-150"
                    >
                        <SquarePen className="size-4" />
                    </button>
                )}
                <button
                    onClick={onClose}
                    aria-label="Cerrar chat"
                    className="shrink-0 size-8 grid place-items-center rounded-full bg-card-light text-white/60 hover:text-white transition-150"
                >
                    <X className="size-4" />
                </button>
            </header>

            {/* Confirmación de nueva conversación */}
            {confirmingNew && (
                <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-card-light/60 border-b border-card-light text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                    <span className="text-white/70 flex-1">¿Estás seguro que deseas iniciar una nueva conversación?</span>
                    <button onClick={() => setConfirmingNew(false)} className="px-2 py-1 rounded-md text-white/60 hover:text-white transition-150">Cancelar</button>
                    <button onClick={startNew} className="px-2.5 py-1 rounded-md bg-stannum text-black font-semibold transition-150 hover:brightness-110">Confirmar</button>
                </div>
            )}

            {/* Mensajes */}
            <div
                ref={scrollRef}
                role="log"
                aria-live="polite"
                aria-label="Conversación con STAN"
                className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 py-4 flex flex-col gap-4"
            >
                {messages.length === 0 && (
                    <div className="flex flex-col gap-4 animate-in fade-in duration-500">
                        <div className="flex items-start gap-2">
                            <StanAvatar className="size-7" />
                            <div className="px-3.5 py-2.5 text-sm rounded-2xl rounded-bl-md bg-card-light text-white leading-relaxed max-w-[85%]">
                                {greeting}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 pl-9">
                            {suggestions.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => submit(s)}
                                    className="group text-xs text-left px-3 py-2.5 rounded-lg bg-card-light text-white/70 hover:text-white border border-transparent hover:border-stannum/40 transition-150"
                                >
                                    <span className="text-stannum mr-1.5 font-bold">›</span>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((m) => (
                    <MessageBubble
                        key={m.id}
                        message={m}
                        streaming={m.id === streamingId}
                        currentLessonId={currentLessonId}
                        onCite={goToCitation}
                        onFeedback={(value) => setFeedback({ threadKey: THREAD, messageId: m.id, value })}
                    />
                ))}

                {showTyping && (
                    <div className="flex items-end gap-2 animate-in fade-in duration-300">
                        <StanAvatar className="size-7" />
                        <div className="flex items-center gap-1.5 px-3.5 py-3 rounded-2xl rounded-bl-md bg-card-light">
                            <Dot /><Dot delay="150ms" /><Dot delay="300ms" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-card-light p-2.5">
                <div className="flex items-end gap-2 rounded-lg bg-card-light border border-card-light focus-within:border-stannum transition-150 px-2 py-1.5">
                    <textarea
                        ref={taRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        rows={1}
                        maxLength={800}
                        placeholder="Escribí tu pregunta"
                        aria-label="Escribí tu pregunta para STAN"
                        className="flex-1 resize-none max-h-32 bg-transparent px-1.5 py-1.5 text-sm text-white placeholder:text-white/40 outline-none leading-relaxed"
                    />
                    {loading ? (
                        <button
                            onClick={() => cancel(THREAD)}
                            aria-label="Detener respuesta"
                            title="Detener"
                            className="shrink-0 size-9 grid place-items-center rounded-lg bg-card-lighter text-white transition-150 hover:brightness-110 active:scale-95"
                        >
                            <Square className="size-3.5 fill-current" />
                        </button>
                    ) : (
                        <button
                            onClick={() => submit()}
                            disabled={!input.trim()}
                            aria-label="Enviar"
                            className="shrink-0 size-9 grid place-items-center rounded-lg bg-stannum text-black transition-150 enabled:hover:brightness-110 enabled:active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <Send className="size-4" />
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

const MessageBubble = memo(
    function MessageBubble({
        message,
        streaming,
        currentLessonId,
        onCite,
        onFeedback,
    }: {
        message: ChatMessage;
        streaming: boolean;
        currentLessonId: string | null;
        onCite: (c: TrainerCitation) => void;
        onFeedback: (value: 1 | -1) => void;
    }) {
        const isUser = message.role === 'user';

        if (isUser) {
            return (
                <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="max-w-[85%] px-3.5 py-2.5 text-sm whitespace-pre-line break-words rounded-2xl rounded-br-md bg-stannum text-black font-medium">
                        {message.content}
                    </div>
                </div>
            );
        }

        return (
            <div className="flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <StanAvatar className="size-7" />
                <div className="flex flex-col gap-1.5 items-start min-w-0 max-w-[85%]">
                    <div className="px-3.5 py-2.5 text-sm break-words rounded-2xl rounded-bl-md leading-relaxed bg-card-light text-white [&_p]:min-h-[1em]">
                        <Markdown text={message.content} />
                        {streaming && (
                            <span className="inline-block w-[3px] h-4 ml-0.5 align-[-2px] bg-stannum animate-pulse rounded-full" aria-hidden="true" />
                        )}
                    </div>

                    {message.citations && message.citations.length > 0 && (
                        <div className="flex flex-col gap-1.5 w-full">
                            {message.citations.map((c) => {
                                const isCurrent = c.lessonId === currentLessonId;
                                return (
                                    <button
                                        key={`${c.lessonId}-${c.startSec}`}
                                        onClick={() => onCite(c)}
                                        title={`Ir a "${c.title}" (min ${fmtTime(c.startSec)})`}
                                        className={`group flex gap-2.5 text-left w-full p-2 rounded-xl border transition-150 ${
                                            isCurrent
                                                ? 'bg-stannum/10 border-stannum/30 hover:bg-stannum/20'
                                                : 'bg-card-light border-transparent hover:border-stannum/30'
                                        }`}
                                    >
                                        <span className="relative shrink-0 w-24 aspect-video rounded-lg overflow-hidden bg-card ring-1 ring-white/5">
                                            {c.muxPlaybackId && (
                                                <Image
                                                    src={`https://image.mux.com/${c.muxPlaybackId}/thumbnail.png?width=192&height=108&time=${c.startSec}`}
                                                    alt=""
                                                    fill
                                                    sizes="96px"
                                                    className="object-cover"
                                                />
                                            )}
                                            <span className="absolute inset-0 grid place-items-center bg-black/15 group-hover:bg-black/25 transition-150">
                                                <Play className="size-4 text-white fill-white/90 drop-shadow" />
                                            </span>
                                            <span className="absolute bottom-1 right-1 px-1 rounded bg-black/75 text-[10px] font-mono tabular-nums text-white leading-tight">
                                                {fmtTime(c.startSec)}
                                            </span>
                                        </span>
                                        <span className="flex flex-col min-w-0 flex-1 gap-0.5 py-0.5">
                                            <span className={`text-xs font-semibold leading-snug line-clamp-2 ${isCurrent ? 'text-stannum' : 'text-white/85 group-hover:text-stannum'}`}>
                                                {isCurrent ? 'Esta lección' : c.title}
                                            </span>
                                            {c.snippet && (
                                                <span className="text-[11px] leading-snug text-white/45 line-clamp-2">{c.snippet}</span>
                                            )}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {!message.error && message.interactionId && !streaming && (
                        <div className="flex items-center gap-0.5 -ml-1">
                            <button
                                onClick={() => onFeedback(1)}
                                aria-label="Respuesta útil"
                                aria-pressed={message.feedback === 1}
                                className={`p-1.5 rounded-md transition-150 ${message.feedback === 1 ? 'text-stannum' : 'text-white/45 hover:text-white'}`}
                            >
                                <ThumbsUp className="size-3.5" />
                            </button>
                            <button
                                onClick={() => onFeedback(-1)}
                                aria-label="Respuesta no útil"
                                aria-pressed={message.feedback === -1}
                                className={`p-1.5 rounded-md transition-150 ${message.feedback === -1 ? 'text-invalid' : 'text-white/45 hover:text-white'}`}
                            >
                                <ThumbsDown className="size-3.5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    },
    // Re-render solo si cambia el mensaje (identidad estable para los viejos), su estado de streaming
    // o la lección actual. Ignora onCite/onFeedback inline (ver nota del plan: el closure captura m.id, estable).
    (prev, next) =>
        prev.message === next.message &&
        prev.streaming === next.streaming &&
        prev.currentLessonId === next.currentLessonId,
);

const Dot = ({ delay = '0ms' }: { delay?: string }) => (
    <span className="size-1.5 rounded-full bg-white/40 animate-bounce motion-reduce:animate-none" style={{ animationDelay: delay }} />
);
