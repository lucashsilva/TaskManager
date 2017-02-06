import { Component, OnInit,  trigger, state, style, transition, animate } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../tasks/task/task.component';

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

  constructor(private taskService: TaskService) {  }

  ngOnInit() {
    if(window.screen.width <= 992) {
      this.toggleSidebar();
    }


  }

  toggleSidebar() {
    this.showSidebar = this.showSidebar === 'hide' ? 'show' : 'hide';
  }



}
