import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from './task/task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  showDoneTasks = false;
  tasks: Task[];
  doneTasks: Task[];
  progress: Number;

  @Output() onEdit = new EventEmitter();

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.initializeArrays();
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.initializeArrays();

    this.tasksService.getTasks().subscribe(data => {
      let tasks = data;

      let done = 0;

      for(let task of tasks){
        if(task.done){
          this.doneTasks.push(task);
          done++;
        }else{
          this.tasks.push(task);
        }
        this.progress = done/tasks.length;
      }
    });;
  }

  private initializeArrays():void {
    this.tasks = <Task[]>(new Array());
    this.doneTasks = <Task[]>(new Array());
  }

  toggleDoneTasks(): void {
    this.showDoneTasks = !this.showDoneTasks;
  }


}
