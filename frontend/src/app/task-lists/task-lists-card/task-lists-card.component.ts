import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TaskList } from '../task-list/task-list.component';
import { Task } from '../../tasks/task/task.component';

@Component({
  selector: 'app-task-lists-card',
  templateUrl: './task-lists-card.component.html',
  styleUrls: ['./task-lists-card.component.scss']
})
export class TaskListsCardComponent implements OnInit {
  @Output('hasChanges') emitter: EventEmitter<boolean>;
  @Input() lists: TaskList[];
  @Output('listToEdit') editEmitter: EventEmitter<TaskList>;
  @Output('onDelete') deleteEmitter: EventEmitter<TaskList>;

  constructor() {
    this.lists = new Array<TaskList>();
    this.emitter = new EventEmitter<boolean>();
    this.editEmitter = new EventEmitter<TaskList>();
    this.deleteEmitter = new EventEmitter<TaskList>();
   }

  ngOnInit() {
  }

  fetchLists() {
    this.emitter.emit(true);
  }

  editList(list) {
    this.editEmitter.emit(list);
  }

  deleteList(list) {
    this.deleteEmitter.emit(list);
  }
}
