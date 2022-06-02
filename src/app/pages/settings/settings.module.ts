import { NgModule } from '@angular/core';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  imports: [
    SettingsPageRoutingModule,
    SharedModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
