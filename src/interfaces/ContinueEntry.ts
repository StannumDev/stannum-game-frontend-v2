import { StaticImageData } from "next/image";
import { ProgramId } from "@/interfaces";

export interface ContinueEntry {
    programId: ProgramId;
    programName: string;
    programLogo: StaticImageData;
    lessonTitle: string;
    href: string;
    progressPct: number;
};