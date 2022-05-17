/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
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
  }

}
