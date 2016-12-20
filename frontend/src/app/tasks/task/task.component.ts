import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Output() onDelete;
  @Output() onEdit;
  @Output() onSwitch;
  showEditForm: boolean;

  constructor(private tasksService: TasksService) {
    this.onDelete = new EventEmitter();
    this.onEdit = new EventEmitter();
    this.onSwitch = new EventEmitter();
    this.showEditForm = false;
  }

  ngOnInit() {
  }

  deleteTask(): void {
    this.tasksService.deleteTask(this.task).subscribe();
    this.onDelete.emit();
  }

  editTask(): void {
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
    this.tasksService.editTask(this.task).subscribe();
    this.onSwitch.emit();

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
