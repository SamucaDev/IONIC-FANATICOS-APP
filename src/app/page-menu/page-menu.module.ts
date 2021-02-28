import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageMenuPageRoutingModule } from './page-menu-routing.module';

import { PageMenuPage } from './page-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageMenuPageRoutingModule
  ],
  declarations: [PageMenuPage]
})
export class PageMenuPageModule {}
