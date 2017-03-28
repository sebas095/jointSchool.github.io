import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  fireAuth: any;
  currentUser: any;

  constructor(private af: AngularFire) {
    this.af.auth.subscribe(user => {
      if (user) {
        this.fireAuth = user;
        const userRef = this.af.database.object(`/users/${this.fireAuth.uid}`, { preserveSnapshot: true });
        userRef.subscribe(data => {
          this.currentUser = data.val();
        });
      } else {
        this.fireAuth = {};
        this.currentUser = {};
      }
    });
  }

  signupUser(email: string, password: string): firebase.Promise<any> {
    return this.af.auth.createUser({email, password});
  }

  loginUser(email: string, password: string): firebase.Promise<any> {
    return this.af.auth.login({email, password}, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    });
  }

  loginUserWithFacebook(): firebase.Promise<any> {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Redirect
    });
  }

  loginUserWithTwitter(): firebase.Promise<any> {
    return this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup
    });
  }

  loginUserWithGoogle(): firebase.Promise<any> {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  logoutUser(): firebase.Promise<any> {
    return this.af.auth.logout();
  }

  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }
}
