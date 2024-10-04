import { StaticImageData } from "next/image";

export interface Achievement{
    title: string;
    description: string;
    background: StaticImageData;
    achieved: boolean;
    getProgress: () => number;
    // getProgress?: (user: any ) => number;
    // checkAchievement?: (user: any) => void;
    checkAchievement?: () => void;
}