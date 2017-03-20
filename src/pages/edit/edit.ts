import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})
export class EditPage {

  constructor(public navCtrl: NavController, private auth: AuthService, private af: AngularFire) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  onSave() {
    this.af.database.object('/users/' + this.auth.currentUser.uid)
      .set(this.auth.currentUser)
      .then(() => {
        this.navCtrl.pop();
      });
  }
}
