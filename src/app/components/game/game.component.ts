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

  constructor(private activatedRoute: ActivatedRoute, private af: AngularFire,
              private router: Router, private fms: FlashMessagesService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        const level = params['level'];
        const challengeId = params['id'];
        this.af.database.object(`/topics/${level}/${challengeId}`, {preserveSnapshot: true})
          .subscribe(data => {
            this.challenge = data.val();
            this.seconds = data.val().time;
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
    if (this.answer.toLowerCase().trim() === this.challenge.answer) {
      this.sound.pause();
      this.win();
      this.fms.show('Felicitaciones has ganado 1 punto', {
        cssClass: 'alert-success',
        timeout: 5000
      });
    } else {
      this.sound.pause();
      this.lose();
      this.fms.show('Lo sentimos perdiste, pero sigue esforzandote!!', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
    }
    this.router.navigate(['/challenges/list']);
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
