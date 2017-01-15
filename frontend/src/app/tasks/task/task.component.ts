import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Output() onDelete;
  @Output() onEdit;
  @Output() onSwitch;

  constructor() {
    this.onDelete = new EventEmitter();
    this.onEdit = new EventEmitter();
    this.onSwitch = new EventEmitter();
  }

  ngOnInit() {
  }

  deleteTask(): void {
    // this.tasksService.deleteTask(this.task).subscribe();
    // this.onDelete.emit();
  }

  editTask(): void {
    // this.tasksService.editTask(this.task).subscribe();
    // this.onEdit.emit();
  }

  taskSubmitted(result): void {
    if(result){
      this.onEdit.emit();
    }
  }


  switchDone(): void {
    this.task.done = !this.task.done;
    // this.tasksService.editTask(this.task).subscribe();
    this.onSwitch.emit();

  }

}


export class Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  timestamp: Date;
  done: boolean;

  constructor() {
    this.done = false;
    this.priority = "normal";
  }

}
