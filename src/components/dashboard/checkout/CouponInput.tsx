'use client';

import { useState } from 'react';
import { applyCoupon } from '@/services/payment';
import type { CouponResult } from '@/services/payment';

interface Props {
    programId: string;
    onCouponApplied: (data: CouponResult, code: string) => void;
    onCouponCleared: () => void;
}

export const CouponInput = ({ programId, onCouponApplied, onCouponCleared }: Props) => {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [applied, setApplied] = useState(false);

    const handleApply = async () => {
        if (!code.trim()) return;
        setIsLoading(true);
        setError(null);

        try {
            const result = await applyCoupon(programId, code.trim());
            setApplied(true);
            onCouponApplied(result, code.trim());
        } catch (err: any) {
            const msg = err?.response?.data?.friendlyMessage || 'Cupón inválido.';
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setCode('');
        setApplied(false);
        setError(null);
        onCouponCleared();
    };

    return (
        <div className="card p-5 flex flex-col gap-3">
            {applied ? (
                <div className="flex items-center justify-between p-3 rounded-lg bg-stannum/10 border border-stannum/30">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-bold text-stannum">{code.toUpperCase()}</span>
                        <span className="text-xs text-stannum/80">aplicado</span>
                    </div>
                    <button type="button" onClick={handleClear} className="text-xs text-white/50 hover:text-white transition-200">
                        Quitar
                    </button>
                </div>
            ) : (
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={code}
                        onChange={e => setCode(e.target.value.toUpperCase())}
                        placeholder="Código de cupón"
                        className="grow py-2.5 px-3 rounded-lg bg-card border border-card-light text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-stannum transition-200 font-mono"
                    />
                    <button
                        type="button"
                        onClick={handleApply}
                        disabled={isLoading || !code.trim()}
                        className="py-2.5 px-4 rounded-lg bg-card-light text-sm font-medium hover:bg-white/10 transition-200 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    >
                        {isLoading ? '...' : 'Aplicar'}
                    </button>
                </div>
            )}
            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
};
