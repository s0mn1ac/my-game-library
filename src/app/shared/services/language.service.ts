/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { UserData } from '../models/user-data.model';
import { Observable, Subject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private language$ = new Subject<string>();

  constructor(
    private storageService: StorageService
  ) { }

  public getLanguageObservable(): Observable<string> {
    return this.language$.asObservable();
  }

  public updateLanguage(language: string): void {
    const userData: UserData = this.storageService.userData;
    userData.language = language;
    this.storageService.userData = userData;
    this.language$.next(language);
  }

}
