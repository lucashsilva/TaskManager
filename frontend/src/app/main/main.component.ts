import { Component, OnInit,  trigger, state, style, transition, animate } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../tasks/task/task.component';
import {UserService, User} from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('sidebar', [
      state('show', style({
        left: '0'
      })),
      state('hide', style({
        left: '-70vw'
      })),
      transition('show => hide', animate('400ms ease-in-out')),
      transition('hide => show', animate('400ms ease-in-out'))
    ]),
    trigger('page', [
      state('show', style({

      })),
      state('hide', style({
        left: '0'
      })),
      transition('show => hide', animate('400ms ease-in-out')),
      transition('hide => show', animate('400ms ease-in-out'))
    ])
  ]

})
export class MainComponent implements OnInit {
  showSidebar = 'show';
  tasks: Task[];
  user: User;

  constructor(private taskService: TaskService, private userService: UserService) { 
    this.user = new User();

   }

  ngOnInit() {
    if(window.screen.width <= 992) {
      this.toggleSidebar();
    }

    this.userService.getUser().then(user => {
      this.user = user;
    });

  }

  toggleSidebar() {
    this.showSidebar = this.showSidebar === 'hide' ? 'show' : 'hide';
  }



}
