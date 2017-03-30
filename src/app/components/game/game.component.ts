import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as firebase from 'firebase';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  play: boolean = false;
  enabled: boolean = true;
  challenge: any;
  sound: any;
  seconds: number;
  interval: any;
  answer: string = '';
  roomKey: string = '';
  currentChallenge: any = {};
  level: string = '';
  player1: string = '';
  player2: string = '';

  constructor(private activatedRoute: ActivatedRoute, private af: AngularFire,
              private router: Router, private fms: FlashMessagesService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        const level = params['level'];
        const challengeId = params['id'];
        this.roomKey = params['roomKey'];

        this.af.database.object(`/topics/${level}/${challengeId}`, {preserveSnapshot: true})
          .subscribe(d => {
            this.challenge = d.val();
            this.seconds = d.val().time;
          });
      });

  }

  start() {
    this.interval = setInterval(() => this.tick(), 1000);
    this.play = true;
    this.sound = new Audio();
    this.sound.src = "/assets/media/clock.mp3";
    this.sound.load();
    this.sound.play();
  }

  finish() {
    this.enabled = false;
    const ref = this.af.database.object(`/challenges/${this.roomKey}`, {preserveSnapshot: true});
    const chRef = firebase.database().ref(`/challenges/${this.roomKey}`);

    // chRef.on('value', chData => {
    //   this.level = chData.val().subject;
    //   this.player1 = chData.val().player1;
    //   this.player2 = chData.val().player2;

      // let user1Ref = firebase.database().ref(`/users/${this.player1}`)
      // let user2Ref = firebase.database().ref(`/users/${this.player2}`)

      if (this.answer.toLowerCase().trim() === this.challenge.answer) {
        this.sound.pause();
        this.win();
        ref.remove();
        this.router.navigate(['/challenges/list']);
        // user1Ref.on('value', usr1 => {
        //   const user = usr1.val();
        //   user[this.level] = usr1.val()[this.level] + 1;
        //   user.win += 1;
        //   user.games += 1;
        //   user1Ref.set(user);
        //   user1Ref = null;
        //   ref.remove();
        //   this.router.navigate(['/challenges/list']);
        // });
      } else {
        this.sound.pause();
        this.lose();
        ref.remove();
        this.router.navigate(['/challenges/list']);
        // user2Ref.on('value', usr2 => {
        //   const user = usr2.val();
        //   console.log(user);
        //   user[this.level] = usr2.val()[this.level] + 1;
        //   user.win += 1;
        //   user.games += 1;
        //   user2Ref.set(user);
        //   user2Ref = null;
        //   ref.remove();
        //   this.router.navigate(['/challenges/list']);
        // });
      }
    // });
  }

  win() {
    this.sound = new Audio();
    this.sound.src = "/assets/media/win.mp3";
    this.sound.load();
    this.sound.play();
  }

  lose() {
    this.sound = new Audio();
    this.sound.src = "/assets/media/lose.mp3";
    this.sound.load();
    this.sound.play();
  }

  private tick() {
    if (--this.seconds < 1) {
      clearInterval(this.interval);
      this.seconds = 0;
      this.sound.pause();
    }
  }
}
