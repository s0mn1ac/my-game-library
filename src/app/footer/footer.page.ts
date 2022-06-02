import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

import {
  boardIconFilled,
  boardIconOutline,
  boardTitle,
  libraryIconFilled,
  libraryIconOutline,
  libraryTitle,
  listsIconFilled,
  listsIconOutline,
  listsTitle,
  settingsIconFilled,
  settingsIconOutline,
  settingsTitle
} from 'src/assets/constants/gamery.constants';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.page.html',
  styleUrls: ['footer.page.scss']
})
export class FooterPage {

  @ViewChild('footer') footer: IonTabs;

  public board: string;
  public library: string;
  public lists: string;
  public settings: string;

  public updateFooterIcons(tabSelected: any): void {
    switch (tabSelected) {
      case boardTitle:
        this.board = boardIconFilled;
        this.library = libraryIconOutline;
        this.lists = listsIconOutline;
        this.settings = settingsIconOutline;
        break;
      case libraryTitle:
        this.board = boardIconOutline;
        this.library = libraryIconFilled;
        this.lists = listsIconOutline;
        this.settings = settingsIconOutline;
        break;
      case listsTitle:
        this.board = boardIconOutline;
        this.library = libraryIconOutline;
        this.lists = listsIconFilled;
        this.settings = settingsIconOutline;
        break;
      case settingsTitle:
        this.board = boardIconOutline;
        this.library = libraryIconOutline;
        this.lists = listsIconOutline;
        this.settings = settingsIconFilled;
        break;
      default:
        this.board = boardIconOutline;
        this.library = libraryIconOutline;
        this.lists = listsIconOutline;
        this.settings = settingsIconOutline;
        break;
    }
  }

}
