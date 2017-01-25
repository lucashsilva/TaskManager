import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { SidebarService } from '../../services/sidebar.service';
import { Task } from '../task/task.component';
import { ActivatedRoute } from '@angular/router';
import { TasksChartComponent } from '../../dashboard/tasks-chart/tasks-chart.component';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {
  tasks: any;
  category: string;
  @ViewChild(TasksChartComponent) tasksChart: TasksChartComponent;
  constructor(private taskService: TaskService, private sidebarService: SidebarService, private route: ActivatedRoute) {
    this.tasks = {done: [], undone: []}
  }

  ngOnInit() {
    this.fetchTasks();
    this.route.queryParams.subscribe(
      data => {
        this.category = data['category'];
      });
  }

  fetchTasks() {
    this.taskService.getTasks().then(res => {
      if(res) {
        this.tasks.done = this.taskService.getTasksWithFilter(res, true, this.category);
        this.tasks.undone = this.taskService.getTasksWithFilter(res, false, this.category);
        this.sidebarService.pendentTasksNumber = this.taskService.getTasksWithFilter(res, false).length;
        this.tasksChart.getNumbers(res, this.category);
        this.sidebarService.categories = this.taskService.getCategories(res);
      }
    });





}
