import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageMenuPizzaPage } from './page-menu-pizza.page';

const routes: Routes = [
  {
    path: '',
    component: PageMenuPizzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageMenuPizzaPageRoutingModule {}
