import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire }  from 'angularfire2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = '';
  user: IUser = {
    email: '',
    password: ''
  };

  constructor(private af: AngularFire, private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  signInEmail() {
    this.auth.loginUser(this.user.email, this.user.password)
      .then(user => {
        this.router.navigate(['/user/profile']);
      }).catch(err => {
        this.message = err.message;
        this.router.navigate(['/login']);
      });
  }

  // signInFacebook() {
  //   this.auth.loginUserWithFacebook()
  //     .then(user => {
  //       console.log(user);
  //       this.router.navigate(['/user/edit']);
  //     });
  // }

  signInTwitter() {
    this.auth.loginUserWithTwitter()
      .then(user => {
        this.af.database.object(`/users/${user.uid}`, { preserveSnapshot: true })
          .subscribe(usr => {
            if (!usr.val()) {
              this.af.database.object(`/users/${user.uid}`).set({
                uid: user.uid,
                firstname: user.auth.displayName || user.auth.email,
                lastname: '',
                username: user.auth.displayName || user.auth.email,
                email: user.auth.email,
                gender: 'o',
                score: 0
              });
            }
            this.router.navigate(['/user/edit']);
          });
      }).catch(err => {
        this.message = err.message;
        this.router.navigate(['/login']);
      });
  }

  signInGoogle() {
    this.auth.loginUserWithGoogle()
    .then(user => {
      this.af.database.object(`/users/${user.uid}`, { preserveSnapshot: true })
        .subscribe(usr => {
          if (!usr.val()) {
            this.af.database.object(`/users/${user.uid}`).set({
              uid: user.uid,
              firstname: user.auth.displayName || user.auth.email,
              lastname: '',
              username: user.auth.displayName || user.auth.email,
              email: user.auth.email,
              gender: 'o',
              score: 0
            });
          }
          this.router.navigate(['/user/edit']);
        });
    }).catch(err => {
      this.message = err.message;
      this.router.navigate(['/login']);
    });
  }

  goToResetPassword() {
    this.router.navigate(['/user/recovery']);
  }
}

interface IUser {
  email: string;
  password: string;
}
