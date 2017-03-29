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

  constructor(private af: AngularFire) { }

  ngOnInit() {
  }

  changeTitle(title) {
    this.tops = true;
    this.title = title;
  }
}
