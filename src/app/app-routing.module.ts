import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'page-menu',
    pathMatch: 'full'
  },
  {
    path: 'page-menu',
    loadChildren: () => import('./pages/page-menu/page-menu.module').then( m => m.PageMenuPageModule)
  },
  {
    path: 'page-menu-pizza',
    loadChildren: () => import('./pages/page-menu-pizza/page-menu-pizza.module').then( m => m.PageMenuPizzaPageModule)
  },
  {
    path: 'page-buy',
    loadChildren: () => import('./pages/page-buy/page-buy.module').then( m => m.PageBuyPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
