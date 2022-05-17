import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, IonSearchbar } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import { Game } from 'src/app/shared/models/game.model';
import { GamesResponseData } from 'src/app/shared/models/games-response-data.model';
import { List } from 'src/app/shared/models/list.model';
import { GameService } from 'src/app/shared/services/game.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-library',
  templateUrl: 'library.page.html',
  styleUrls: ['library.page.scss']
})
export class LibraryPage implements OnInit {

  @ViewChild('customSearchbar') customSearchbar: IonSearchbar;

  public games: Game[] = [];

  public lists: List[] = [];

  public isSearchbarVisible: boolean;
  public hasDataToShow: boolean;
  public isLoading: boolean;

  public searchValue: string;

  private nextUrl: string;

  private actionSheet: HTMLIonActionSheetElement;


  constructor(
    private router: Router,
    private storageService: StorageService,
    private gameService: GameService,
    private translocoService: TranslocoService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.getAllLists();
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

  public async onClickAddToListButton(game: Game): Promise<void> {
    this.actionSheet = await this.actionSheetController.create({
      header: this.translocoService.translate('modal.addToListHeader'),
      subHeader: this.translocoService.translate('modal.addToListBody'),
      buttons: this.lists !== undefined && this.lists?.length > 0
        ? this.lists?.map((list: List) => ({ text: list?.name, handler: () => this.addGameToList(game.id, list.id) }))
        : [{ text: this.translocoService.translate('library.createList'), handler: () => this.onClickAddNewList() }]
    });
    await this.actionSheet.present();
  }

  private async getGames(url?: string): Promise<void> {
    this.isLoading = true;
    const gamesResponseData: GamesResponseData = await this.gameService.getGames(url, this.searchValue);
    this.games = gamesResponseData.results;
    this.nextUrl = gamesResponseData.next;
    this.hasDataToShow = this.games !== undefined && this.games?.length > 0;
    this.isLoading = false;
  }

  private getAllLists(): void {
    this.lists = this.storageService.getAllLists();
    this.hasDataToShow = this.lists !== undefined && this.lists?.length > 0;
  }

  private async onClickAddNewList(): Promise<void> {

    const alert = await this.alertController.create({
      header: this.translocoService.translate('lists.list.newList'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: this.translocoService.translate('lists.list.listName')
        }
      ],
      buttons: [
        {
          text: this.translocoService.translate('buttons.cancel'),
          role: 'cancel',
        }, {
          text: this.translocoService.translate('buttons.create'),
          handler: (event: any) => {
            this.addNewList(event.name);
            this.getAllLists();
          }
        }
      ]
    });

    await alert.present();
  }

  private addNewList(name: string): void {
    this.storageService.addNewList({ id: new Date().getTime().toString(), name, isOnBoard: false, games: [] });
  }

  private async addGameToList(gameId: number, listId: string): Promise<void> {
    await this.actionSheet?.dismiss();
    const game: Game = await this.gameService.getGameInfo(gameId);
    await this.storageService.addNewGame(listId, game);
  }

}
