import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Task } from '../task/task.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form-card',
  templateUrl: './task-form-card.component.html',
  styleUrls: ['./task-form-card.component.scss']
})
export class TaskFormCardComponent implements OnInit {
  task: Task;
  @Output('hasChanges') emitter: EventEmitter<Task>;

  constructor(private taskService: TaskService) {
    this.task = new Task();
    this.emitter = new EventEmitter<Task>();
  }

  ngOnInit() {
  }

  save() {
    this.taskService.addTask(this.task).then(res => {
      this.emitter.emit(this.task);
      this.task = new Task();
    });
  }

  close() {
    this.emitter.emit(null);
  }


}
