import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  play: boolean = false;
  seconds: number = 10;
  sound: any;

  constructor() {
  }

  ngOnInit() {
  }

  start() {
    setInterval(() => this.tick(), 1000);
    this.play = true;
    this.sound = new Audio();
    this.sound.src = "/assets/media/clock.mp3";
    this.sound.load();
    this.sound.play();
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
    if (--this.seconds <= 0) {
      this.seconds = 0;
      this.sound.pause();
    }
  }
}
