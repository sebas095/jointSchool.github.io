import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message: string = '';
  user: IUser = {
    firstname: '',
    lastname: '',
    username: '',
    gender: 'f',
    email: '',
    password: ''
  };

  constructor(private af: AngularFire, private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.signupUser(this.user.email, this.user.password)
      .then(user => {
        this.af.database.object(`/users/${user.uid}`).set({
          uid: user.uid,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          username: this.user.username,
          email: this.user.email,
          gender: this.user.gender
        });

        this.router.navigate(['/login']);
      }).catch(err => {
        this.message = err.message;
        this.router.navigate(['/user/create']);
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
