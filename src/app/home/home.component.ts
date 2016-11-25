import { Component, OnInit, ViewChild  } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(TasksComponent) tasks: TasksComponent;
  showAddTask = false;

  constructor() { }

  ngOnInit() {
  }

  toggleTaskForm(): void {
    this.showAddTask = !this.showAddTask;
  }

  taskSubmitted(event) {
    alert(event.message);

    if(event.success) {
      this.tasks.fetchTasks();
      this.toggleTaskForm();
    }
  }
}
