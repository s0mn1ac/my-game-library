import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/shared/models/user-data.model';
import { DarkModeService } from 'src/app/shared/services/dark-mode.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public languageSelected: string;

  public isDarkModeEnabled: boolean;

  constructor(
    private storageService: StorageService,
    private darkModeService: DarkModeService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.setInitialData();
  }

  public onChangeDarkMode(event: any): void {
    this.darkModeService.updateDarkMode(event?.detail?.value);
  }

  public onChangeLanguage(event: any): void {
    this.languageService.updateLanguage(event?.detail?.value);
  }

  private setInitialData(): void {
    const userData: UserData = this.storageService.userData;
    this.isDarkModeEnabled = userData.darkMode;
    this.languageSelected = userData.language;
  }

}
