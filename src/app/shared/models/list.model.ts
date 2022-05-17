import { Game } from './game.model';

export class List {
    id?: string;
    name: string;
    isOnBoard: boolean;
    position?: number;
    games: Game[];
}
