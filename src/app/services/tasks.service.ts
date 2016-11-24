import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Task } from '../tasks/task/task.component';

import 'rxjs/add/operator/map';

@Injectable()
export class TasksService {

  private tasksUrl = './assets/database.json';

  constructor(private http: Http) {}

  getTasks() {
      return this.http.get(this.tasksUrl)
      .map((res: Response) => <Task[]> res.json().tasks);
    }

  saveTask(task: Task): boolean {
  //  this.tasks.push(task);
    return true;
  }
}
