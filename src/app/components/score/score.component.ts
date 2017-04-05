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
  users: Array<any>;

  constructor(private af: AngularFire) { }

  ngOnInit() {
    this.af.database.list('/users')
      .subscribe(users => {
        this.easy = this.getArray(users, 'easy');
        this.easy = this.addIndex(this.easy);

        this.intermediate = this.getArray(users, 'intermediate');
        this.intermediate = this.addIndex(this.intermediate);

        this.hard = this.getArray(users, 'hard');
        this.hard = this.addIndex(this.hard);
      });
  }

  getArray(array, attr): Array<any> {
    let ans = array.sort((a, b) => {
      return (b[attr] - a[attr]);
    });

    if (ans.length > 5) ans = ans.slice(0, 5);
    return ans;
  }

  addIndex(array): Array<any> {
    return array.map((item, index) => {
      item.index = index;
      return item;
    });
  }

  showScore(title: string, opt: number) {
    this.tops = true;
    this.title = title;
    switch (opt) {
      case 1:
        this.users = this.easy;
        break;
      case 2:
        this.users = this.intermediate;
        break;
      case 3:
        this.users = this.hard;
        break;
    }
  }
}
