import { NgModule } from '@angular/core';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';
import { ComponentsModule } from 'src/app/shared/modules/components.module';
import { HeaderSkeletonComponent } from './skeletons/header-skeleton/header-skeleton.component';
import { AboutSkeletonComponent } from './skeletons/about-skeleton/about-skeleton.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  imports: [
    GamePageRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  declarations: [
    GamePage,
    HeaderSkeletonComponent,
    AboutSkeletonComponent
  ]
})
export class GamePageModule {}
