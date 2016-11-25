import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor() { }

  @Input() task: Task;
  @Output() onDelete = new EventEmitter();
  @Output() onEdit = new EventEmitter();

  ngOnInit() {
  }

  deleteTask(): void {
    //// id
    this.onDelete.emit(this.task);
  }

  editTask(): void {
    this.onEdit.emit(this.task);
  }

}


export class Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  imageUrl: string;
  timestamp: Date;
  done: boolean;

  constructor() {
    this.done = false;
    this.priority = "normal";
  }

}
