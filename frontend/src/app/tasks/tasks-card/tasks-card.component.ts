import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Task } from '../../tasks/task/task.component';

@Component({
  selector: 'app-tasks-card',
  templateUrl: './tasks-card.component.html',
  styleUrls: ['./tasks-card.component.scss'],
})
export class TasksCardComponent implements OnInit {

  @Input() tasks: Task[]

  constructor() {

  }

  ngOnInit() {

  }




}
