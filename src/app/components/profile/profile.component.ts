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
  data1: Array<Item> = [];
  data2: Array<Item> = [];
  radius: number = 50;
  width: number = 20;
  fontColor: string = 'white';
  fontSize: number= 10;

  constructor(private af: AngularFire, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.af.database.object(`/users/${this.auth.fireAuth.uid}`, {preserveSnapshot: true})
      .subscribe(data => {
        const {easy, intermediate, hard, games, win} = data.val();
        this.data1 = [
          {
            name: 'Victorias',
            count: win,
            color: '#6ab8de'
          },
          {
            name: 'Derrotas',
            count: games - win,
            color: '#f5da95'
          }
        ];

        this.data2 = [
          {
            name: 'Fácil',
            count: easy,
            color: '#a3eba2'
          },
          {
            name: 'Interedio',
            count: intermediate,
            color: '#89f7f1'
          },
          {
            name: 'Difícil',
            count: hard,
            color: '#c191f1'
          }
        ];
      });
  }

  get perimeter() {
    return Math.PI * 2 * this.radius;
  }

  total(items) {
    return items
      .map(a => a.count)
      .reduce((x, y) => x + y);
  }

  get center() {
     return this.radius + (this.width / 2);
  }

  get viewBox() {
    return "0 0 "+ (this.center * 2).toString() + " " + (this.center * 2).toString();
  }

  getOffset(index: number, items): number {
    let percent: number = index === 0 ? index: items
      .slice(0, index)
      .map(a => a.count)
      .reduce((x, y) => x + y);
    return this.perimeter * percent / this.total(items);
  }
}

interface Item {
  name: string;
  count: number;
  color: string;
}
