import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Task } from './task/task.component';
import { TaskDateSortPipe } from './pipes/task-date-sort.pipe';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  @Input() tasks: Task[]
  @Input() dashboard = false;
  dateSortPipe: TaskDateSortPipe;

  constructor(private taskService: TaskService) {
    this.dateSortPipe = new TaskDateSortPipe();
  }

  ngOnInit() {
    this.initializeArray();
  }

  private fetchTasks(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });;

  }

  private initializeArray():void {
    if (!this.tasks) {
      this.tasks = <Task[]>(new Array());
      this.fetchTasks();
    }
  }



}
