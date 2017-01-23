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
  @Output('taskAdded') emitter: EventEmitter<boolean>;

  constructor(private taskService: TaskService) {
    this.task = new Task();
    this.emitter = new EventEmitter<boolean>();

  }

  ngOnInit() {
  }

  addTask() {
      this.taskService.addTask(this.task).then(res => {
        if(res) {
          this.emitter.emit(true);
        }
      });
  }



}
