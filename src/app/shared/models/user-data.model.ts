import { Game } from './game.model';
import { List } from './list.model';

export class UserData {
    darkMode: boolean;
    lists: List[];
    games: Game[];

    constructor() {
        this.darkMode = false;
        this.lists = [];
        this.games = [];
    }
}
