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
  doughnutChartData1: number[] = [2, 3];
  doughnutChartColors1: any[] = [{backgroundColor: ['#6ab8de', '#f5da95']}];
  doughnutChartType: string = 'doughnut';

  doughnutChartLabels2: string[] = ['Fácil', 'Intermedio', 'Difícil'];
  doughnutChartData2: number[] = [4, 2, 1];
  doughnutChartColors2: any[] = [{backgroundColor: ['#a3eba2', '#89f7f1', '#c191f1']}];

  constructor(private af: AngularFire, public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // events
  chartClicked(e: any) {
    console.log(e);
  }

  chartHovered(e: any) {
    console.log(e);
  }

}
