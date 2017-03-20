import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { ResetPasswordPage } from '../reset-password/reset-password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, private auth: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log(this.auth.fireAuth);
  }

  resetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }
}
