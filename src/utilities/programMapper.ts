import type { Program, ProgramId, Section, Module, Lesson, Instruction, Resource } from "@/interfaces/programs";
import { programMetadata } from "@/config/programMetadata";
import { programAssets } from "@/config/programAssets";
import defaultBackground from "@/assets/background/stannum_game_trophy.webp";

const mapLesson = (lesson: Lesson & { durationSec?: number }): Lesson => ({
    ...lesson,
    duration: lesson.duration ?? lesson.durationSec ?? 0,
});

const buildResourceTree = (resources: Resource[]): Resource[] => {
    const hasParents = resources.some(r => r.parentId);
    if (!hasParents) return resources;

    const topLevel = resources.filter(r => !r.parentId);
    const childResources = resources.filter(r => r.parentId);
    return topLevel.map(r => {
        const kids = childResources.filter(c => c.parentId === r.id);
        return kids.length > 0 ? { ...r, children: kids } : r;
    });
};

const mapInstruction = (inst: Instruction): Instruction => ({
    ...inst,
    resources: inst.resources ? buildResourceTree(inst.resources) : [],
});

const mapModule = (mod: Module): Module => ({
    ...mod,
    lessons: (Array.isArray(mod.lessons) ? mod.lessons : []).map(mapLesson),
    instructions: (Array.isArray(mod.instructions) ? mod.instructions : []).map(mapInstruction),
});

const mapSection = (section: Section): Section => ({
    ...section,
    resources: section.resources ? buildResourceTree(section.resources) : undefined,
    modules: (Array.isArray(section.modules) ? section.modules : []).map(mapModule),
});

export const mapApiProgram = (apiProgram: Partial<Program>): Program => {
    const meta = programMetadata[apiProgram.id || ''] || {};
    const assets = programAssets[apiProgram.id || ''] || {};

    const sections: Section[] = (Array.isArray(apiProgram.sections) ? apiProgram.sections : []).map(mapSection);

    return {
        id: (apiProgram.id || '') as ProgramId,
        name: apiProgram.name || '',
        price: apiProgram.price ?? 0,
        categories: apiProgram.categories || [],
        description: apiProgram.description || '',
        sections,
        // Backend data has priority; hardcoded config is fallback for legacy programs
        type: apiProgram.type ?? meta.type ?? 'purchase',
        priceARS: apiProgram.priceARS ?? meta.priceARS ?? null,
        subscriptionPriceARS: apiProgram.subscriptionPriceARS ?? meta.subscriptionPriceARS ?? null,
        purchasable: apiProgram.purchasable ?? meta.purchasable ?? false,
        hidden: apiProgram.hidden ?? meta.hidden ?? false,
        longDescription: apiProgram.longDescription ?? meta.longDescription,
        learningPoints: apiProgram.learningPoints?.length ? apiProgram.learningPoints : meta.learningPoints,
        logo: assets.logo ?? undefined,
        background: assets.background ?? defaultBackground,
    };
};

export const mapApiPrograms = (apiPrograms: Partial<Program>[]): Program[] => {
    return apiPrograms.map(mapApiProgram);
};
