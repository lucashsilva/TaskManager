import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../tasks/task/task.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-chart',
  templateUrl: './tasks-chart.component.html',
  styleUrls: ['./tasks-chart.component.scss']
})
export class TasksChartComponent implements OnInit {
  showChart: boolean;
  constructor(private taskService: TaskService) {}

  ngOnInit() {  }

  // Pie
  public pieChartLabels:string[] = ['Terminadas', 'Pendentes'];
  public pieChartType:string = 'pie';
  public data: number[] = [0,0];
  // events
  public chartClicked(e:any):void {

  }

  public chartHovered(e:any):void {

  }

  getNumbers(tasks: Task[], category?: string) {
    let done = 0;
    let undone = 0;

    if(tasks != null){
      this.showChart = tasks.length > 0;
      
      for(let task of tasks) {
        if((task.done && category && category === task.category) || (task.done && (!category))) {
          done++;
        } else if (((!task.done) && category && category === task.category) || ((!task.done) && (!category))) {
          undone++;
        }
      }
    }

    this.data = [done, undone];
  }

}
