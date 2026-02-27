'use client';

import { useState } from 'react';
import { CopyIcon } from '@/icons';

interface Props {
    keys: Array<{ code: string; used: boolean }>;
}

export const ProductKeyDisplay = ({ keys }: Props) => {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(code);
            setTimeout(() => setCopied(null), 2000);
        } catch {
            // clipboard not available
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <span className="text-xs text-white/50 font-medium">
                {keys.length > 1 ? 'Claves de activación' : 'Clave de activación'}
            </span>
            {keys.map(pk => (
                <div
                    key={pk.code}
                    className={`flex items-center justify-between p-3 rounded-lg border ${pk.used ? 'border-white/10 opacity-50' : 'border-stannum/30 bg-stannum/5'}`}
                >
                    <span className="font-mono font-bold text-sm tracking-wider">{pk.code}</span>
                    <div className="flex items-center gap-2">
                        {pk.used && <span className="text-xs text-white/40">Usada</span>}
                        <button
                            type="button"
                            onClick={() => handleCopy(pk.code)}
                            className="p-1 text-white/50 hover:text-white transition-200"
                            title="Copiar"
                        >
                            {copied === pk.code ? (
                                <span className="text-xs text-stannum">Copiado</span>
                            ) : (
                                <CopyIcon className="size-4" />
                            )}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
