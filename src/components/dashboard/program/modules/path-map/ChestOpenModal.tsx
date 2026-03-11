'use client';

import { useState } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { Modal } from '@/components';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ChestIcon, CrownIcon } from '@/icons';
import { openChest } from '@/services';
import type { ChestOpenResult } from '@/services/chest';
import { useUserStore } from '@/stores/userStore';
import { errorHandler } from '@/helpers';
import { getCoverImage, rarityStyles, rarityLabels } from '@/config/covers';
import type { CoverRarity } from '@/interfaces';
import stannum_coin from '@/assets/tins_coin.svg';

interface Props {
    chestId: string;
    programId: string;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    onOpened: () => void;
}

const revealItem = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
};

function RewardsReveal({ result, onClose }: { result: ChestOpenResult; onClose: () => void }) {
    const rewards: React.ReactNode[] = [];
    let idx = 0;

    if (result.rewards.xp > 0) {
        rewards.push(
            <m.div key="xp" variants={revealItem} className="flex items-center justify-center gap-2">
                <CrownIcon className="size-6 text-stannum" />
                <span className="text-2xl font-black">+</span>
                <AnimatedCounter target={result.xpResult.totalGain} duration={1.2} className="text-2xl font-black text-stannum" />
                <span className="text-2xl font-black">XP</span>
            </m.div>
        );
        idx++;
    }

    if (result.rewards.coins > 0) {
        rewards.push(
            <m.div key="coins" variants={revealItem} className="flex items-center justify-center gap-2">
                <Image src={stannum_coin} alt="Tins" width={24} height={24} />
                <span className="text-xl font-bold text-amber-400">+</span>
                <AnimatedCounter target={result.rewards.coins} duration={1.2} className="text-xl font-bold text-amber-400" />
                <span className="text-xl font-bold text-amber-400">Tins</span>
            </m.div>
        );
        idx++;
    }

    if (result.rewards.cover && !result.rewards.cover.alreadyOwned) {
        rewards.push(
            <m.div key="cover" variants={revealItem} className="mt-2 flex flex-col items-center gap-2">
                <div className="w-full border-t border-white/10" />
                <p className="text-sm text-white/60">Portada desbloqueada</p>
                <div className="w-full max-w-xs aspect-[3/1] rounded-lg overflow-hidden relative">
                    <Image
                        src={getCoverImage(result.rewards.cover.coverImageKey)}
                        alt={result.rewards.cover.coverName}
                        fill
                        className="object-cover"
                        onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{result.rewards.cover.coverName}</span>
                    <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full border"
                        style={rarityStyles[result.rewards.cover.coverRarity as CoverRarity]}
                    >
                        {rarityLabels[result.rewards.cover.coverRarity as CoverRarity]}
                    </span>
                </div>
            </m.div>
        );
    }

    return (
        <>
            <div className="size-20 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-[0_4px_0_#78350f] flex justify-center items-center">
                <ChestIcon className="size-10 text-amber-950" />
            </div>
            <h2 className="mt-4 text-xl lg:text-2xl font-black uppercase tracking-wider text-amber-400">Recompensas</h2>
            <m.div
                className="mt-6 w-full flex flex-col gap-3"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.4 } },
                }}
            >
                {rewards}
            </m.div>

            <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rewards.length * 0.4 + 0.3 }}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 px-10 py-3 bg-gradient-to-b from-amber-400 to-amber-600 text-amber-950 font-black text-lg uppercase tracking-wider rounded-xl shadow-[0_4px_0_#92400e] hover:shadow-[0_2px_0_#92400e] hover:translate-y-0.5 active:shadow-none active:translate-y-1 transition-all duration-100"
                >
                    Continuar
                </button>
            </m.div>
        </>
    );
}

export const ChestOpenModal = ({ chestId, programId, showModal, setShowModal, onOpened }: Props) => {
    const refreshUser = useUserStore(s => s.refreshUser);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ChestOpenResult | null>(null);

    const handleOpen = async () => {
        setIsLoading(true);
        try {
            const data = await openChest(programId, chestId);
            setResult(data);
            refreshUser();
            import('canvas-confetti').then(({ default: confetti }) => {
                confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
            }).catch(() => {});
        } catch (error: unknown) {
            errorHandler(error);
            setShowModal(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        if (result) {
            onOpened();
            setResult(null);
        }
    };

    return (
        <Modal
            className="max-w-md h-auto"
            showModal={showModal}
            setShowModal={() => handleClose()}
        >
            <div className="size-full flex flex-col items-center text-center pb-2">
                {!result ? (
                    <>
                        <h2 className="text-lg lg:text-xl font-black uppercase tracking-wider text-amber-400">
                            Cofre desbloqueado
                        </h2>
                        <p className="mt-1 text-sm text-white/50">Reclamá tu recompensa</p>
                        <div className="relative my-10">
                            <div className="absolute inset-0 -m-6 rounded-full bg-amber-500/20 animate-pulse" />
                            <div className="relative size-28 lg:size-32 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-[0_6px_0_#78350f,0_0_30px_rgba(245,158,11,0.4)] flex justify-center items-center">
                                <ChestIcon className="size-14 lg:size-16 text-amber-950 drop-shadow-sm" />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleOpen}
                            disabled={isLoading}
                            className="px-10 py-3 bg-gradient-to-b from-amber-400 to-amber-600 text-amber-950 font-black text-lg uppercase tracking-wider rounded-xl shadow-[0_4px_0_#92400e] hover:shadow-[0_2px_0_#92400e] hover:translate-y-0.5 active:shadow-none active:translate-y-1 transition-all duration-100 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_0_#92400e]"
                        >
                            {isLoading ? 'Abriendo...' : 'ABRIR'}
                        </button>
                    </>
                ) : (
                    <RewardsReveal result={result} onClose={handleClose} />
                )}
            </div>
        </Modal>
    );
};
