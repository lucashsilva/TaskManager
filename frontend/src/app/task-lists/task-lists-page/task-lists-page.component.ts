import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { TaskListService } from '../../services/task-list.service';
import { TaskService } from '../../services/task.service';
import {TaskList } from '../task-list/task-list.component';
import { Task } from '../../tasks/task/task.component';

@Component({
  selector: 'app-task-lists-page',
  templateUrl: './task-lists-page.component.html',
  styleUrls: ['./task-lists-page.component.scss'],
  animations: [
    trigger('listform', [
      state('show', style({
        visibility: 'visible',
        opacity: '1'
      })),
      state('hide', style({
        visibility: 'hidden',
        opacity: '0'
      })),
      transition('show => hide', animate('400ms ease-in-out')),
      transition('hide => show', animate('400ms ease-in-out'))
    ])
  ]
})
export class TaskListsPageComponent implements OnInit {
  lists: Array<TaskList>;
  tasks: Array<Task>;
  showForm = "hide";

  constructor(private sidebarService: SidebarService, private taskListService: TaskListService, private taskService: TaskService) {
    this.lists = new Array<TaskList>();
    this.tasks = new Array<Task>();
   }

  ngOnInit() {
    this.fetchLists();
    this.fetchTasks();
  }

  fetchLists() {
    this.sidebarService.update();
    
    this.taskListService.getLists().then(res => {
      if(res) {
        this.lists = res;
      }
    });
  }

  fetchTasks() {
    this.taskService.getTasks().then(res => {
      this.tasks = res;
    });
  }

  toggleForm() {
    this.showForm = this.showForm === 'hide' ? 'show' : 'hide';
  }

  
  changeHandler(event) {
    this.toggleForm();

    if(event) {
      this.fetchLists();
    }
  }


}
