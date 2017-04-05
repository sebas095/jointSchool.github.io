import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  level: string = '';
  player1: string = '';
  player2: string = '';
  user1: any = {};
  user2: any = {};
  user1Ref: any = {};
  user2Ref: any = {};

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

            this.af.database.object(`/challenges/${this.roomKey}`, {preserveSnapshot: true})
              .subscribe(data => {
                  if (data.val()) {
                    this.level = data.val().subject;
                    this.player1 = data.val().player1;
                    this.player2 = data.val().player2;

                    this.user1Ref = this.af.database.object(`/users/${this.player1}`, {preserveSnapshot: true});
                    this.user2Ref = this.af.database.object(`/users/${this.player2}`, {preserveSnapshot: true});

                    this.user1Ref.subscribe(usr1 => {
                      const user1 = usr1.val();
                      user1[this.level] = usr1.val()[this.level] + 1;
                      user1.win += 1;
                      user1.games += 1;
                      this.user1 = user1;

                      this.user2Ref.subscribe(usr2 => {
                        const user2 = usr2.val();
                        user2[this.level] = usr2.val()[this.level] + 1;
                        user2.win += 1;
                        user2.games += 1;
                        this.user2 = user2;
                      });
                    });
                  }
              });
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
    console.log(this.user1);
    console.log(this.user2);
    this.enabled = false;
    const ref = this.af.database.object(`/challenges/${this.roomKey}`, {preserveSnapshot: true});

    if (this.answer.toLowerCase().trim() === this.challenge.answer) {
      const user1 = Object.assign({}, this.user1);
      user1[this.level] = this.user1[this.level] - 1;
      user1.win -= 1;

      this.user1Ref.set(user1);
      this.user2Ref.set(this.user2);

      this.sound.pause();
      this.win();

      ref.remove();
      this.fms.show('Felicitaciones has ganado 1 punto', {
        cssClass: 'alert-success',
        timeout: 5000
      });
      this.router.navigate(['/challenges/list']);
    } else {
      const user2 = Object.assign({}, this.user2);
      user2[this.level] = this.user2[this.level] - 1;
      user2.win = this.user2.win - 1;

      this.user1Ref.set(this.user1);
      this.user2Ref.set(user2);

      this.sound.pause();
      this.lose();

      ref.remove();
      this.fms.show('Lo sentimos perdiste, pero sigue esforzandote!!', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
      this.router.navigate(['/challenges/list']);
    }
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
