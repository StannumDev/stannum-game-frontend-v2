import { SimpleRanking } from "./SimpleRanking";

export interface TeamRanking {
    position: number;
    team: string;
    points: number;
    members: Array<SimpleRanking>;
}