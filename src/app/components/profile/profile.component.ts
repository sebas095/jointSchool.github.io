import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private af: AngularFire, public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

}
