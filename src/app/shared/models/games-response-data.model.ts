import { Game } from './game.model';

export class GamesResponseData {
    count: number;
    next: string;
    previous: string;
    results: Game[];

    constructor(report: any, games: Game[]) {
        this.count = report.count;
        this.next = report.next;
        this.previous = report.previous;
        this.results = games;
    }
}
