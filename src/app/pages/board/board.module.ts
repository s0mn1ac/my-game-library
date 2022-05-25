import { NgModule } from '@angular/core';
import { BoardPage } from './board.page';
import { BoardPageRoutingModule } from './board-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  imports: [
    BoardPageRoutingModule,
    SharedModule
  ],
  declarations: [BoardPage]
})
export class BoardPageModule {}
