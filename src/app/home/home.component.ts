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

  showForm = false;
  editForm = false;
  taskToBeEdited: Task;

  constructor() { }

  ngOnInit() {
  }

  toggleTaskForm(): void {
    this.showForm = !this.showForm;
    this.taskToBeEdited = new Task();
    this.editForm = false;
  }

  taskSubmitted(event) {
    alert(event.message);

    if(event.success) {
      this.tasks.fetchTasks();
      this.toggleTaskForm();
    }
  }

  editTask(task) {
    this.toggleTaskForm();
    this.taskToBeEdited = task;
    this.editForm = true;

  }
}
