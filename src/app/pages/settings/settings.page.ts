import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/shared/models/user-data.model';
import { DarkModeService } from 'src/app/shared/services/dark-mode.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public isDarkModeEnabled: boolean;

  constructor(
    private storageService: StorageService,
    private darkModeService: DarkModeService
  ) { }

  ngOnInit() {
    this.setInitialData();
  }

  public onChangeDarkMode(): void {
    this.darkModeService.updateDarkMode(this.isDarkModeEnabled);
  }

  private setInitialData(): void {
    const userData: UserData = this.storageService.userData;
    this.isDarkModeEnabled = userData.darkMode;
  }

}
