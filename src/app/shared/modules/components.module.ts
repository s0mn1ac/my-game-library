import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { EmptyScreenComponent } from 'src/app/components/empty-screen/empty-screen.component';
import { GameCardComponent } from 'src/app/components/game-card/game-card.component';
import { ListCardComponent } from 'src/app/components/list-card/list-card.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { NoteBuilderComponent } from 'src/app/components/note-builder/note-builder.component';

@NgModule({
  declarations: [
    GameCardComponent,
    EmptyScreenComponent,
    ListCardComponent,
    ModalComponent,
    NoteBuilderComponent
  ],
  exports: [
    GameCardComponent,
    EmptyScreenComponent,
    ListCardComponent,
    ModalComponent,
    NoteBuilderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TranslocoModule
  ]
})
export class ComponentsModule { }
