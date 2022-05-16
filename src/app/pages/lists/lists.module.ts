import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListsPage } from './lists.page';
import { ListsPageRoutingModule } from './lists-routing.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ListsPageRoutingModule,
    TranslocoModule
  ],
  declarations: [ListsPage]
})
export class ListsPageModule {}
