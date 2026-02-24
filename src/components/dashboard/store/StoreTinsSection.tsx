'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import type { StoreCoverItem } from '@/interfaces';
import { getStoreCovers, purchaseCover, equipCover } from '@/services';
import { useUserStore } from '@/stores/userStore';
import { getCoverImage, rarityStyles, rarityLabels } from '@/config/covers';
import { formatCoins } from '@/utilities';
import { errorHandler } from '@/helpers';
import { callToast } from '@/helpers/callToast';
import { Modal, StoreCoverCard } from '@/components';
import { SpinnerIcon } from '@/icons';
import stannum_coin from '@/assets/tins_coin.svg';

export const StoreTinsSection = () => {
    const user = useUserStore(s => s.user);
    const refreshUser = useUserStore(s => s.refreshUser);

    const [covers, setCovers] = useState<StoreCoverItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCover, setSelectedCover] = useState<StoreCoverItem | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchCovers = useCallback(async () => {
        try {
            const data = await getStoreCovers();
            setCovers(data);
        } catch (err) {
            errorHandler(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchCovers(); }, [fetchCovers]);

    const handleOpenDetail = (cover: StoreCoverItem) => {
        setSelectedCover(cover);
        setShowModal(true);
    };

    const handlePurchase = async () => {
        if (!selectedCover || actionLoading) return;
        setActionLoading(true);
        try {
            await purchaseCover(selectedCover.id);
            callToast({ type: 'success', message: { title: '¡Portada desbloqueada!', description: `Desbloqueaste "${selectedCover.name}".` } });
            await refreshUser();
            await fetchCovers();
            setSelectedCover(prev => prev ? { ...prev, owned: true } : null);
        } catch (err) {
            errorHandler(err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleEquip = async () => {
        if (!selectedCover || actionLoading) return;
        setActionLoading(true);
        try {
            await equipCover(selectedCover.id);
            callToast({ type: 'success', message: { title: 'Portada equipada', description: `Ahora usás "${selectedCover.name}".` } });
            await refreshUser();
            await fetchCovers();
            setSelectedCover(prev => prev ? { ...prev, equipped: true } : null);
            setShowModal(false);
        } catch (err) {
            errorHandler(err);
        } finally {
            setActionLoading(false);
        }
    };

    if (!user) return null;

    return (
        <Fragment>
            <section className="w-full card">
                <h2 className="mb-4 title-2">Portadas de perfil</h2>
                {loading ? (
                    <div className="w-full py-12 flex justify-center">
                        <SpinnerIcon className="animate-spin size-8 text-card-lightest" />
                    </div>
                ) : covers.length === 0 ? (
                    <p className="text-card-lightest text-center py-8">No hay portadas disponibles.</p>
                ) : (
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 scrollbar-hide md:overflow-visible md:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 lg:gap-4">
                        {covers.map(cover => (
                            <div key={cover.id} className="min-w-[65%] sm:min-w-[45%] shrink-0 snap-start md:min-w-0 md:shrink">
                                <StoreCoverCard
                                    cover={cover}
                                    onClick={() => handleOpenDetail(cover)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Modal className="max-w-2xl h-auto" showModal={showModal} setShowModal={setShowModal}>
                {selectedCover && (
                    <div className="flex flex-col">
                        <div className="w-full aspect-video rounded-lg overflow-hidden relative">
                            <div className="size-full bg-gradient-to-b from-transparent to-black/50 absolute top-0 left-0 z-10" />
                            <Image
                                src={getCoverImage(selectedCover.imageKey)}
                                alt={selectedCover.name}
                                className="size-full object-cover"
                                sizes="(max-width: 768px) 100vw, 640px"
                                onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                            />
                        </div>
                        <div className="mt-4 flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-xl font-bold">{selectedCover.name}</h3>
                                <p className="mt-1 text-sm text-card-lightest">{selectedCover.description}</p>
                            </div>
                            <span className="text-xs font-semibold px-2 py-1 rounded border shrink-0" style={rarityStyles[selectedCover.rarity]}>
                                {rarityLabels[selectedCover.rarity]}
                            </span>
                        </div>

                        <div className="mt-6 flex items-center justify-between gap-4">
                            {!selectedCover.owned ? (
                                <Fragment>
                                    <div className="flex items-center gap-2">
                                        <Image src={stannum_coin} alt="Tins" width={24} height={24} className="size-6" />
                                        <span className="text-lg font-black text-amber-400 tabular-nums">{formatCoins(selectedCover.price)}</span>
                                        <span className="text-sm text-card-lightest">Tins</span>
                                    </div>
                                    <button
                                        type="button"
                                        disabled={actionLoading || (user.coins < selectedCover.price)}
                                        onClick={handlePurchase}
                                        className="h-10 px-6 text-sm font-semibold bg-stannum hover:bg-stannum-light disabled:opacity-50 disabled:cursor-not-allowed text-card rounded transition-200 flex items-center gap-2"
                                    >
                                        {actionLoading ? <SpinnerIcon className="animate-spin size-5" /> : 'Comprar'}
                                    </button>
                                </Fragment>
                            ) : selectedCover.equipped ? (
                                <p className="text-sm font-semibold text-stannum">Portada actualmente equipada</p>
                            ) : (
                                <Fragment>
                                    <p className="text-sm text-card-lightest">Ya tenés esta portada.</p>
                                    <button
                                        type="button"
                                        disabled={actionLoading}
                                        onClick={handleEquip}
                                        className="h-10 px-6 text-sm font-semibold bg-stannum hover:bg-stannum-light disabled:opacity-50 text-card rounded transition-200 flex items-center gap-2"
                                    >
                                        {actionLoading ? <SpinnerIcon className="animate-spin size-5" /> : 'Equipar'}
                                    </button>
                                </Fragment>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </Fragment>
    );
};
