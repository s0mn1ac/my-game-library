/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { gameryStorageItem } from 'src/assets/constants/gamery.constants';
import { Game } from '../models/game.model';
import { List } from '../models/list.model';
import { UserData } from '../models/user-data.model';
import { difference } from 'lodash';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage;

  private _userData: UserData;

  constructor(
    private storage: Storage
  ) { }

  // ---- STORAGE --------------------------------------------------------------------------------------------------------------------------

  get userData() {
    return this._userData;
  }

  set userData(userData: UserData) {
    this._userData = userData;
    this.storeUserData();
  }

  public async initStorage(): Promise<void> {
    this._storage = await this.storage.create();
  }

  public async storeUserData(): Promise<void> {
    await this._storage.set(gameryStorageItem, this._userData);
  }

  public async retrieveUserData(): Promise<UserData> {
    return await this._storage.get(gameryStorageItem);
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
    this.storeUserData();
  }

  public modifyList(id: number, item: string, value: any): void {
    const foundList: List = this._userData.lists.find((list: List) => list.id === id);
    if (foundList !== null) {
      foundList[item] = value;
      this.storeUserData();
    }
  }

  public deleteList(id: number): void {
    const lists: List[] = this._userData.lists.filter((list: List) => list.id !== id);
    this._userData.lists = lists;
    this.storeUserData();
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
    this.storeUserData();
  }

  public modifyGame(id: number, item: string, value: any): void {
    const foundGame: Game = this._userData.games.find((game: Game) => game.id === id);
    if (foundGame !== null) {
      foundGame[item] = value;
      this.storeUserData();
    }
  }

  public deleteGames(id: number, gamesIds: number[]): void {
    const foundList: List = this._userData.lists.find((list: List) => list.id === id);
    if (foundList !== null) {
      const availableGamesIds: number[] = difference(foundList.games, gamesIds);
      foundList.games = availableGamesIds;
      this.storeUserData();
    }
  }

}
