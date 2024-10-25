import { StaticImageData } from "next/image";

export interface SimpleRanking{
    position: number;
    name: string;
    username: string;
    photo: StaticImageData;
    enterprise: string;
    points: number
}