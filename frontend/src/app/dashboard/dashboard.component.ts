import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Task } from '../tasks/task/task.component';
import { TaskService } from '../services/task.service';
import { SidebarService } from '../services/sidebar.service';
import { TasksChartComponent } from './tasks-chart/tasks-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: any;

  @ViewChild(TasksChartComponent) tasksChart: TasksChartComponent;
  constructor(private taskService: TaskService, private sidebarService: SidebarService) {
    this.tasks = {done: [], undone: []}
  }

  ngOnInit() {
    this.fetchTasks();

  }

  fetchTasks() {
    this.taskService.getTasks().then(res => {
      this.tasks.done = this.getTasks(res, true);
      this.tasks.undone = this.getTasks(res, false);
      this.sidebarService.pendentTasksNumber = this.tasks.undone.length;
      this.tasksChart.getNumbers(res);
    });


  }

  getTasks(tasks, status) {
    let result = [];

    for (let task of tasks) {
      if (task.done === status) {
        result.push(task);
      }
    }

    return result;
  }

}
