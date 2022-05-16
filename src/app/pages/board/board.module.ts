import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardPage } from './board.page';

import { BoardPageRoutingModule } from './board-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BoardPageRoutingModule
  ],
  declarations: [BoardPage]
})
export class BoardPageModule {}
