/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { myGameLibraryStorageItem } from 'src/assets/constants/my-game-library.contants';
import { Game } from '../models/game.model';
import { List } from '../models/list.model';
import { UserData } from '../models/user-data.model';
import { difference } from 'lodash';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _userData: UserData;
  private _userData$ = new Subject<UserData>();

  get userData() {
    return this._userData;
  }

  set userData(userData: UserData) {
    this._userData = userData;
    this.updateUserData();
  }

  public updateUserData(): void {
    localStorage.setItem(myGameLibraryStorageItem, JSON.stringify(this._userData));
  }

  // ---- LISTS ----------------------------------------------------------------------------------------------------------------------------

  public getAllLists(): List[] {
    return this._userData.lists;
  }

  public getListById(id: number): List {
    return this._userData.lists.find((list: List) => list.id === id);
  }

  public addNewList(newList: List): void {
    this._userData.lists.push(newList);
    this.updateUserData();
  }

  public modifyList(id: number, item: string, value: any): void {
    const foundList: List = this._userData.lists.find((list: List) => list.id === id);
    if (foundList !== null) {
      foundList[item] = value;
      this.updateUserData();
    }
  }

  public deleteList(id: number): void {
    const lists: List[] = this._userData.lists.filter((list: List) => list.id !== id);
    this._userData.lists = lists;
    this.updateUserData();
  }

  // ---- GAMES ----------------------------------------------------------------------------------------------------------------------------

  public getGameById(id: number): Game {
    return this._userData.games.find((game: Game) => game.id === id);
  }

  public addNewGame(id: number, newGame: Game): void {
    const foundList: List = this._userData.lists.find((list: List) => list.id === id);
    if (foundList === undefined) {
      return;
    }
    const foundGameId: number = foundList.games.find((gameId: number) => gameId === newGame.id);
    if (foundGameId !== undefined) {
      return;
    }
    foundList.games.push(newGame.id);
    const foundGame: Game = this._userData.games.find((game: Game) => game.id === newGame.id);
    if (foundGame === undefined) {
      this._userData.games.push(newGame);
    }
    this.updateUserData();
  }

  public modifyGame(id: number, item: string, value: any): void {
    const foundGame: Game = this._userData.games.find((game: Game) => game.id === id);
    if (foundGame !== null) {
      foundGame[item] = value;
      this.updateUserData();
    }
  }

  public deleteGames(id: number, gamesIds: number[]): void {
    const foundList: List = this._userData.lists.find((list: List) => list.id === id);
    if (foundList !== null) {
      const availableGamesIds: number[] = difference(foundList.games, gamesIds);
      foundList.games = availableGamesIds;
      this.updateUserData();
    }
  }

}
