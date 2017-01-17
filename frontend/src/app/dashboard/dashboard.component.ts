import { Component, OnInit, Input, Output } from '@angular/core';
import { Task } from '../tasks/task/task.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() tasks: Task[];
  @Output('hasChanges') emitter;

  constructor() { }

  ngOnInit() {

  }

  fetchTasks() {
    this.emitter.emit(true);
  }


}
