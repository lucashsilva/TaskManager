import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../task/task.component';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Output() toggleTaskForm;
  task: Task;

  constructor(private tasksService: TasksService) {
    this.toggleTaskForm = new EventEmitter();
    this.task = new Task();
  }

  ngOnInit() {
  }

  toggleAddTask(): void {
    this.toggleTaskForm.emit();
  }

  saveTask(): void {
    this.tasksService.saveTask(this.task);

  }
}
