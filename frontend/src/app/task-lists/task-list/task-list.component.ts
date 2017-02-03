import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../tasks/task/task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() list: TaskList;

  constructor() {
    this.list = new TaskList();
   }

  ngOnInit() {
  }

}

export class TaskList {
  id: number;
  title: string;
  tasks: Task[] | number[];

  constructor() {
    this.tasks = Array<number>();
  }

}
