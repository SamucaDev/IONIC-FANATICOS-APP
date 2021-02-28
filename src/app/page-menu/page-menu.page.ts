import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


import { ProductService } from "../../app/service/product.service";

@Component({
  selector: 'app-page-menu',
  templateUrl: './page-menu.page.html',
  styleUrls: ['./page-menu.page.scss'],
})
export class PageMenuPage implements OnInit {

  objProduct: any;

  name: any;
  pathImg: any;
  price: any;
  id: any;
  groupproductid: any;

  constructor(
    public Router: Router,
    public ProductService: ProductService,
  ) {
    this.getMainProduct()
  }

  ngOnInit() {
  }

  navigateScreen(route, type = null) {

    var typeQuery = {
      queryParams: {
        'groupproductid': type,
      }
    };

    this.Router.navigate([route], typeQuery);
  }

  gotoCart() {
    if (localStorage.getItem('U_D') == undefined) {
      this.Router.navigateByUrl('register');
    } else {

      // this.Router.navigate(['cart'], this.id);
      this.Router.navigateByUrl('cart');
    }
  }

  navigateScreenMainProduct(route, id) {

    var typeQuery = {
      queryParams: {
        'id': id,
      }
    };

    this.Router.navigate([route], typeQuery);
  }

  getMainProduct() {

    this.ProductService.getFirst().subscribe((data: {}) => {

      this.objProduct = data['formProd'];

      this.name           = data['formProd'].name;
      this.pathImg        = data['formProd'].pathImg;
      this.groupproductid = data['formProd'].groupproductid;
      this.id             = data['formProd'].id;
      this.price          = (data['formProd'].price).replace('.',',');

      console.log(this.objProduct);
    })

  }

}
