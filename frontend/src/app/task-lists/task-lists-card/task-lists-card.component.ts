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

  constructor() {
    this.lists = new Array<TaskList>();
   }

  ngOnInit() {
  }

  fetchLists() {
    this.emitter.emit(true);
  }


}
