import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageMenuPage } from './page-menu.page';

const routes: Routes = [
  {
    path: '',
    component: PageMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageMenuPageRoutingModule {}
