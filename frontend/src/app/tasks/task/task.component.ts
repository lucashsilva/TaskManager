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
  }

  ngOnInit() {
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.task).then(res => {
      if(res) this.hasChanges.emit(true)
    });

  }

  editTask(): void {
    // this.tasksService.editTask(this.task).subscribe();
    // this.onEdit.emit();
  }


  switchDone(): void {
    this.task.done = !this.task.done;
    this.taskService.editTask(this.task).then(res => {
      this.hasChanges.emit();
    });


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
