import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { Game } from 'src/app/shared/models/game.model';
import { GamesResponseData } from 'src/app/shared/models/games-response-data.model';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-library',
  templateUrl: 'library.page.html',
  styleUrls: ['library.page.scss']
})
export class LibraryPage implements OnInit {

  @ViewChild('customSearchbar') customSearchbar: IonSearchbar;

  public games: Game[] = [];

  public isSearchbarVisible: boolean;
  public hasDataToShow: boolean;
  public isLoading: boolean;

  public searchValue: string;

  private nextUrl: string;

  constructor(
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.getGames(null);
  }

  public showSearchbar() {
    this.isSearchbarVisible = true;
    setTimeout(() => this.customSearchbar.setFocus(), 1);
  }

  public hideSearchbar() {
    this.isSearchbarVisible = false;
  }

  public onSearch(event: any): void {
    this.searchValue = event?.target?.value === '' ? null : event?.target?.value;
    this.getGames(null);
    this.isSearchbarVisible = false;
  }

  public async onRefresh(event: any): Promise<void> {
    await this.getGames(null);
    event.target.complete();
  }

  public async loadNextValues(event: any): Promise<void> {

    if (!this.nextUrl) {
      return;
    }

    const gamesResponseData: GamesResponseData = await this.gameService.getGames(this.nextUrl, null);
    this.games = this.games.concat(gamesResponseData.results);
    this.nextUrl = gamesResponseData.next;

    event.target.complete();
    event.target.disabled = this.nextUrl == null;
  }

  private async getGames(url?: string): Promise<void> {
    this.isLoading = true;
    const gamesResponseData: GamesResponseData = await this.gameService.getGames(url, this.searchValue);
    this.games = gamesResponseData.results;
    this.nextUrl = gamesResponseData.next;
    this.hasDataToShow = this.games !== undefined && this.games?.length > 0;
    this.isLoading = false;
  }

}
