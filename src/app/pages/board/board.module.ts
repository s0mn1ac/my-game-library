import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardPage } from './board.page';
import { BoardPageRoutingModule } from './board-routing.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BoardPageRoutingModule,
    TranslocoModule
  ],
  declarations: [BoardPage]
})
export class BoardPageModule {}
