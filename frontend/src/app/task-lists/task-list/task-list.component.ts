import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../tasks/task/task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() list: TaskList;
  @Output("hasChanges") emitter: EventEmitter<boolean>;

  constructor() {
    this.list = new TaskList();
    this.emitter = new EventEmitter<boolean>();
   }

  ngOnInit() {
  }

  fetchLists() {
    this.emitter.emit(true);
  }

}

export class TaskList {
  id: number;
  title: string;
  tasks: Task[] ;

  constructor() {
    this.tasks = Array<Task>();
  }

}
