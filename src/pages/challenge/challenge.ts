import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../game/game';

/*
  Generated class for the Challenge page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-challenge',
  templateUrl: 'challenge.html'
})
export class ChallengePage {
  gamePage = GamePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengePage');
  }

}
