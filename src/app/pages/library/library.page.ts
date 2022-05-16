import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { GamesResponseData } from 'src/app/shared/models/games-response-data.model';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-library',
  templateUrl: 'library.page.html',
  styleUrls: ['library.page.scss']
})
export class LibraryPage implements OnInit {

  public games: Game[] = [];

  public hasDataToShow: boolean;
  public isLoading: boolean;

  private nextUrl: string;
  private lastSearchValue: string;

  constructor(
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.getLastReleasedGames();
  }

  public async onRefresh(event: any): Promise<void> {
    await this.onSearch(this.lastSearchValue);
    event.target.complete();
  }

  public async onSearch(value: string): Promise<void> {

    this.isLoading = true;

    this.lastSearchValue = value;

    if (value == null) {
      await this.getLastReleasedGames();
      this.isLoading = false;
      return;
    }

    const gamesResponseData: GamesResponseData = await this.gameService.getFilteredGames(value);
    this.games = gamesResponseData.results;
    this.nextUrl = gamesResponseData.next;
    this.hasDataToShow = this.games !== undefined && this.games?.length > 0;

    this.isLoading = false;
  }

  public async loadNextValues(event: any): Promise<void> {

    if (!this.nextUrl) {
      return;
    }

    const gamesResponseData: GamesResponseData = await this.gameService.getGamesByUrl(this.nextUrl);
    this.games = this.games.concat(gamesResponseData.results);
    this.nextUrl = gamesResponseData.next;

    event.target.complete();
    event.target.disabled = this.nextUrl == null;
  }

  private async getLastReleasedGames(): Promise<void> {
    const gamesResponseData: GamesResponseData = await this.gameService.getLastReleasedGames();
    this.games = gamesResponseData.results;
    this.nextUrl = gamesResponseData.next;
    this.hasDataToShow = this.games !== undefined && this.games?.length > 0;
  }

}
