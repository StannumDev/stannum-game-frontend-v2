import { StaticImageData } from "next/image";
import { ProgramId } from "@/interfaces";

export interface ContinueEntry {
    programId: ProgramId;
    programName: string;
    programLogo?: StaticImageData | string;
    activityTitle: string;
    href: string;
    progressPct: number;
    type: 'lesson' | 'instruction';
    activityLabel: string;
    programProgress: number;
};