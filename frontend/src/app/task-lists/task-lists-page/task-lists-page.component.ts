import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { TaskListService } from '../../services/task-list.service';
import { TaskService } from '../../services/task.service';
import {TaskList } from '../task-list/task-list.component';
import { Task } from '../../tasks/task/task.component';

@Component({
  selector: 'app-task-lists-page',
  templateUrl: './task-lists-page.component.html',
  styleUrls: ['./task-lists-page.component.scss']
})
export class TaskListsPageComponent implements OnInit {
  lists: any;

  constructor(private sidebarService: SidebarService, private taskListService: TaskListService, private taskService: TaskService) {
    this.lists = new Array<TaskList>();
   }

  ngOnInit() {
    this.fetchLists();
  }

  fetchLists() {
    this.sidebarService.update();
    
    this.taskListService.getLists().then(res => {
      if(res) {
        this.lists = res;

        for(let list of this.lists) {
          list.tasks = this.getTasks(list);
        }
      }
    });


  }

  getTasks(list: TaskList) {
    let tasks = [];
    for(let id of list.tasks) {
      let task = this.taskService.getTask(id).then(res => {
        if(res) {

          tasks.push(res);
        }
      });

    }

    return tasks;
  }


}
