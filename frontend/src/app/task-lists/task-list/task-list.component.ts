import {TaskListService} from '../../services/task-list.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../tasks/task/task.component';
import * as FileSaver from 'file-saver';

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
  constructor(private listService: TaskListService) {
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

  download() {
    this.listService.downloadList(this.list.id).then(res => {
      var mediaType = 'application/pdf';
      var blob = new Blob([res], {type: mediaType});
      var filename = this.list.id + '.pdf';
      FileSaver.saveAs(blob, filename);
    });
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
