import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  passwordConfirm: string;

  userObj = { email: '', password: '' }

  // Users: any = [];

  constructor(
    public Router: Router,
    public AuthService: AuthService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  navigatePage(router) {
    this.Router.navigateByUrl(router);
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  login(data: any) {

    if(this.userObj.email == '' || this.userObj.email == null ){
      this.presentToast('Insira seu email!');
      return;
    }

    if(this.userObj.password == '' || this.userObj.password == null ){
      this.presentToast('Insira sua senha!');
      return;
    }


    this.AuthService.login(this.userObj).subscribe((data: {}) => {

      if(data['success'] == false){
        this.presentToast('Verifique suas credencias!');



      } else {
        
        localStorage.setItem('U_D',data['userid'])
        localStorage.setItem('U_N',data['name'])
        localStorage.setItem('U_T', data['token'])

        
        this.presentToast('Bem-vindo ' + data['name']);

        this.navigatePage('page-menu')
      }

    })
  }



}
