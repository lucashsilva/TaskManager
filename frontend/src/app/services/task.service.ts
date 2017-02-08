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
          if(res.status == 200) {
            return <Task[]> res.json();
          } else {
            throw new Error("Não foi possível carregar os dados.");
          }
        }
      ).toPromise();

   }

   getTask(id): Promise<Task> {
     return this.http.get(this.apiUrl + '/tasks/'+id, this.userService.getOptions()).map(res => {
          if(res.status >= 200 && res.status <= 400) {
            return <Task> res.json();
          } else {
            throw new Error("Não foi possível carregar os dados.");
          }
        }
      ).toPromise();

   }

   addTask(task: Task):Promise<boolean> {
        return this.http.post(this.apiUrl + "/tasks", JSON.stringify(task), this.userService.getOptions())
                         .map((res: Response) => {

         if(res.status >= 200 && res.status <= 400) {
           return true;
         } else {
           throw new Error("Erro na requisição. Verifique os dados.");
         }

       }).toPromise();
      }


   editTask(task) {
     return this.http.put(this.apiUrl + `/tasks/${task.id}`, JSON.stringify(task), this.userService.getOptions()).map((res: Response) => {

          if(res.status >= 200 && res.status <= 400) {
           return true;
         } else {
           throw new Error("Erro na requisição. Verifique os dados.");
         }


      }).toPromise();
   }

   deleteTask(task) {
     return this.http.delete(this.apiUrl + `/tasks/${task.id}`, this.userService.getOptions()).map((res: Response) => {

          if(res.status >= 200 && res.status <= 400) {
           return true;
         } else {
           throw new Error("Erro na requisição. Verifique os dados. ");
         }


      }).toPromise();
   }


     getTasksWithFilter(tasks: Task[], done: boolean, category?: string, priority?: string) {
       return tasks.filter(task => {
          return (task.done == done && (!category || (category && task.category == category)) && (!priority || (priority && task.priority === priority)));
       });
    }



}
