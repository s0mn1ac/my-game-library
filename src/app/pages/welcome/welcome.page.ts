import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/shared/models/user-data.model';
import { StorageService } from 'src/app/shared/services/storage.service';
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public slides: string[] = [];

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.buildSlides();
  }

  private buildSlides(): void {
    const userData: UserData = this.storageService.userData;
    const mode: string = userData.darkMode ? 'dark' : 'light';
    this.slides = [
      `../../../assets/images/mockups/list-${mode}.png`,
      `../../../assets/images/mockups/library-${mode}.png`,
      `../../../assets/images/mockups/new-list-${mode}.png`,
      `../../../assets/images/mockups/board-${mode}.png`,
      `../../../assets/images/mockups/lists-${mode}.png`,
      `../../../assets/images/mockups/game-${mode}.png`
    ];
  }

}
