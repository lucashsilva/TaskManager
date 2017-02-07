import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskListService } from '../../services/task-list.service';
import { TaskList } from '../../task-lists/task-list/task-list.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Output() hasChanges;
  @Output() errorEmitter;
  showEditCategory: boolean;

  constructor(private taskService: TaskService, private listService: TaskListService, private router: Router) {
    this.hasChanges = new EventEmitter();
    this.errorEmitter = new EventEmitter();
    this.task = new Task();
  }

  ngOnInit() {
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.task).then(res => {
      if(res) this.hasChanges.emit(true)
    });

  }

  switchDone(): void {
    this.task.done = !this.task.done;
    this.taskService.editTask(this.task).then(res => {
      this.hasChanges.emit();
    });
    this.edit();

  }

  switchSubtaskDone(subtask: Subtask): void {
    subtask.done = !subtask.done;
    this.edit();


  }

  deleteSubtask(subtask: Subtask): void {
    let index = this.task.subtasks.indexOf(subtask, 0);
    if(index > -1){
      this.task.subtasks.splice(index, 1);
    }
    this.edit();
  }

  edit() {
    if(this.task.id) {
      this.task.taskLists = new Array<number>(); 
      this.taskService.editTask(this.task).then(res => {
        this.hasChanges.emit();
      });
    } else {
      this.hasChanges.emit(this.task);
    }
  }

  addSubtask() {
    this.task.subtasks.push(new Subtask());
  }

  switchCategoryEditor() {
    if(!this.showEditCategory) {
      this.showEditCategory = true;
    }
  }

  editCategory() {
    if(this.editCategory) {
      this.showEditCategory = false;
    }

    this.edit();
  }

  getTaskBorder() {
    let result = "5px solid ";

    if(this.task.priority === "HIGH") {
      return result + "#dd5555";
    } else if (this.task.priority === "LOW") {
      return result + "#F9A825";
    }

    return result + "#2196f3";
  }

  deleteTaskFromList(list) {
    this.listService.deleteTaskFromList(list, this.task).then(res => {
      if(res){
        this.hasChanges.emit();
      }
    });
  }

}


export class Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  timestamp: Date;
  done: boolean;
  category: string;
  subtasks: Array<Subtask>;
  taskLists: Array<number> | Array<TaskList>;

  constructor() {
    this.done = false;
    this.priority = "NORMAL";
    this.timestamp = new Date(Date.now());
    this.subtasks = new Array<Subtask>();
    this.taskLists = new Array<number>();
  }
  

}

export class Subtask {
  id: string;
  description: string;
  done: boolean;

  constructor() {
    this.done = false;
  }
  
}
