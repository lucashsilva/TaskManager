import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private tasksService: TasksService) { }

  tasks: any;

  @Output() onEdit = new EventEmitter();

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.tasksService.getTasks().subscribe(data => {
      this.tasks = data;
    });;
  }

  deleteTask(task) {
    this.tasksService.deleteTask(task).subscribe();
    this.fetchTasks();
  }

  editTask(task) {
    this.onEdit.emit(task);
  }

}
