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
  // Doughnut
  doughnutChartLabels1: string[] = ['Victorias', 'Derrotas'];
  doughnutChartData1: number[] = [];
  doughnutChartColors1: any[] = [{backgroundColor: ['#6ab8de', '#f5da95']}];
  doughnutChartType: string = 'doughnut';

  doughnutChartLabels2: string[] = ['Fácil', 'Intermedio', 'Difícil'];
  doughnutChartData2: number[] = [];
  doughnutChartColors2: any[] = [{backgroundColor: ['#a3eba2', '#89f7f1', '#c191f1']}];

  constructor(private af: AngularFire, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.af.database.object(`/users/${this.auth.fireAuth.uid}`, {preserveSnapshot: true})
      .subscribe(data => {
        const {easy, intermediate, hard, game, win} = data.val();
        this.doughnutChartData1 = [win, game - win];
        this.doughnutChartData2 = [easy, intermediate, hard];
      });
  }

  // events
  chartClicked(e: any) {
    console.log(e);
  }

  chartHovered(e: any) {
    console.log(e);
  }

}
