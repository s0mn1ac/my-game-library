import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserData } from './shared/models/user-data.model';
import { DarkModeService } from './shared/services/dark-mode.service';
import { StorageService } from './shared/services/storage.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Device, GetLanguageCodeResult } from '@capacitor/device';
import { isPlatform } from '@ionic/angular';
import { LanguageService } from './shared/services/language.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  private darkMode$: Subscription;
  private language$: Subscription;

  constructor(
    private translocoService: TranslocoService,
    private storageService: StorageService,
    private darkModeService: DarkModeService,
    private languageService: LanguageService
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
    this.language$ = this.languageService.getLanguageObservable().subscribe((language: string) => this.setLanguage(language));
  }

  private cancelSubscriptions(): void {
    this.darkMode$?.unsubscribe();
    this.language$?.unsubscribe();
  }

  private async getStoredData(): Promise<void> {
    await this.storageService.initStorage();
    let userData: UserData = await this.storageService.retrieveUserData();
    if (userData === null) {
      this.storageService.userData = new UserData();
      const prefersDark: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
      const language: GetLanguageCodeResult = await Device.getLanguageCode();
      userData = new UserData();
      userData.darkMode = prefersDark.matches;
      userData.language = language.value.startsWith('es') ? 'es' : 'en';
    }
    this.storageService.userData = userData;
    this.darkModeService.updateDarkMode(userData.darkMode);
    this.languageService.updateLanguage(userData.language);
  }

  private async setDarkMode(isEnabled: boolean): Promise<void> {
    console.log(isEnabled ? '💡 Lights OFF!' : '💡 Lights ON!');
    document.body.classList.toggle('dark', isEnabled);
    if (isPlatform('mobile')) {
      await StatusBar.setBackgroundColor({ color: isEnabled ? '#000000' : '#FFFFFF' });
      await StatusBar.setStyle({ style: isEnabled ? Style.Dark : Style.Light });
    }
  }

  private async setLanguage(language: string): Promise<void> {
    console.log(language === 'es' ? '🇪🇸 App language set to spanish' : '🇬🇧 App language set to english');
    this.translocoService.setActiveLang(language);
  }

}
