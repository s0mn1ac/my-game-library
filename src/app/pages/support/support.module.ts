import { NgModule } from '@angular/core';

import { SupportPageRoutingModule } from './support-routing.module';

import { SupportPage } from './support.page';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  imports: [
    SupportPageRoutingModule,
    SharedModule
  ],
  declarations: [SupportPage]
})
export class SupportPageModule {}
