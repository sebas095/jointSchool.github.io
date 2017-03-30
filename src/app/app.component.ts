import { Component, HostBinding } from '@angular/core';
import { Router} from '@angular/router';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostBinding('style.background-color')
  backgroundColor: string = 'white';

  title = 'app works!';
  isLogin: boolean = false;

  constructor(private router: Router, private af: AngularFire, private auth: AuthService) {
    this.af.auth.subscribe(user => {
      if (user) this.isLogin = true;
      else this.isLogin = false;
    });

    this.router.events.subscribe(ev => {
      console.log(ev['url']);
      switch (ev['url']) {
        case '/':
          this.backgroundColor = '#3af4a8';
          break;
        case '/user/profile':
          this.backgroundColor = '#878fe2';
          break;
        case '/challenges/list':
          this.backgroundColor = '#f0e98c';
          break;
        case '/scores':
          this.backgroundColor = '#f5adcf';
          break;
        case '/login':
          this.backgroundColor = '#b4f58c';
          break;
        case '/user/edit':
          this.backgroundColor = '#d7a1f6';
          break;
        case '/user/create':
          this.backgroundColor = '#92f7be';
          break;
        // Challenges
        default:
          this.backgroundColor = '#f1b894';
          break;
      }
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
