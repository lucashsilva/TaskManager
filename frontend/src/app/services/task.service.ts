import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { Task } from '../tasks/task/task.component';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { UserService } from './user.service';
import { SidebarService } from './sidebar.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {
    private apiUrl = "http://localhost:8080/api";
   constructor(private http: Http, private router: Router, private userService: UserService, private sidebarService: SidebarService) { }

   getTasks(): Promise<Task[]> {
     return this.http.get(this.apiUrl + '/tasks', this.userService.getOptions()).map(res => {
          return <Task[]> res.json();
        }
      ).toPromise();

   }

   getTask(id): Promise<Task> {
     return this.http.get(this.apiUrl + '/tasks/'+id, this.userService.getOptions()).map(res => {
          return <Task> res.json();
        }
      ).toPromise();

   }

   addTask(task: Task):Promise<boolean> {
        return this.http.post(this.apiUrl + "/tasks", JSON.stringify(task), this.userService.getOptions())
                         .map((response: Response) => {

          if(response.status >= 200) {
           return true;
         } else {
           return false;
         }

       }).toPromise();
      }


   editTask(task) {
     return this.http.put(this.apiUrl + `/tasks/${task.id}`, JSON.stringify(task), this.userService.getOptions()).map((response: Response) => {

      if(response.status >= 200) {
      return true;
      } else {
      return false;
      }

      }).toPromise();
   }

   deleteTask(task) {
     return this.http.delete(this.apiUrl + `/tasks/${task.id}`, this.userService.getOptions()).map((response: Response) => {

        if(response.status >= 200) {
        return true;
        } else {
        return false;
        }

      }).toPromise();
   }


     getTasksWithFilter(tasks: Task[], done: boolean, category?: string) {
       let result = [];

       for (let task of tasks) {

        if ((category && task.category === category && task.done === done) || ((!category) && task.done === done)) {
           result.push(task);
        }
      }

      return result;
    }



}
