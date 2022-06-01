import { NgModule } from '@angular/core';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { SwiperModule } from 'swiper/angular';
// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);

@NgModule({
  imports: [
    WelcomePageRoutingModule,
    SharedModule,
    SwiperModule
  ],
  declarations: [WelcomePage]
})
export class WelcomePageModule {}
