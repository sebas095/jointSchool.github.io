import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  isLogin: boolean = false;

  constructor(private router: Router, private af: AngularFire, private auth: AuthService) {
    this.af.auth.subscribe(user => {
      if (user) this.isLogin = true;
      else this.isLogin = false;
    });
  }

  signOut() {
    this.router.navigateByUrl('/');
    this.auth.logoutUser()
      .then(() => {
        this.isLogin = false;
      }).catch(err => {
        console.log(err);
      });
  }

}
