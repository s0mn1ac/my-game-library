import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { myGameLibraryStorageItem } from 'src/assets/constants/my-game-library.constants';
import { UserData } from './shared/models/user-data.model';
import { DarkModeService } from './shared/services/dark-mode.service';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  private darkMode$: Subscription;

  constructor(
    private storageService: StorageService,
    private darkModeService: DarkModeService
  ) { }

  ngOnInit(): void {
    this.initSubscriptions();
    this.getStoredData();
  }

  ngOnDestroy(): void {
    this.cancelSubscriptions();
  }

  private initSubscriptions(): void {
    this.darkMode$ = this.darkModeService.getDarkModeObservable().subscribe((isEnabled: boolean) => this.setDarkMode(isEnabled));
  }

  private cancelSubscriptions(): void {
    this.darkMode$?.unsubscribe();
  }

  private getStoredData(): void {
    let userData: UserData = JSON.parse(localStorage.getItem(myGameLibraryStorageItem));
    if (userData === null) {
      this.storageService.userData = new UserData();
      const prefersDark: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
      userData = new UserData();
      userData.darkMode = prefersDark.matches;
    }
    this.storageService.userData = userData;
    this.darkModeService.updateDarkMode(userData.darkMode);
  }

  private setDarkMode(isEnabled: boolean): void {
    console.log(isEnabled ? '💡 Lights OFF!' : '💡 Lights ON!');
    document.body.classList.toggle('dark', isEnabled);
  }

}
