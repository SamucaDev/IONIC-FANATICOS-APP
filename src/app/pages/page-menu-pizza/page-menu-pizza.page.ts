import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../service/product.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-menu-pizza',
  templateUrl: './page-menu-pizza.page.html',
  styleUrls: ['./page-menu-pizza.page.scss'],
})
export class PageMenuPizzaPage implements OnInit {

  // formRequest : { groupproductid: any }
  formRequest = { groupproductid: '' }

  title: any;



  products: Array<{ desc: any, groupproductid: any, id: any, name: any, pathImg: any, price: any }>;

  constructor(
    public Router: Router,
    public ProductService: ProductService,
    public activatedRoute: ActivatedRoute
  ) {
    this.getData()
  }

  ngOnInit() {
  }

  getData() {
    this.activatedRoute.queryParams.subscribe(params => {

      this.formRequest.groupproductid = params['groupproductid'];

      if (params['groupproductid'] == 1) {
        this.title = 'Pizza Salgada'
      } else if (params['groupproductid'] == 2) {
        this.title = 'Pizza Doce'
      } else {
        this.title = 'Bibidas'
      }

      this.getProductFunction();
    });
  }

  navigateScreen(route, id) {

    var typeQuery = {
      queryParams: {
        'id': id,
      }
    };

    this.Router.navigate([route], typeQuery);
  }


  getProductFunction() {
    console.log();
    this.ProductService.getProduct(this.formRequest).subscribe((data: {}) => {

      // console.log(data['formProd']);

      let formProd = data['formProd']
      this.products = formProd;
    });


  }


}
