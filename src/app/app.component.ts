import { Component, OnInit } from '@angular/core';
import { myGameLibraryStorageItem } from 'src/assets/constants/my-game-library.contants';
import { UserData } from './shared/models/user-data.model';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getStoredData();
  }

  private getStoredData(): void {
    const userData: UserData = JSON.parse(localStorage.getItem(myGameLibraryStorageItem));
    if (userData === null) {
      this.initApp();
      return;
    }
    this.storageService.userData = userData as UserData;
  }

  private initApp(): void {
    const prefersDark: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    this.setDarkMode(prefersDark.matches);
    this.storageService.userData = new UserData();
  }

  private setDarkMode(isDarkModeEnabled: boolean): void {
    document.body.classList.toggle('dark', isDarkModeEnabled);
  }

}
