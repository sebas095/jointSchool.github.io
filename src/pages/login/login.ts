import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { ProfilePage } from '../profile/profile';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: IUser = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController, private auth: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log(this.auth.fireAuth);
  }

  signIn() {
    this.auth.loginUser(this.user.email, this.user.password)
      .then(user => {
        this.navCtrl.setRoot(ProfilePage);
        console.log("USER: ", user);
      });
  }

  resetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  register() {
    this.navCtrl.setRoot(RegisterPage);
  }
}

interface IUser {
  email: string;
  password: string;
}
