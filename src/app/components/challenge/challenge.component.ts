import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router }  from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  users: any;
  availables: any;
  challenge: Ichallenge = {
    level: 'easy',
    uid: ''
  };
  toDoChallenge: boolean = false;
  message: string = '';

  constructor(private af: AngularFire, private router: Router,
              private auth: AuthService, private fms: FlashMessagesService) {  }

  ngOnInit() {
    this.af.database.list('/users').subscribe(users => {
      this.availables = users.filter(usr => usr.uid !== this.auth.fireAuth.uid);

      this.af.database.list('/challenges').subscribe(challenges => {
        this.users = challenges.filter(ch => ch.player2 === this.auth.fireAuth.uid);

        for (let user of users) {
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].player1 === user.uid) {
              this.users[i].username = user.username;
            }
          }
        }
      });
    });
  }

  createChallenge() {
    this.toDoChallenge = !this.toDoChallenge;
  }

  saveChallenge() {
    const ref = this.af.database.object(`/challenges/${this.auth.currentUser.uid + this.challenge.uid}`, {preserveSnapshot: true });
    ref.subscribe(data => {
      if (!data.val()) {
        ref.set({
            player1: this.auth.currentUser.uid,
            player2: this.challenge.uid,
            subject: this.challenge.level,
            finish: false
          });

        this.fms.show('Tu reto ha sido enviado exitosamente', {
          cssClass: 'alert-success',
          timeout: 5000
        });
      }

      this.toDoChallenge = false;
      this.challenge = {
        level: 'easy',
        uid: ''
      };
    }).unsubscribe();
  }
}

interface Ichallenge {
  level: string;
  uid: string;
}
