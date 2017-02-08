import { Component, OnInit, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { SidebarService } from '../../services/sidebar.service';
import { Task } from '../task/task.component';
import { ActivatedRoute } from '@angular/router';
import { TasksChartComponent } from '../tasks-chart/tasks-chart.component';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  animations: [
    trigger('taskform', [
      state('show', style({
        visibility: 'visible',
        opacity: '1'
      })),
      state('hide', style({
        visibility: 'hidden',
        opacity: '0'
      })),
      transition('show => hide', animate('400ms ease-in-out')),
      transition('hide => show', animate('400ms ease-in-out'))
    ])
  ]
})
export class TasksPageComponent implements OnInit {
  tasks: any;
  category: string;
  priority: string;
  showForm = 'hide';
  @ViewChild(TasksChartComponent) tasksChart: TasksChartComponent;
  constructor(private taskService: TaskService, private sidebarService: SidebarService, private route: ActivatedRoute) {
    this.tasks = {done: [], undone: []}
  }

  ngOnInit() {
    this.fetchTasks();
    this.route.queryParams.subscribe(
      data => {
        this.category = data['category'];
        this.priority = data['priority'];
      });
  }

  fetchTasks() {
    this.taskService.getTasks().then(res => {
      if(res) {
        this.tasks.done = this.taskService.getTasksWithFilter(res, true, this.category, this.priority);
        this.tasks.undone = this.taskService.getTasksWithFilter(res, false, this.category, this.priority);
        this.tasksChart.getNumbers(res, this.category);
        this.sidebarService.update();
      }
    });

  }

  toggleForm() {
    this.showForm = this.showForm === 'hide' ? 'show' : 'hide';
  }

  changeHandler(event) {
    this.toggleForm();

    if(event) {
      this.fetchTasks();
    }
  }

}
