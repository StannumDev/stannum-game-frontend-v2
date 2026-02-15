export interface RankTier {
    id: string;
    name: string;
    minLevel: number;
    maxLevel: number;
    color: string;
    colorSecondary: string;
}

export const RANK_TIERS: RankTier[] = [
    { id: 'hierro',    name: 'Hierro',    minLevel: 1,  maxLevel: 4,  color: '#a0a0a0', colorSecondary: '#6b6b6b' },
    { id: 'bronce',    name: 'Bronce',    minLevel: 5,  maxLevel: 9,  color: '#cd7f32', colorSecondary: '#8b5a2b' },
    { id: 'plata',     name: 'Plata',     minLevel: 10, maxLevel: 14, color: '#e8e8e8', colorSecondary: '#a0a0a0' },
    { id: 'oro',       name: 'Oro',       minLevel: 15, maxLevel: 19, color: '#ffd700', colorSecondary: '#ffaa00' },
    { id: 'diamante',  name: 'Diamante',  minLevel: 20, maxLevel: 24, color: '#b9f2ff', colorSecondary: '#6dd5ed' },
    { id: 'stannum',   name: 'STANNUM',   minLevel: 25, maxLevel: 30, color: '#00FFCC', colorSecondary: '#4fffdc' },
];

const DEFAULT_RANK = RANK_TIERS[0];

export function getRankByLevel(level: number): RankTier {
    return RANK_TIERS.find(r => level >= r.minLevel && level <= r.maxLevel) ?? DEFAULT_RANK;
}