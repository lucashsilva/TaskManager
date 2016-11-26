import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private tasksService: TasksService) { }

  @Input() task: Task;
  @Output() onDelete = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  showEditForm = false;

  ngOnInit() {
  }

  deleteTask(): void {
    this.tasksService.deleteTask(this.task).subscribe();
    this.onDelete.emit();
  }

  editTask(): void {
    //apenas para marcar como terminada
    this.tasksService.editTask(this.task).subscribe();
    this.onEdit.emit();
  }

  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  taskSubmitted(result): void {
    if(result){
      this.toggleEditForm();
      this.onEdit.emit();
    }
  }

  switchDone(): void {
    this.task.done = !this.task.done;
    this.editTask();

  }

}


export class Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  imageUrl: string;
  timestamp: Date;
  done: boolean;

  constructor() {
    this.done = false;
    this.priority = "normal";
  }

}
