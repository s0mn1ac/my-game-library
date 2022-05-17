import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListsPage } from './lists.page';
import { ListsPageRoutingModule } from './lists-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { ComponentsModule } from 'src/app/shared/modules/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ListsPageRoutingModule,
    TranslocoModule,
    ComponentsModule
  ],
  declarations: [ListsPage]
})
export class ListsPageModule {}
