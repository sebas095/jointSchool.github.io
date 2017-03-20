import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

/*
  Generated class for the ResetPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
  email: string = '';

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              public auth: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  resetPassword() {
    this.auth.resetPassword(this.email)
      .then(user => {
        const alert = this.alertCtrl.create({
          message: 'Acabamos de enviarte un enlace a tú correo electrónico para restablecer tú contraseña',
          buttons: [{
            text: 'Ok',
            role: 'Cancelar',
            handler: () => {
              this.navCtrl.pop();
              this.navCtrl.pop();
            }
          }]
        });

        alert.present();
      }, err => {
        const errorMessage: string = err.message;
        const errorAlert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [{
            text: 'Ok',
            role: 'Cancelar'
          }]
        });

        errorAlert.present();
      });
  }
}
