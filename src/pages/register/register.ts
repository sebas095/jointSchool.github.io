import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  user: IUser = {
    firstname: '',
    lastname: '',
    username: '',
    gender: 'f',
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController, public af: AngularFire, private auth: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onSubmit() {
    this.auth.signupUser(this.user.email, this.user.password)
      .then(user => {
        this.af.database.object('/users/' + user.uid).set({
          uid: user.uid,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          username: this.user.username,
          email: this.user.email,
          gender: this.user.gender
        });

        this.navCtrl.setRoot(LoginPage);
      });
  }
}

interface IUser {
  firstname: string;
  lastname: string;
  username: string;
  gender: string;
  email: string;
  password: string;
}
