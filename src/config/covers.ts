import { StaticImageData } from 'next/image';
import type { CoverRarity } from '@/interfaces';

import cover_default from '@/assets/background/stannum_game_trophy.webp';
import cover_horizon from '@/assets/background/the_game.webp';
import cover_summer_2026 from '@/assets/background/background_tia_summer.webp';
import cover_synthwave from '@/assets/covers/synthwave.webp';
import cover_arena from '@/assets/covers/arena.webp';
import cover_rugby from '@/assets/covers/rugby.webp';
import cover_pit_lane from '@/assets/covers/pit_lane.webp';
import cover_golden_boot from '@/assets/covers/golden_boot.webp';
import cover_velocity from '@/assets/covers/velocity.webp';
import cover_void_throne from '@/assets/covers/void_throne.webp';
import cover_podium from '@/assets/covers/podium.webp';
import cover_victory from '@/assets/covers/victory.webp';

const coverImages: Record<string, StaticImageData> = {
    cover_default,
    cover_horizon,
    cover_summer_2026,
    cover_synthwave,
    cover_arena,
    cover_rugby,
    cover_pit_lane,
    cover_golden_boot,
    cover_velocity,
    cover_void_throne,
    cover_podium,
    cover_victory,
};

export const getCoverImage = (imageKey: string): StaticImageData => {
    return coverImages[imageKey] ?? cover_default;
};

export interface CoverConfig {
    id: string;
    imageKey: string;
    name: string;
    rarity: CoverRarity;
}

export const allCovers: CoverConfig[] = [
    { id: 'default', imageKey: 'cover_default', name: 'Clásica', rarity: 'common' },
    { id: 'horizon', imageKey: 'cover_horizon', name: 'Horizonte', rarity: 'uncommon' },
    { id: 'synthwave', imageKey: 'cover_synthwave', name: 'Synthwave', rarity: 'uncommon' },
    { id: 'arena', imageKey: 'cover_arena', name: 'Escenario', rarity: 'uncommon' },
    { id: 'rugby', imageKey: 'cover_rugby', name: 'Trinchera', rarity: 'rare' },
    { id: 'pit_lane', imageKey: 'cover_pit_lane', name: 'Pit Lane', rarity: 'rare' },
    { id: 'golden_boot', imageKey: 'cover_golden_boot', name: 'Botín Dorado', rarity: 'epic' },
    { id: 'velocity', imageKey: 'cover_velocity', name: 'Velocidad', rarity: 'epic' },
    { id: 'void_throne', imageKey: 'cover_void_throne', name: 'Trono', rarity: 'epic' },
    { id: 'summer_2026', imageKey: 'cover_summer_2026', name: 'Summer 2026', rarity: 'legendary' },
    { id: 'podium', imageKey: 'cover_podium', name: 'Podio', rarity: 'legendary' },
    { id: 'victory', imageKey: 'cover_victory', name: 'Victoria', rarity: 'legendary' },
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
