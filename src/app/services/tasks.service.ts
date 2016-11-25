import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Task } from '../tasks/task/task.component';

import 'rxjs/add/operator/map';

@Injectable()
export class TasksService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
   private options = new RequestOptions({ headers: this.headers });

   constructor(private http: Http) { }

   getTasks() {
     return this.http.get('/tasks').map(res => res.json());
   }

   addTask(task) {
     return this.http.post("/task", JSON.stringify(task), this.options);
   }

   editTask(task) {
     return this.http.put(`/task/${task._id}`, JSON.stringify(task), this.options);
   }

   deleteTask(task) {
     return this.http.delete(`/task/${task._id}`, this.options);
   }
}
