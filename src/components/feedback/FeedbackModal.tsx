'use client';

import { useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import { LikeIcon, LikedIcon, DislikeIcon, DislikedIcon, CheckIcon } from '@/icons';
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
}

interface DualReactionProps extends BaseProps {
    variant: 'dual-reaction';
    questionA: string;
    questionB: string;
}

interface NpsProps extends BaseProps {
    variant: 'nps';
}

interface RatingProps extends BaseProps {
    variant: 'rating-1-5';
}

type Props = QuickReactionProps | DualReactionProps | NpsProps | RatingProps;

const SELECTION_DELAY_MS = 350;
const THANKS_DURATION_MS = 700;

const ThumbPair = ({ value, onChange, disabled }: { value: FeedbackReaction | null; onChange: (v: FeedbackReaction) => void; disabled?: boolean }) => (
    <div className="flex gap-3 justify-center">
        <button
            type="button"
            onClick={() => onChange('up')}
            disabled={disabled}
            aria-pressed={value === 'up'}
            aria-label="Sí"
            className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-200 disabled:cursor-not-allowed ${value === 'up' ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300' : 'border-white/15 text-white/70 hover:border-emerald-400/40 hover:text-emerald-300 hover:bg-emerald-500/[0.06]'}`}
        >
            {value === 'up' ? <LikedIcon className="text-xl" /> : <LikeIcon className="text-xl" />}
            <span className="text-sm font-semibold">Sí</span>
        </button>
        <button
            type="button"
            onClick={() => onChange('down')}
            disabled={disabled}
            aria-pressed={value === 'down'}
            aria-label="No"
            className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-200 disabled:cursor-not-allowed ${value === 'down' ? 'bg-red-500/15 border-red-400/50 text-red-300' : 'border-white/15 text-white/70 hover:border-red-400/40 hover:text-red-300 hover:bg-red-500/[0.06]'}`}
        >
            {value === 'down' ? <DislikedIcon className="text-xl" /> : <DislikeIcon className="text-xl" />}
            <span className="text-sm font-semibold">No</span>
        </button>
    </div>
);

const NpsScale = ({ value, onChange, disabled }: { value: number | null; onChange: (n: number) => void; disabled?: boolean }) => (
    <div className="grid grid-cols-11 gap-1.5 sm:gap-2 max-w-md mx-auto">
        {Array.from({ length: 11 }, (_, i) => (
            <button
                key={i}
                type="button"
                onClick={() => onChange(i)}
                disabled={disabled}
                aria-pressed={value === i}
                className={`aspect-square rounded-lg border text-sm font-semibold transition-all duration-150 disabled:cursor-not-allowed ${value === i ? 'bg-stannum/20 border-stannum text-stannum' : 'border-white/15 text-white/60 hover:border-stannum/50 hover:text-white'}`}
            >
                {i}
            </button>
        ))}
    </div>
);

const Rating1to5 = ({ value, onChange, disabled }: { value: number | null; onChange: (n: number) => void; disabled?: boolean }) => (
    <div className="flex gap-3 justify-center">
        {[1, 2, 3, 4, 5].map(n => (
            <button
                key={n}
                type="button"
                onClick={() => onChange(n)}
                disabled={disabled}
                aria-pressed={value === n}
                className={`size-12 sm:size-14 rounded-xl border font-bold text-lg transition-all duration-150 disabled:cursor-not-allowed ${value === n ? 'bg-stannum/20 border-stannum text-stannum' : 'border-white/15 text-white/60 hover:border-stannum/50 hover:text-white'}`}
            >
                {n}
            </button>
        ))}
    </div>
);

const npsFollowUpFor = (score: number | null): string => {
    if (score == null) return '';
    if (score <= 6) return '¿Qué te frenaría a recomendarnos?';
    if (score <= 8) return '¿Qué nos falta para que sea un 10?';
    return '¿Qué es lo que más te gusta?';
};

export const FeedbackModal = (props: Props) => {
    const { show, onClose, onSubmit, title, question } = props;
    const [reaction, setReaction] = useState<FeedbackReaction | null>(null);
    const [reactionA, setReactionA] = useState<FeedbackReaction | null>(null);
    const [reactionB, setReactionB] = useState<FeedbackReaction | null>(null);
    const [rating, setRating] = useState<number | null>(null);
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const submitFiredRef = useRef(false);

    useEffect(() => {
        if (!show) {
            setReaction(null);
            setReactionA(null);
            setReactionB(null);
            setRating(null);
            setMessage('');
            setSubmitting(false);
            setSubmitted(false);
            submitFiredRef.current = false;
        }
    }, [show]);

    const fireSubmit = async (payload: FeedbackSubmissionPayload) => {
        if (submitFiredRef.current) return;
        submitFiredRef.current = true;
        setSubmitting(true);
        try {
            await onSubmit(payload);
        } catch {}
        setSubmitted(true);
        setTimeout(() => onClose(), THANKS_DURATION_MS);
    };

    useEffect(() => {
        if (props.variant !== 'quick-reaction' || !reaction || submitFiredRef.current) return;
        const t = setTimeout(() => fireSubmit({ reaction, message: null }), SELECTION_DELAY_MS);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reaction, props.variant]);

    useEffect(() => {
        if (props.variant !== 'dual-reaction' || !reactionA || !reactionB || submitFiredRef.current) return;
        const t = setTimeout(() => fireSubmit({
            secondaryReactions: { evaluationFair: reactionA, instructionsClear: reactionB },
            message: null,
        }), SELECTION_DELAY_MS);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reactionA, reactionB, props.variant]);

    useEffect(() => {
        if (props.variant !== 'rating-1-5' || rating == null || submitFiredRef.current) return;
        const t = setTimeout(() => fireSubmit({ rating, message: null }), SELECTION_DELAY_MS);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating, props.variant]);

    const handleQuickReaction = (v: FeedbackReaction) => {
        if (submitFiredRef.current) return;
        setReaction(v);
    };

    const handleDualA = (v: FeedbackReaction) => {
        if (submitFiredRef.current) return;
        setReactionA(v);
    };

    const handleDualB = (v: FeedbackReaction) => {
        if (submitFiredRef.current) return;
        setReactionB(v);
    };

    const handleRating = (n: number) => {
        if (submitFiredRef.current) return;
        setRating(n);
    };

    const handleNpsSelect = (n: number) => {
        if (submitFiredRef.current) return;
        setRating(n);
    };

    const handleNpsSubmit = () => {
        if (submitFiredRef.current || rating == null) return;
        fireSubmit({ rating, message: message.trim() || null });
    };

    return (
        <Modal showModal={show} setShowModal={(v) => { if (!v && !submitting) onClose(); }} disableBackdropClose className="no-card max-w-xl w-full">
            <div className="px-5 sm:px-8 py-8 sm:py-12">
                {submitted ? (
                    <m.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center gap-3 py-8"
                    >
                        <div className="size-14 rounded-full bg-stannum/15 border border-stannum/40 flex items-center justify-center">
                            <CheckIcon className="text-3xl text-stannum" />
                        </div>
                        <p className="text-base font-semibold text-white/90">¡Gracias por tu feedback!</p>
                    </m.div>
                ) : (
                    <m.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center gap-8 sm:gap-10"
                    >
                        <div className="flex flex-col items-center gap-4 sm:gap-5 text-center">
                            <span className="px-3 py-1 rounded-full border border-stannum/40 text-[10px] font-bold tracking-[0.2em] uppercase text-stannum">
                                {title}
                            </span>
                            <h3 className="text-xl sm:text-3xl font-bold text-white leading-tight max-w-md">
                                {question}
                            </h3>
                        </div>

                        {props.variant === 'quick-reaction' && (
                            <ThumbPair value={reaction} onChange={handleQuickReaction} disabled={submitting} />
                        )}

                        {props.variant === 'dual-reaction' && (
                            <div className="w-full flex flex-col gap-6 sm:gap-8">
                                <div className="flex flex-col items-center gap-3">
                                    <p className="text-sm text-white/60 text-center">{props.questionA}</p>
                                    <ThumbPair value={reactionA} onChange={handleDualA} disabled={submitting} />
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <p className="text-sm text-white/60 text-center">{props.questionB}</p>
                                    <ThumbPair value={reactionB} onChange={handleDualB} disabled={submitting} />
                                </div>
                            </div>
                        )}

                        {props.variant === 'nps' && (
                            <div className="w-full flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <NpsScale value={rating} onChange={handleNpsSelect} disabled={submitting} />
                                    <div className="flex justify-between text-[10px] text-white/40 px-1 max-w-md mx-auto w-full">
                                        <span>Nada probable</span>
                                        <span>Muy probable</span>
                                    </div>
                                </div>

                                {rating != null && (
                                    <m.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="flex flex-col gap-3 max-w-md w-full mx-auto"
                                    >
                                        <p className="text-sm text-white/70 text-center">{npsFollowUpFor(rating)}</p>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value.slice(0, 2000))}
                                            placeholder="Contanos un poco más (opcional)"
                                            rows={3}
                                            disabled={submitting}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/90 placeholder:text-white/30 focus:border-stannum/50 focus:outline-none resize-none"
                                        />
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-[10px] text-white/30">{message.length}/2000</span>
                                            <button
                                                type="button"
                                                onClick={handleNpsSubmit}
                                                disabled={submitting}
                                                className="group relative px-6 py-2.5 rounded-lg font-bold text-sm overflow-hidden transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-stannum to-stannum-light" />
                                                <div className="absolute inset-px rounded-[7px] bg-[#1a1a1a] group-hover:bg-transparent group-disabled:!bg-[#1a1a1a] transition-colors duration-300" />
                                                <span className="relative z-10 text-stannum group-hover:text-[#0a0a0a] group-disabled:!text-stannum/60 transition-colors duration-300">
                                                    {submitting ? 'Enviando...' : 'Enviar'}
                                                </span>
                                            </button>
                                        </div>
                                    </m.div>
                                )}
                            </div>
                        )}

                        {props.variant === 'rating-1-5' && (
                            <Rating1to5 value={rating} onChange={handleRating} disabled={submitting} />
                        )}
                    </m.div>
                )}
            </div>
        </Modal>
    );
};
