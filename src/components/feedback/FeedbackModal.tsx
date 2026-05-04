'use client';

import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import type { FeedbackReaction, FeedbackType } from '@/services/feedback';

export type FeedbackVariant = 'quick-reaction' | 'dual-reaction' | 'nps' | 'rating-1-5';

interface BaseProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (payload: FeedbackSubmissionPayload) => Promise<void> | void;
    title: string;
    question: string;
    type: FeedbackType;
}

export interface FeedbackSubmissionPayload {
    rating?: number | null;
    reaction?: FeedbackReaction | null;
    secondaryReactions?: {
        evaluationFair?: FeedbackReaction | null;
        instructionsClear?: FeedbackReaction | null;
    };
    message?: string | null;
}

interface QuickReactionProps extends BaseProps {
    variant: 'quick-reaction';
    followUpPlaceholder?: string;
}

interface DualReactionProps extends BaseProps {
    variant: 'dual-reaction';
    questionA: string;
    questionB: string;
    followUpPlaceholder?: string;
}

interface NpsProps extends BaseProps {
    variant: 'nps';
}

interface RatingProps extends BaseProps {
    variant: 'rating-1-5';
    followUpPlaceholder?: string;
}

type Props = QuickReactionProps | DualReactionProps | NpsProps | RatingProps;

const ThumbButton = ({ active, onClick, label, kind }: { active: boolean; onClick: () => void; label: string; kind: 'up' | 'down' }) => {
    const activeClass = kind === 'up'
        ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
        : 'bg-red-500/15 border-red-400/40 text-red-300';
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`flex-1 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${active ? activeClass : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white'}`}
        >
            {kind === 'up' ? '👍' : '👎'} <span className="ml-1">{label}</span>
        </button>
    );
};

const NpsScale = ({ value, onChange }: { value: number | null; onChange: (n: number) => void }) => (
    <div className="grid grid-cols-11 gap-1.5 sm:gap-2">
        {Array.from({ length: 11 }, (_, i) => (
            <button
                key={i}
                type="button"
                onClick={() => onChange(i)}
                aria-pressed={value === i}
                className={`aspect-square rounded-lg border text-sm font-semibold transition-all duration-150 ${value === i ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.06] hover:text-white'}`}
            >
                {i}
            </button>
        ))}
    </div>
);

const Rating1to5 = ({ value, onChange }: { value: number | null; onChange: (n: number) => void }) => (
    <div className="flex gap-2 justify-center">
        {[1, 2, 3, 4, 5].map(n => (
            <button
                key={n}
                type="button"
                onClick={() => onChange(n)}
                aria-pressed={value === n}
                className={`size-12 sm:size-14 rounded-xl border font-bold text-lg transition-all duration-150 ${value === n ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.06] hover:text-white'}`}
            >
                {n}
            </button>
        ))}
    </div>
);

export const FeedbackModal = (props: Props) => {
    const { show, onClose, onSubmit, title, question } = props;
    const [reaction, setReaction] = useState<FeedbackReaction | null>(null);
    const [reactionA, setReactionA] = useState<FeedbackReaction | null>(null);
    const [reactionB, setReactionB] = useState<FeedbackReaction | null>(null);
    const [rating, setRating] = useState<number | null>(null);
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!show) {
            setReaction(null);
            setReactionA(null);
            setReactionB(null);
            setRating(null);
            setMessage('');
            setSubmitting(false);
            setSubmitted(false);
        }
    }, [show]);

    const showFollowUp = (() => {
        if (props.variant === 'quick-reaction') return reaction === 'down';
        if (props.variant === 'dual-reaction') return reactionA === 'down' || reactionB === 'down';
        if (props.variant === 'nps') return rating != null;
        if (props.variant === 'rating-1-5') return rating != null && rating <= 3;
        return false;
    })();

    const npsFollowUpQuestion = (() => {
        if (props.variant !== 'nps' || rating == null) return '';
        if (rating <= 6) return '¿Qué te frenaría a recomendarnos?';
        if (rating <= 8) return '¿Qué nos falta para que sea un 10?';
        return '¿Qué es lo que más te gusta?';
    })();

    const canSubmit = (() => {
        if (submitting) return false;
        if (props.variant === 'quick-reaction') return reaction != null;
        if (props.variant === 'dual-reaction') return reactionA != null && reactionB != null;
        if (props.variant === 'nps') return rating != null;
        if (props.variant === 'rating-1-5') return rating != null;
        return false;
    })();

    const handleSubmit = async () => {
        if (!canSubmit) return;
        setSubmitting(true);
        try {
            const payload: FeedbackSubmissionPayload = {
                message: message.trim() || null,
            };
            if (props.variant === 'quick-reaction') payload.reaction = reaction;
            if (props.variant === 'dual-reaction') {
                payload.secondaryReactions = {
                    evaluationFair: reactionA,
                    instructionsClear: reactionB,
                };
            }
            if (props.variant === 'nps' || props.variant === 'rating-1-5') payload.rating = rating;
            await onSubmit(payload);
            setSubmitted(true);
            setTimeout(() => onClose(), 900);
        } catch {
            setSubmitting(false);
        }
    };

    const handleSkip = () => {
        if (submitting) return;
        onClose();
    };

    return (
        <Modal showModal={show} setShowModal={(v) => { if (!v) handleSkip(); }} className="max-w-md p-0">
            <div className="relative flex flex-col">
                <m.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[2px] bg-gradient-to-r from-transparent via-stannum to-transparent origin-center shrink-0"
                />

                <div className="px-5 pt-5 pb-4 sm:px-6 sm:pt-6 border-b border-white/[0.06]">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-stannum/30 bg-stannum/10 mb-2">
                        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-stannum">{title}</span>
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{question}</h3>
                </div>

                <div className="px-5 sm:px-6 py-5 space-y-4">
                    {submitted ? (
                        <div className="text-center py-6">
                            <div className="text-3xl mb-2">✓</div>
                            <p className="text-sm text-white/70">¡Gracias por tu feedback!</p>
                        </div>
                    ) : (
                        <>
                            {props.variant === 'quick-reaction' && (
                                <div className="flex gap-2">
                                    <ThumbButton active={reaction === 'up'} onClick={() => setReaction('up')} kind="up" label="Sí" />
                                    <ThumbButton active={reaction === 'down'} onClick={() => setReaction('down')} kind="down" label="No" />
                                </div>
                            )}

                            {props.variant === 'dual-reaction' && (
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-[12px] text-white/55 mb-1.5">{props.questionA}</p>
                                        <div className="flex gap-2">
                                            <ThumbButton active={reactionA === 'up'} onClick={() => setReactionA('up')} kind="up" label="Sí" />
                                            <ThumbButton active={reactionA === 'down'} onClick={() => setReactionA('down')} kind="down" label="No" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[12px] text-white/55 mb-1.5">{props.questionB}</p>
                                        <div className="flex gap-2">
                                            <ThumbButton active={reactionB === 'up'} onClick={() => setReactionB('up')} kind="up" label="Sí" />
                                            <ThumbButton active={reactionB === 'down'} onClick={() => setReactionB('down')} kind="down" label="No" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {props.variant === 'nps' && (
                                <div className="space-y-2">
                                    <NpsScale value={rating} onChange={setRating} />
                                    <div className="flex justify-between text-[10px] text-white/40 px-1">
                                        <span>Nada probable</span>
                                        <span>Muy probable</span>
                                    </div>
                                </div>
                            )}

                            {props.variant === 'rating-1-5' && (
                                <Rating1to5 value={rating} onChange={setRating} />
                            )}

                            {showFollowUp && (
                                <m.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    transition={{ duration: 0.25 }}
                                    className="overflow-hidden"
                                >
                                    {props.variant === 'nps' && (
                                        <p className="text-[12px] text-white/60 mb-1.5">{npsFollowUpQuestion}</p>
                                    )}
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value.slice(0, 2000))}
                                        placeholder={
                                            props.variant === 'nps'
                                                ? 'Contanos un poco más (opcional)'
                                                : props.variant === 'rating-1-5' && 'followUpPlaceholder' in props
                                                    ? (props as RatingProps).followUpPlaceholder ?? 'Contanos qué pasó (opcional)'
                                                    : props.variant === 'quick-reaction' && 'followUpPlaceholder' in props
                                                        ? (props as QuickReactionProps).followUpPlaceholder ?? '¿Qué le faltó? (opcional)'
                                                        : props.variant === 'dual-reaction' && 'followUpPlaceholder' in props
                                                            ? (props as DualReactionProps).followUpPlaceholder ?? '¿Qué le falta o le sobra? (opcional)'
                                                            : 'Contanos un poco más (opcional)'
                                        }
                                        rows={3}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/90 placeholder:text-white/30 focus:border-stannum/50 focus:outline-none resize-none"
                                    />
                                    <p className="text-[10px] text-white/30 mt-1 text-right">{message.length}/2000</p>
                                </m.div>
                            )}
                        </>
                    )}
                </div>

                {!submitted && (
                    <div className="px-5 sm:px-6 pt-3 pb-5 border-t border-white/[0.06] flex gap-2">
                        <button
                            type="button"
                            onClick={handleSkip}
                            disabled={submitting}
                            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white/50 hover:text-white/80 transition-colors disabled:opacity-40"
                        >
                            Saltar
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!canSubmit}
                            className="flex-1 group relative py-2.5 rounded-lg font-bold text-sm overflow-hidden transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-stannum to-stannum-light" />
                            <div className="absolute inset-px rounded-[7px] bg-[#1a1a1a] group-hover:bg-transparent group-disabled:!bg-[#1a1a1a] transition-colors duration-300" />
                            <span className="relative z-10 text-stannum group-hover:text-[#0a0a0a] group-disabled:!text-stannum/60 transition-colors duration-300">
                                {submitting ? 'Enviando...' : 'Enviar'}
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};
