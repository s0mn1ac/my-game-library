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
  listsTitle
} from 'src/assets/constants/my-game-library.contants';

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

  public updateFooterIcons(tabSelected: any): void {
    switch (tabSelected) {
      case boardTitle:
        this.board = boardIconFilled;
        this.library = libraryIconOutline;
        this.lists = listsIconOutline;
        break;
      case libraryTitle:
        this.board = boardIconOutline;
        this.library = libraryIconFilled;
        this.lists = listsIconOutline;
        break;
      case listsTitle:
        this.board = boardIconOutline;
        this.library = libraryIconOutline;
        this.lists = listsIconFilled;
        break;
      default:
        this.board = boardIconOutline;
        this.library = libraryIconOutline;
        this.lists = listsIconOutline;
        break;
    }
  }

}
