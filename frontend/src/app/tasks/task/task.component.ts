import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Output() hasChanges;

  constructor(private taskService: TaskService) {
    this.hasChanges = new EventEmitter();
    this.task = new Task();
  }

  ngOnInit() {
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.task).then(res => {
      if(res) this.hasChanges.emit(true)
    });

  }

  switchDone(): void {
    this.task.done = !this.task.done;
    this.taskService.editTask(this.task).then(res => {
      this.hasChanges.emit();
    });
    this.edit();

  }

  switchSubtaskDone(subtask: Subtask): void {
    subtask.done = !subtask.done;
    this.edit();


  }

  deleteSubtask(subtask: Subtask): void {
    let index = this.task.subtasks.indexOf(subtask, 0);
    if(index > -1){
      this.task.subtasks.splice(index, 1);
    }
    this.edit();
  }

  edit() {
    if(this.task.id) {
      this.taskService.editTask(this.task).then(res => {
        this.hasChanges.emit();
      });
    } else {
      this.hasChanges.emit(this.task);
    }
  }

  addSubtask() {
    this.task.subtasks.push(new Subtask());
  }

}


export class Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  timestamp: Date;
  done: boolean;
  subtasks: Array<Subtask>;

  constructor() {
    this.done = false;
    this.priority = "normal";
    this.timestamp = new Date(Date.now());
    this.subtasks = new Array<Subtask>();
  }

}

export class Subtask {
  id: string;
  description: string;
  done: boolean;

  constructor() {
    this.done = false;
  }
}
