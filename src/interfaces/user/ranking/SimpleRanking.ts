export interface SimpleRanking {
    id: string;
    position: number;
    name: string;
    username: string;
    photo: string | null;
    enterprise?: string;
    points: number;
    level: number;
}