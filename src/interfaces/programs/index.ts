import { StaticImageData } from "next/image";

export interface Instruction {
    id: string;
    title: string;
    description: string;
    difficulty: 'LOW' | 'MEDIUM' | 'HIGH';
    rewardXP: number;
    acceptedFormats: string[];
    maxFileSizeMB: number;
    steps: string[];
    deliverableHint: string;
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
    modules: Array<Module>;
}

export interface Program {
    id: string;
    name: string;
    description: string;
    logo: StaticImageData;
    sections: Array<Section>;
}