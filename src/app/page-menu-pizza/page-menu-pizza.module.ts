import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageMenuPizzaPageRoutingModule } from './page-menu-pizza-routing.module';

import { PageMenuPizzaPage } from './page-menu-pizza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageMenuPizzaPageRoutingModule
  ],
  declarations: [PageMenuPizzaPage]
})
export class PageMenuPizzaPageModule {}
