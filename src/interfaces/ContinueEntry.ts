import { StaticImageData } from "next/image";

export interface ContinueEntry {
    programId: "tia" | "tmd";
    programName: string;
    programLogo: StaticImageData;
    lessonTitle: string;
    href: string;
    progressPct: number;
};