import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { TaskList } from '../task-lists/task-list/task-list.component';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { UserService } from './user.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskListService {
  private apiUrl = "http://localhost:8080/api";
   constructor(private http: Http, private router: Router, private userService: UserService) { }

   getHeaders() {
     let headers = new Headers();
     headers.append('Authorization', this.userService.getToken());
     return headers;
   }

   getLists(): Promise<TaskList[]> {
     return this.http.get(this.apiUrl + '/lists', {"headers": this.getHeaders()}).map(res => {
          return <TaskList[]> res.json();
        }
      ).toPromise();

   }


   addList(list: TaskList):Promise<boolean> {
        return this.http.post(this.apiUrl + "/lists", JSON.stringify(list), this.userService.getOptions())
                         .map((response: Response) => {

          if(response.status >= 200) {
           return true;
         } else {
           return false;
         }

       }).toPromise();
      }

   deleteTask(list: TaskList) {
     return this.http.delete(this.apiUrl + `/lists/${list.id}`, this.userService.getOptions()).map((response: Response) => {

        if(response.status >= 200) {
        return true;
        } else {
        return false;
        }

      }).toPromise();
   }



}
