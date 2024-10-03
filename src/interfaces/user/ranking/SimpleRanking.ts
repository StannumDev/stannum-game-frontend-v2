import { StaticImageData } from "next/image";

export interface SimpleRanking{
    position: number;
    name: string;
    photo: StaticImageData;
    enterprise: string;
    points: number
}