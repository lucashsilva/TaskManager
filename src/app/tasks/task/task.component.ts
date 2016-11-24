import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor() { }

  @Input() task: Task;

  ngOnInit() {
  }

}


export class Task {
  title: string;
  description: string;
  status: string;
  imageUrl: string; 
  timestamp: Date;
  done: boolean;

  constructor() {}
}
