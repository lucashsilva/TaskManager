import { Component, OnInit, ViewChild  } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';
import { TaskFormComponent } from '../tasks/task-form/task-form.component';
import { Task } from '../tasks/task/task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(TasksComponent) tasks: TasksComponent;
  @ViewChild(TaskFormComponent) taskForm: TaskFormComponent;

  taskToBeEdited: Task;
  showForm = false;

  constructor() { }

  ngOnInit() {
  }

  toggleTaskForm(): void {
    this.showForm = !this.showForm;
  }

  taskSubmitted(result) {
    if(result) {
      this.tasks.fetchTasks();
      this.toggleTaskForm();
    }
  }
}
