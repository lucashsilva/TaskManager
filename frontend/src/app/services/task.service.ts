import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { Task } from '../tasks/task/task.component';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { UserService } from './user.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {
    private apiUrl = "http://localhost:8080/api";

   constructor(private http: Http, private router: Router, private userService: UserService) { }

   getHeaders() {
     let headers = new Headers();
     headers.append('Authorization', this.userService.getToken());
     return headers;
   }

   getTasks():Promise<Task[]> {
     return this.http.get(this.apiUrl + '/tasks', {"headers": this.getHeaders()}).map(res => <Task[]> res.json()).toPromise();
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

}
