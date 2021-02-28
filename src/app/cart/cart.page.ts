import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";

import { Router,ActivatedRoute } from '@angular/router';
import { CartService } from "../../app/service/cart.service";


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
    private ngZone:NgZone,
    public Router: Router,
    public CartService: CartService,
    private location: Location,
    
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
    
      if(data['success'] == true){

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

  formatPrice(price){
    
  }

}
