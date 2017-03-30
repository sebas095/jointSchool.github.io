import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  title: string = '';
  tops: boolean = false;
  easy: Array<any>;
  intermediate: Array<any>;
  hard: Array<any>;

  constructor(private af: AngularFire) { }

  ngOnInit() {
    this.af.database.list('/users')
      .subscribe(users => {
        // TODO separa los usuarios por dificultad
        // .sort((a, b) => {
        //   return (a.easy - b.easy);
        // })
        // .sort((a, b) => {
        //   return (a.intermediate - b.intermediate);
        // })
        // // .sort((a, b) => {
        //   return (a.hard - b.hard);
        // })
      });
  }

  changeTitle(title) {
    this.tops = true;
    this.title = title;
  }
}
