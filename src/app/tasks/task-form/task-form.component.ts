import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../task/task.component';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Output() toggleTaskForm;
  @Output() taskSubmitted;
  task: Task;

  constructor(private tasksService: TasksService) {
    this.toggleTaskForm = new EventEmitter();
    this.taskSubmitted = new EventEmitter();
    this.task = new Task();
  }

  ngOnInit() {
  }

  toggleAddTask(): void {
    this.toggleTaskForm.emit();
  }

  saveTask(): void {
    this.tasksService.addTask(this.task).subscribe(
     res => {
       var newTask = res.json();
     },
     error => console.log(error)
   );

   this.taskSubmitted.emit({"message":"Tarefa adicionada com sucesso.", "success": true});
  }
}
