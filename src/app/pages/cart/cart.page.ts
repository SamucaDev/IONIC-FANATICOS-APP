import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";

import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from "../../service/cart.service";

import { ToastController } from '@ionic/angular';

import { NgZone } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  countQtd: any = 0;

  priceTotal: any;

  formItems: any
  products: any

  constructor(
    private ngZone: NgZone,
    public Router: Router,
    public CartService: CartService,
    private location: Location,

    public toastController: ToastController,
    public activatedRoute: ActivatedRoute,
  ) {

    this.activatedRoute.params.subscribe(val => {
      // put the code from `ngOnInit` here
      this.getItemCart()
    });
  }

  ngOnInit() {
    // this.getItemCart()
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  navigateScreen(route, id, qtd) {
    console.log(id + 'Teste');
    var typeQuery = {
      queryParams: {
        'id': id,
        'qtd': qtd,
      }
    };

    this.Router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.Router.onSameUrlNavigation = 'reload';
    this.Router.navigate([route], typeQuery);
  }

  countMais() {
    this.countQtd++
  }

  countMenos() {
    this.countQtd--
  }

  getItemCart() {
    this.CartService.getItemsCart().subscribe((data: {}) => {

      if (data['success'] == true) {

        this.formItems = data['formItems'];
        this.products = this.formItems.products;
        this.priceTotal = this.formItems.priceTotal
        console.log(this.formItems.products);

      } else {
        // tratative erro  
      }

    });
  }
  clearCart() {
    this.CartService.clear(this.formItems.cartid).subscribe((data: {}) => {

      this.Router.navigateByUrl('/page-menu')

    });
  }

  formatPrice(price) {

    const expression = /^\d*(\,[1-9]{1})?$/g;

    const reg = new RegExp(expression);

    if (reg.test(price)) {
      console.log(price + '0');
      return price + '0';
    } else {
      console.log(price + '00');
      return price + '00'
    }

    return price.replace();
  }

  sendOrder() {
    this.presentToast('Função em construção!')
  }

}
