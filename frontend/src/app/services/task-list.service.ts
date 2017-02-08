import { Task } from '../tasks/task/task.component';
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
          if(res.status >= 200 && res.status <= 400) {
            return <TaskList[]> res.json();
         } else {
           throw new Error("Não foi possível carregar os dados.");
         }

        }
      ).toPromise();

   }


   addList(list: TaskList):Promise<boolean> {
        return this.http.post(this.apiUrl + "/lists", JSON.stringify(list), this.userService.getOptions())
                         .map((res: Response) => {

         if(res.status >= 200 && res.status <= 400) {
           return true;
         } else {
           throw new Error("Erro na requisição. Verifique os dados.");
         }

       }).toPromise();
      }

   editList(list: TaskList): Promise<boolean> {
     return this.http.put(this.apiUrl + '/lists/' + list.id, JSON.stringify(list), this.userService.getOptions()).map(res => {
        if(res.status >= 200 && res.status <= 400) {
           return true;
         } else {
           throw new Error("Erro na requisição. Verifique os dados.");
         }
     }).toPromise();
   
   }

   deleteList(list: TaskList) {
     return this.http.delete(this.apiUrl + `/lists/${list.id}`, this.userService.getOptions()).map((res: Response) => {

        if(res.status >= 200 && res.status <= 400) {
           return true;
         } else {
           throw new Error("Erro na requisição. Verifique os dados.");
         }

      }).toPromise();
   }


   deleteTaskFromList(list: TaskList, task: Task) {
     return this.http.delete(this.apiUrl + `/lists/${list.id}/${task.id}`, this.userService.getOptions()).map((res: Response) => {

        if(res.status >= 200 && res.status <= 400) {
           return true;
         } else {
           throw new Error("Erro na requisição. Verifique os dados.");
         }

      }).toPromise();
   }



}
