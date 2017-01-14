import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-chart',
  templateUrl: './tasks-chart.component.html',
  styleUrls: ['./tasks-chart.component.scss']
})
export class TasksChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Pie
  public pieChartLabels:string[] = ['Urgentes', 'Terminadas', 'Pendentes'];
  public pieChartData:number[] = [3, 4, 5];
  public pieChartType:string = 'pie';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
