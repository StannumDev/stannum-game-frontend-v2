'use client';

import Image from 'next/image';
import type { StoreCoverItem } from '@/interfaces';
import { getCoverImage, rarityStyles, rarityLabels } from '@/config/covers';
import { formatCoins } from '@/utilities';
import stannum_coin from '@/assets/tins_coin.svg';
import { CheckIcon } from '@/icons';

interface Props {
    cover: StoreCoverItem;
    onClick: () => void;
}

export const StoreCoverCard = ({ cover, onClick }: Props) => {
    const coverImage = getCoverImage(cover.imageKey);
    const rStyle = rarityStyles[cover.rarity];

    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full aspect-video rounded-lg overflow-hidden relative text-start cursor-pointer outline outline-2 -outline-offset-2 transition-all duration-200 ease-in-out hover:scale-[1.03] hover:brightness-110 ${
                cover.equipped
                    ? 'outline-stannum'
                    : 'outline-transparent hover:outline-card-lighter'
            }`}
        >
            <Image
                src={coverImage}
                alt={cover.name}
                fill
                className="object-cover transition-transform duration-200 ease-in-out"
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 16vw"
            />
            <div className="size-full bg-gradient-to-b from-black/10 via-transparent to-black/80 absolute inset-0 z-10" />

            {cover.equipped && (
                <div className="absolute top-2 right-2 z-20 bg-stannum/90 text-black text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckIcon className="size-3" />
                    Equipada
                </div>
            )}
            {!cover.equipped && cover.owned && (
                <div className="absolute top-2 right-2 z-20 bg-card-lighter/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    Desbloqueada
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 z-20 p-3 flex items-end justify-between gap-2">
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-bold text-white drop-shadow-md truncate">{cover.name}</h3>
                    {!cover.owned && (
                        <div className="flex items-center gap-1.5">
                            <Image src={stannum_coin} alt="Tins" width={16} height={16} className="size-4" />
                            <span className="text-sm font-black text-amber-400 tabular-nums drop-shadow-md">{formatCoins(cover.price)}</span>
                        </div>
                    )}
                </div>
                <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0"
                    style={rStyle}
                >
                    {rarityLabels[cover.rarity]}
                </span>
            </div>
        </button>
    );
};
