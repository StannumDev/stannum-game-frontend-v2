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
}

export interface Program {
    id: string;
    name: string;
    description: string;
    modules: Array<Module>;
}