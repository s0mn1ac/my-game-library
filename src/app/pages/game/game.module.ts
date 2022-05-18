import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';
import { TranslocoModule } from '@ngneat/transloco';
import { ComponentsModule } from 'src/app/shared/modules/components.module';
import { HeaderSkeletonComponent } from './skeletons/header-skeleton/header-skeleton.component';
import { AboutSkeletonComponent } from './skeletons/about-skeleton/about-skeleton.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GamePageRoutingModule,
    TranslocoModule,
    ComponentsModule
  ],
  declarations: [
    GamePage,
    HeaderSkeletonComponent,
    AboutSkeletonComponent
  ]
})
export class GamePageModule {}
