import { NgModule } from '@angular/core';

import { LegalPageRoutingModule } from './legal-routing.module';

import { LegalPage } from './legal.page';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  imports: [
    LegalPageRoutingModule,
    SharedModule
  ],
  declarations: [LegalPage]
})
export class LegalPageModule {}
