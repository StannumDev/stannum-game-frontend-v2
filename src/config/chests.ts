import type { CoverRarity } from '@/interfaces';

export interface ChestConfig {
    id: string;
    moduleId: string;
    afterItemId: string;
    name: string;
    rarity: CoverRarity;
}

const moduleChests: Record<string, ChestConfig[]> = {
    'TIAM01': [
        { id: 'TIAM01C01', moduleId: 'TIAM01', afterItemId: 'TIAM01L03', name: 'Cofre', rarity: 'uncommon' },
        { id: 'TIAM01C02', moduleId: 'TIAM01', afterItemId: 'TIAM01I01', name: 'Cofre', rarity: 'rare' },
    ],
    'TIAM02': [
        { id: 'TIAM02C01', moduleId: 'TIAM02', afterItemId: 'TIAM02L10', name: 'Cofre', rarity: 'uncommon' },
    ],
};

export const getModuleChests = (moduleId: string): ChestConfig[] => moduleChests[moduleId] ?? [];
