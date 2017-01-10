import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from './task/task.component';
import { TaskDateSortPipe } from './pipes/task-date-sort.pipe';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  showDoneTasks: boolean;
  tasks: Task[];
  doneTasks: Task[];
  dateSortPipe: TaskDateSortPipe;
  showTaskForm: boolean;
  
  @Output('onEdit') onEditEmitter = new EventEmitter();

  constructor(private tasksService: TasksService) {
    this.showDoneTasks = false;
    this.dateSortPipe = new TaskDateSortPipe();
  }

  ngOnInit() {
    this.initializeArrays();
    this.fetchTasks();
  }

  private fetchTasks(): void {
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
      }
    });;

  }

  getDoneTasks() {
    return this.dateSortPipe.transform(this.doneTasks, "");
  }

  getUndoneTasks() {
    return this.dateSortPipe.transform(this.tasks, "");
  }


  onEdit(): void {
    this.fetchTasks();
  }


  onAdd(): void {
    this.fetchTasks();
  }

  onDelete(): void {
    this.fetchTasks();
  }

  onSwitch(): void {
    this.fetchTasks();
  }


  private initializeArrays():void {
    this.tasks = <Task[]>(new Array());
    this.doneTasks = <Task[]>(new Array());
  }

  toggleDoneTasks(): void {
    this.showDoneTasks = !this.showDoneTasks;
  }

  toggleTaskForm(): void {
    this.showTaskForm = !this.showTaskForm;
  }


}
