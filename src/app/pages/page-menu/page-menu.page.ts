import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../../service/product.service";
import { AlertController } from '@ionic/angular';

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

  
  nameUser: string;

  constructor(
    public Router: Router,
    public ProductService: ProductService,
    public alertController: AlertController
  ) {
    this.getMainProduct()
    
    this.nameUser = localStorage.getItem('U_N')
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

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Deseja sair?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Sim',
          handler: () => {
            localStorage.removeItem('U_T');
            localStorage.removeItem('U_N');
            localStorage.removeItem('U_D');
            this.Router.navigateByUrl('/page-menu');
          }
        }
      ]
    });

    await alert.present();
  }


}
