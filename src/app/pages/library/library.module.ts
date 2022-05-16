import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibraryPage } from './library.page';
import { LibraryPageRoutingModule } from './library-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { ComponentsModule } from 'src/app/shared/modules/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LibraryPageRoutingModule,
    TranslocoModule,
    ComponentsModule
  ],
  declarations: [LibraryPage]
})
export class LibraryPageModule {}
