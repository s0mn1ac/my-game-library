import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { EmptyScreenComponent } from 'src/app/components/game-card/empty-screen/empty-screen.component';
import { GameCardComponent } from 'src/app/components/game-card/game-card.component';

@NgModule({
  declarations: [
    GameCardComponent,
    EmptyScreenComponent
  ],
  exports: [
    GameCardComponent,
    EmptyScreenComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TranslocoModule
  ]
})
export class ComponentsModule { }
