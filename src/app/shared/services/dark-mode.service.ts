/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { UserData } from '../models/user-data.model';
import { Observable, Subject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private darkMode$ = new Subject<boolean>();

  constructor(
    private storageService: StorageService
  ) { }

  public getDarkModeObservable(): Observable<boolean> {
    return this.darkMode$.asObservable();
  }

  public updateDarkMode(isEnabled: boolean): void {
    const userData: UserData = this.storageService.userData;
    userData.darkMode = isEnabled;
    this.storageService.userData = userData;
    this.darkMode$.next(isEnabled);
  }

}
