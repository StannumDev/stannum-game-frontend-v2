import { StaticImageData } from 'next/image';
import type { CoverRarity } from '@/interfaces';

import cover_default from '@/assets/background/stannum_game_trophy.webp';
import cover_circuits from '@/assets/background/login.webp';
import cover_horizon from '@/assets/background/the_game.webp';
import cover_nebula from '@/assets/background/tmd.webp';
import cover_futuristic from '@/assets/background/register.webp';
import cover_elite from '@/assets/background/background_tia_summer.webp';

const coverImages: Record<string, StaticImageData> = {
    cover_default,
    cover_circuits,
    cover_horizon,
    cover_nebula,
    cover_futuristic,
    cover_elite,
};

export const getCoverImage = (imageKey: string): StaticImageData => {
    return coverImages[imageKey] ?? cover_default;
};

export const allCovers: Array<{ id: string; imageKey: string; name: string; rarity: CoverRarity }> = [
    { id: 'default', imageKey: 'cover_default', name: 'Clásica', rarity: 'common' },
    { id: 'circuits', imageKey: 'cover_circuits', name: 'Circuitos', rarity: 'uncommon' },
    { id: 'horizon', imageKey: 'cover_horizon', name: 'Horizonte', rarity: 'uncommon' },
    { id: 'nebula', imageKey: 'cover_nebula', name: 'Nebulosa', rarity: 'rare' },
    { id: 'futuristic', imageKey: 'cover_futuristic', name: 'Futurista', rarity: 'epic' },
    { id: 'elite', imageKey: 'cover_elite', name: 'STANNUM Elite', rarity: 'legendary' },
];

export const rarityStyles: Record<CoverRarity, React.CSSProperties> = {
    common: { color: '#d4d4d4', backgroundColor: 'rgba(115,115,115,0.5)', borderColor: 'rgba(163,163,163,0.6)' },
    uncommon: { color: '#86efac', backgroundColor: 'rgba(34,197,94,0.35)', borderColor: 'rgba(74,222,128,0.6)' },
    rare: { color: '#93c5fd', backgroundColor: 'rgba(59,130,246,0.35)', borderColor: 'rgba(96,165,250,0.6)' },
    epic: { color: '#c084fc', backgroundColor: 'rgba(168,85,247,0.35)', borderColor: 'rgba(192,132,252,0.6)' },
    legendary: { color: '#fcd34d', backgroundColor: 'rgba(245,158,11,0.35)', borderColor: 'rgba(252,211,77,0.6)' },
};

export const rarityLabels: Record<CoverRarity, string> = {
    common: 'Común',
    uncommon: 'Poco común',
    rare: 'Rara',
    epic: 'Épica',
    legendary: 'Legendaria',
};
