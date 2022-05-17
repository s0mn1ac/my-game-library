/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { myGameLibraryStorageItem } from 'src/assets/constants/my-game-library.contants';
import { Game } from '../models/game.model';
import { List } from '../models/list.model';
import { UserData } from '../models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _userData: UserData;

  get userData() {
    return this._userData;
  }

  set userData(userData: UserData) {
    this._userData = userData;
    this.updateUserData();
  }

  public getAllLists(): List[] {
    return this._userData.lists;
  }

  public getListById(id: string): List {
    return this._userData.lists.find((list: List) => list.id === id);
  }

  public addNewList(newList: List): void {
    this._userData.lists.push(newList);
    this.updateUserData();
  }

  public modifyList(id: string, item: string, value: any): void {
    const foundList: List = this._userData.lists.find((list: List) => list.id === id);
    if (foundList !== null) {
      foundList[item] = value;
      this.updateUserData();
    }
  }

  public deleteList(id: string): void {
    const lists: List[] = this._userData.lists.filter((list: List) => list.id !== id);
    this._userData.lists = lists;
    this.updateUserData();
  }

  public addNewGame(id: string, newGame: Game): void {
    const foundList: List = this._userData.lists.find((list: List) => list.id === id);
    if (foundList === undefined) {
      return;
    }
    const foundGame: Game = foundList.games.find((game: Game) => game.id === newGame.id);
    if (foundGame !== undefined) {
      return;
    }
    foundList.games.push(newGame);
    this.updateUserData();
  }

  public deleteGames(id: string, games: Game[]): void {
    const foundList: List = this._userData.lists.find((list: List) => list.id === id);
    if (foundList !== null) {
      const availableGames: Game[] = [];
      foundList.games.forEach((game: Game) => {
        games.forEach((gameToDelete: Game) => {
          if (game.id !== gameToDelete.id) {
            availableGames.push(game);
          }
        });
      });
      foundList.games = availableGames;
      this.updateUserData();
    }
  }

  private updateUserData(): void {
    localStorage.setItem(myGameLibraryStorageItem, JSON.stringify(this._userData));
  }

}
