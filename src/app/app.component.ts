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
    const userData: UserData = JSON.parse(localStorage.getItem(myGameLibraryStorageItem)) ?? new UserData();
    localStorage.setItem(myGameLibraryStorageItem, JSON.stringify(userData));
    this.storageService.userData = userData as UserData;
  }

}
