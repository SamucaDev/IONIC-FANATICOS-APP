import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  passwordConfirm: string;

  userObj = { name: '', email: '', password: '' }

  // Users: any = [];

  constructor(
    public Router: Router,
    public AuthService: AuthService,
    public toastController: ToastController
  ) { }

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

  navigatePage(router) {
    this.Router.navigateByUrl(router);
  }

  registerUser(data: any) {
    if (
      this.userObj.email == '' ||
      this.userObj.name == '' ||
      this.userObj.password == '' ||
      this.passwordConfirm == ''
    ) {

      this.presentToast('Preencha todos os campos!');
      return;
    }


    if (this.userObj.password != this.passwordConfirm) {
      this.presentToast('Confirmação de senha inválida');
      return;
    }

    this.AuthService.registerUser(this.userObj).subscribe((data: {}) => {
      if (data['success'] == false) {
        this.presentToast(data['message']);
        return;

      } else {

        localStorage.setItem('U_D', data['userid']);
        localStorage.setItem('U_N', data['name']);
        localStorage.setItem('U_T', data['token']);

        this.presentToast('Bem-vindo ' + data['name']);

        this.navigatePage('page-menu')
      };
    })
  }

}
