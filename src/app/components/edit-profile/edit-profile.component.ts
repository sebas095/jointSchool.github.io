import { Component, OnInit } from '@angular/core';
import { AngularFire }  from 'angularfire2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  message: string = '';

  constructor(private af: AngularFire, public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSave() {
    this.af.database.object(`/users/${this.auth.currentUser.uid}`)
      .set(this.auth.currentUser)
      .then(() => {
        this.router.navigate(['/user/profile']);
      })
      .catch(err => {
        this.message = err.message;
        this.router.navigate(['/user/edit']);
      });
  }
}
