import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  users: FirebaseListObservable<any>;
  newChallenge: boolean = false;
  message: string = '';

  constructor(private af: AngularFire, private router: Router) {
    this.users = this.af.database.list('/users');
  }

  ngOnInit() {
  }

  createChallenge() {
    this.newChallenge = !this.newChallenge;
  }
}
