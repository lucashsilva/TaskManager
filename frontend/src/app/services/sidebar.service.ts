import { Injectable, OnInit } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { Task } from '../tasks/task/task.component';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class SidebarService {
  private apiUrl = "http://localhost:8080/api";
  categories: string[];
  pendentTasksCount = 0;

  constructor(private http: Http, private router: Router, private userService: UserService) { }

  update() {
    this.getUndoneTasksCount().then(res => {
      this.pendentTasksCount = res;
    })

    this.getCategories().then(res => {
      this.categories = res;
    });
  }

   getUndoneTasksCount(): Promise<number> {
     return this.http.get(this.apiUrl + '/tasks/count?done=false', this.userService.getOptions()).map(res => {
          return <number> res.json();
        }
      ).toPromise();

   }

   getCategories(): Promise<string[]> {
     return this.http.get(this.apiUrl + '/tasks/categories', this.userService.getOptions()).map(res => {
          return <string[]> res.json();
        }
      ).toPromise();
   }


}
