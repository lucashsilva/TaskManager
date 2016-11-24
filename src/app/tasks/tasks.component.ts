import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private tasksService: TasksService) { }

  tasks: any;

  ngOnInit() {
    this.tasksService.getTasks().subscribe(data => {
      this.tasks = data;
    });;
  }


}
