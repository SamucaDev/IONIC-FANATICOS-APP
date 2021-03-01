import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ProductService } from "../../service/product.service";
import { CartService } from "../../service/cart.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { NgZone } from '@angular/core';
@Component({
  selector: 'app-page-buy',
  templateUrl: './page-buy.page.html',
  styleUrls: ['./page-buy.page.scss'],
})
export class PageBuyPage implements OnInit {

  countQtd: any = 1;
  formRequest = { id: '' };

  name: string;

  product = { name: '', pathImg: '', price: 0, id: '', groupproductid: '', desc: '', priceTotal: 0, countQtd: 1, userid: 0 };


  constructor(
    private location: Location,
    public ProductService: ProductService,
    public CartService: CartService,
    public Router: Router,
    public activatedRoute: ActivatedRoute,

    private ngZone: NgZone,
    public toastController: ToastController
  ) {

    this.getData()

  }

  ngOnInit() {
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  navigateScreen() {
    this.location.back();
  }

  countMais() {
    console.log(this.countQtd);
    this.product.countQtd++;
    this.product.priceTotal = parseFloat((this.product.price * this.product.countQtd).toFixed(2));
  }

  countMenos() {
    if (this.product.countQtd == 1) {
      return;
    }

    this.product.countQtd--;

    this.product.priceTotal = parseFloat((this.product.price * this.product.countQtd).toFixed(2));



  }

  getData() {
    this.activatedRoute.queryParams.subscribe(params => {

      this.formRequest.id = params['id'];
      if (params['qtd'] != undefined && params['qtd'] != 1) {
        this.countQtd = params['qtd'];

      }

      this.findProduct();
    });
  }

  findProduct() {
    this.ProductService.findProduct(this.formRequest).subscribe((data: {}) => {

      this.product = data['formProd'];

      this.product.priceTotal = data['formProd'].price * this.countQtd



      this.product.countQtd = this.countQtd;

      this.product.userid = parseInt(localStorage.getItem('U_D'));

    });
  }

  addItem() {


    if (localStorage.getItem('U_D') == undefined) {
      this.Router.navigateByUrl('register');
    }

    this.CartService.addItem(this.product).subscribe((data: {}) => {

      // this.location.go('cart');

      this.Router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
      this.Router.onSameUrlNavigation = 'reload';

      this.ngZone.run(() => this.Router.navigate(['cart']));

      this.Router.navigateByUrl('/cart');

      this.presentToast('Item adicionado no carrinho! ');
    });
  }

  formatNumber(priceTotal){
    return priceTotal.toFixed(2);
  }



}
