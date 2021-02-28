import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageBuyPageRoutingModule } from './page-buy-routing.module';

import { PageBuyPage } from './page-buy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageBuyPageRoutingModule
  ],
  declarations: [PageBuyPage]
})
export class PageBuyPageModule {}
