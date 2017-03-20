import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class AuthService {
  fireAuth: any;
  currentUser: any;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(user => {
      if (user) {
        this.fireAuth = user;
        const userRef = firebase.database().ref('/users/' + this.fireAuth.uid);
        userRef.on('value', data => {
          this.currentUser = data.val();
        });
      }
    });
  }

  signupUser(email: string, password: string): firebase.Promise<any> {
    return this.af.auth.createUser({email, password});
  }

  loginUser(email: string, password: string): firebase.Promise<any> {
    return this.af.auth.login({email, password});
  }

  logoutUser(): firebase.Promise<any> {
    return this.af.auth.logout();
  }

  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }
}
