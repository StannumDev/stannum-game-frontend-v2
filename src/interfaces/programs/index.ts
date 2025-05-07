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
    longTitle: string;
    duration: string;
    muxPlaybackId: string;
}

export interface Module {
    id: string;
    name: string;
    description: string;
    lessons: Array<Lesson>;
    instructions?: Array<Instruction>;
}

export interface Program {
    id: string;
    name: string;
    description: string;
    modules: Array<Module>;
}