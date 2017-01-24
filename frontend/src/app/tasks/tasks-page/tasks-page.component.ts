import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { SidebarService } from '../../services/sidebar.service';
import { Task } from '../task/task.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {
  tasks: any;
  category: string;

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
      this.tasks.done = this.getTasks(res, true, this.category);
      this.tasks.undone = this.getTasks(res, false, this.category);
      this.sidebarService.pendentTasksNumber = this.tasks.undone.length;
      this.sidebarService.categories = this.getCategories(res);
    });
  }


    getCategories(tasks: Task[]) {
      let categories = [];

      for(let task of tasks) {
        if(!categories.some(x => x === task.category)) {
          categories.push(task.category);
        }
      }

      return categories;
    }

    getTasks(tasks, status, category) {
      let result = [];

      for (let task of tasks) {
        if (task.done === status && task.category === category) {
          result.push(task);
        }
      }

      return result;
    }

}
