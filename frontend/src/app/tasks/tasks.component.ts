import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  progress: Number;
  notificationMessage: String;
  dateSortPipe: TaskDateSortPipe;

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
        this.progress = done/tasks.length;
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
    this.showNotification("Tarefa editada.");
  }


  onAdd(): void {
    this.fetchTasks();
    this.showNotification("Tarefa adicionada.");
  }

  onDelete(): void {
    this.fetchTasks();
  }

  onSwitch(): void {
    this.fetchTasks();
  }

  showNotification(message) {
    this.notificationMessage = message;

    setTimeout(() => {
      this.notificationMessage = null;
    }, 5000);
  }


  private initializeArrays():void {
    this.tasks = <Task[]>(new Array());
    this.doneTasks = <Task[]>(new Array());
  }

  toggleDoneTasks(): void {
    this.showDoneTasks = !this.showDoneTasks;
  }


}
