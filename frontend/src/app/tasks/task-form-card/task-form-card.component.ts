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


  constructor(private taskService: TaskService) {
    this.task = new Task();

  }

  ngOnInit() {
  }

  addTask() {
      this.taskService.addTask(this.task).subscribe(res => {
        if(res) {
          this.refresh();
        }
      });
  }

  refresh() {
    location.reload();
  }


}
