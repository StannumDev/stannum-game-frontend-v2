import { StaticImageData } from "next/image";

export type ProgramId = 'tmd' | 'tia';
export type ProgramCategory = '' | 'main' | 'free' | 'shorts';

export interface Resource {
    title: string;
    description: string;
    link: string;
    type: 'document' | 'video' | 'presentation' | 'folder' | 'activity'
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
}
  
export interface Lesson {
    id: string;
    title: string;
    description: string;
    longTitle: string;
    duration: number;
    muxPlaybackId: string;
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

export interface Program {
    id: ProgramId;
    name: string;
    price: number;
    href: string;
    categories: Array<ProgramCategory>;
    description: string;
    logo: StaticImageData;
    sections: Array<Section>;
}