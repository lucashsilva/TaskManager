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
  @Output("listToEdit") editEmitter: EventEmitter<TaskList>;
  @Output("onDelete") deleteEmitter: EventEmitter<TaskList>;
  constructor() {
    this.list = new TaskList();
    this.emitter = new EventEmitter<boolean>();
    this.editEmitter = new EventEmitter<TaskList>();
    this.deleteEmitter = new EventEmitter <TaskList>();
   }

  ngOnInit() {
  }

  fetchLists() {
    this.emitter.emit(true);
  }

  edit() {
    this.editEmitter.emit(this.list);
  }

  delete() {
    this.deleteEmitter.emit(this.list);
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
