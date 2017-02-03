import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Task } from '../tasks/task/task.component';
import { TaskService } from '../services/task.service';
import { SidebarService } from '../services/sidebar.service';
import { TaskListService } from '../services/task-list.service';
import { TasksChartComponent } from './tasks-chart/tasks-chart.component';
import { TaskList } from '../task-lists/task-list/task-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: any;

  @ViewChild(TasksChartComponent) tasksChart: TasksChartComponent;
  constructor(private taskService: TaskService, private taskListService: TaskListService, private sidebarService: SidebarService) {
    this.tasks = {done: [], undone: []}
  }

  ngOnInit() {
    this.fetchTasks();
    this.sidebarService.update();
  }

  fetchTasks() {
    this.taskService.getTasks().then(res => {
      if(res) {
        this.tasks.done = this.taskService.getTasksWithFilter(res, true);
        this.tasks.undone = this.taskService.getTasksWithFilter(res, false);
        this.tasksChart.getNumbers(res);
        this.sidebarService.update();
      }
    });


  }


}
