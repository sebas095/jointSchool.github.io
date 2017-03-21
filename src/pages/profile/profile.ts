import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditPage } from '../edit/edit';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController, private auth: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  editProfile() {
    this.navCtrl.push(EditPage);
  }
}
