import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Task } from '../task/task.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Input() task: Task;
  @Input() editForm = false;
  @Input() dashboard = false;

  constructor() {
    this.task = new Task();
  }

  ngOnInit() {
    if(this.editForm){
      this.task = this.clone(this.task);
    }
  }

  clone(task): Task {
    return <Task> JSON.parse(JSON.stringify(task));
  }



}
