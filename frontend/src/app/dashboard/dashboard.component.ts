import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../tasks/task/task.component';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() tasks: Task[];
  @Output('hasChanges') emitter;

  constructor(private taskService: TaskService) {
    this.emitter = new EventEmitter();
  }

  ngOnInit() {
    this.fetchTasks();

  }

  fetchTasks() {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
    });
    this.emitter.emit(true);
  }


}
