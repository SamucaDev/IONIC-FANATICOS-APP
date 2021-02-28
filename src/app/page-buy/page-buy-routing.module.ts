import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageBuyPage } from './page-buy.page';

const routes: Routes = [
  {
    path: '',
    component: PageBuyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageBuyPageRoutingModule {}
