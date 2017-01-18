import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../tasks/task/task.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-chart',
  templateUrl: './tasks-chart.component.html',
  styleUrls: ['./tasks-chart.component.scss']
})
export class TasksChartComponent implements OnInit {
  @Input() tasks;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.fetchData();
  }

  // Pie
  public pieChartLabels:string[] = ['Terminadas', 'Pendentes'];
  public pieChartType:string = 'pie';
  public data: number[] = [0,0];
  // events
  public chartClicked(e:any):void {

  }

  public chartHovered(e:any):void {

  }

  getNumbers() {
    let done = 0;
    let undone = 0;

    if(this.tasks != null){
      for(let task of this.tasks) {
        if(task.done){
          done++;
        }else{
          undone++;
        }
      }

    }

    return [done, undone];
  }

  fetchData() {
    this.data = this.getNumbers();
  }
}
