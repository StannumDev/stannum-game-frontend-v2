import { StaticImageData } from "next/image";

export type ProgramId = 'tmd' | 'tia' | 'tia_summer' | 'trenno_ia' | 'demo_trenno' | 'tia_pool';
export type ProgramCategory = '' | 'main' | 'free' | 'shorts';

export interface Resource {
    id?: string;
    title: string;
    description: string;
    link?: string;
    type: 'document' | 'video' | 'presentation' | 'folder' | 'activity' | 'submission';
    children?: Array<Resource>;
}

export interface Instruction {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    difficulty: 'LOW' | 'MEDIUM' | 'HIGH';
    rewardXP: number;
    acceptedFormats: Array<string>;
    maxFileSizeMB: number;
    deliverableHint: string;
    resources: Array<Resource>;
    afterLessonId: string;
    requiredActivityId?: string;
    relatedLessonIds?: Array<string>;
    estimatedTimeSec: number;
    deliverableType: 'file' | 'text';
    tools?: Array<string>;
    steps: Array<string>;
}
  
export interface Lesson {
    id: string;
    title: string;
    description: string;
    longTitle: string;
    duration: number;
    muxPlaybackId: string;
    blocked?: boolean;
}

export interface Module {
    id: string;
    name: string;
    description: string;
    lessons: Array<Lesson>;
    instructions: Array<Instruction>;
}

export interface Section {
    id: string;
    name: string;
    modules?: Array<Module>;
    resources?: Array<Resource>;
}

export type ProgramType = 'purchase' | 'subscription' | 'demo';

export interface Program {
    id: ProgramId;
    name: string;
    type: ProgramType;
    price: number;
    priceARS: number | null;
    subscriptionPriceARS?: number | null;
    purchasable: boolean;
    categories: Array<ProgramCategory>;
    description: string;
    longDescription?: string;
    logo: StaticImageData;
    background: StaticImageData;
    sections: Array<Section>;
}