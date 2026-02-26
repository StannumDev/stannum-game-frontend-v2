'use client'

import { Dispatch, Fragment, SetStateAction, useMemo, useState } from "react";
import Image from "next/image";
import { EditIcon, SpinnerIcon, CheckIcon, LockIcon } from "@/icons";
import { Modal } from "@/components";
import { allCovers, getCoverImage, rarityStyles, rarityLabels } from "@/config/covers";
import { equipCover } from "@/services";
import { useUserStore } from "@/stores/userStore";
import { errorHandler } from "@/helpers";
import { callToast } from "@/helpers/callToast";

interface Props {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    equippedCoverId: string;
    unlockedCoverIds: string[];
}

export const UserProfileEditCover = ({ showModal, setShowModal, equippedCoverId, unlockedCoverIds }: Props) => {

    const refreshUser = useUserStore(s => s.refreshUser);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(equippedCoverId);

    const unlockedSet = useMemo(() => new Set(unlockedCoverIds), [unlockedCoverIds]);

    const handleConfirm = async () => {
        if (selectedId === equippedCoverId || isLoading) return;
        setIsLoading(true);
        try {
            await equipCover(selectedId);
            callToast({ type: 'success', message: { title: 'Portada equipada', description: 'Tu portada de perfil fue actualizada.' } });
            await refreshUser();
            setShowModal(false);
        } catch (err) {
            errorHandler(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Fragment>
            <button
                type="button"
                onClick={() => setShowModal(true)}
                aria-label="Editar portada"
                className="h-8 px-2.5 rounded-lg flex justify-center items-center gap-1.5 bg-stannum hover:bg-stannum-light absolute bottom-3 right-3 z-20 transition-200"
            >
                <EditIcon className="size-4 text-card" />
                <span className="hidden lg:inline text-xs font-semibold text-card">Editar</span>
            </button>
            <Modal
                className="max-w-7xl lg:aspect-video flex-col"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <div className="w-full">
                    <div className="w-full card rounded-b-none p-0 overflow-hidden relative">
                        <div className="size-full bg-gradient-to-b from-transparent to-black absolute top-0 left-0 z-10"></div>
                        <Image priority src={getCoverImage(selectedId === 'default' ? 'cover_default' : `cover_${selectedId}`)} alt="Preview portada" className="w-full aspect-video lg:aspect-auto lg:h-80 object-cover relative z-0 object-[50%_65%]" />
                    </div>
                    <div className="-mt-16 lg:-mt-44 w-full flex justify-center relative z-10">
                        <div className="size-24 lg:size-48 bg-gradient-to-br from-card to-card-light rounded-lg lg:rounded-2xl shadow-md"></div>
                    </div>
                </div>
                <div className="mt-4 lg:mt-6 w-full grow bg-card rounded-b-lg relative overflow-y-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 p-2 lg:p-4 gap-2 lg:gap-4 absolute top-0 left-0">
                        {allCovers.map(cover => {
                            const isUnlocked = unlockedSet.has(cover.id);
                            const isSelected = selectedId === cover.id;
                            return (
                                <div
                                    key={cover.id}
                                    className={`card p-0 aspect-video overflow-hidden group relative transition-150 outline outline-2 -outline-offset-1 ${
                                        isUnlocked
                                            ? `cursor-pointer ${isSelected ? 'outline-stannum' : 'outline-transparent hover:outline-stannum/40'}`
                                            : 'cursor-default outline-transparent'
                                    }`}
                                    onClick={() => isUnlocked && setSelectedId(cover.id)}
                                >
                                    <div className={`size-full rounded-lg bg-gradient-to-br from-transparent to-black absolute top-0 left-0 transition-200 ${
                                        !isUnlocked ? 'opacity-70' : isSelected ? 'opacity-50' : 'opacity-50 lg:opacity-25 lg:group-hover:opacity-50'
                                    }`}></div>
                                    {isSelected && isUnlocked && (
                                        <div className="absolute top-2 right-2 z-10">
                                            <CheckIcon className="size-5 text-stannum" />
                                        </div>
                                    )}
                                    {!isUnlocked && (
                                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2">
                                            <LockIcon className="size-7 text-white/80 drop-shadow-lg" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 z-10 p-2 flex items-center justify-between gap-1">
                                        <span className="text-xs font-bold text-white drop-shadow-md truncate">{cover.name}</span>
                                        <span
                                            className="text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0"
                                            style={rarityStyles[cover.rarity]}
                                        >
                                            {rarityLabels[cover.rarity]}
                                        </span>
                                    </div>
                                    <Image src={getCoverImage(cover.imageKey)} alt={cover.name} className={`size-full rounded-lg object-cover ${!isUnlocked ? 'grayscale' : ''}`} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-4 lg:mt-6 w-full flex justify-end items-center">
                    <button
                        type="button"
                        disabled={isLoading || selectedId === equippedCoverId}
                        onClick={handleConfirm}
                        className='w-full lg:w-32 h-9 text-sm font-semibold bg-stannum hover:bg-stannum-light disabled:opacity-50 disabled:cursor-not-allowed text-card rounded tracking-tighter flex justify-center items-center transition-200'
                    >
                        {isLoading ? <SpinnerIcon className="animate-spin size-6" /> : 'Confirmar'}
                    </button>
                </div>
            </Modal>
        </Fragment>
    )
}
